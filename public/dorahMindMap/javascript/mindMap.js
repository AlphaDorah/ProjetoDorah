var total_temas = 0;
note_color = "LightYellow";
var zoomRange = document.getElementById('zoom');

zoomRange.addEventListener('input', function() {
    var percent = (zoomRange.value - zoomRange.min) / (zoomRange.max - zoomRange.min) * 100;
    zoomRange.style.background = 'linear-gradient(to right, #0073EA 0%, #0073EA ' + percent + '%, white ' + percent + '%, white 100%)';
});

function getColor()
{
    return note_color;
}

function define_diagram() {
    const $ = go.GraphObject.make;

    diagram =
        new go.Diagram("mind-map",
            {
                allowCopy: false,
                allowDelete: true,
                maxSelectionCount: 1,
                "undoManager.isEnabled": true,
                "commandHandler.deletesTree": true,
                "draggingTool.dragsTree": true,

                layout:
                    $(go.TreeLayout,
                        { angle: 90, nodeSpacing: 15, layerSpacing: 60, layerStyle: go.TreeLayout.LayerUniform })
            });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", {
                stroke: '#C5C7D0',
                strokeWidth: 1,
                fill: "white"
            }),
            $(go.TextBlock, { margin: 10, font: "18px Figtree, sans-serif" },
                new go.Binding("text"))
        );

    diagram.nodeTemplate.selectionAdornmentTemplate =
        $(go.Adornment, "Spot",
            $(go.Panel, "Auto",
                $(go.Shape, "RoundedRectangle", { fill: null, stroke: "#935CFF", strokeWidth: 3 }), 
                $(go.Placeholder, { margin: -2 })
            ),
            $(go.Panel, "Auto", {
                alignment: go.Spot.Bottom,
                alignmentFocus: go.Spot.Top
            },
                $(go.Shape, "RoundedRectangle",
                    {
                        fill: "EBEBEB", stroke: "black", strokeWidth: 3
                    }),
                $(go.TextBlock, { font: "regular  10px Figtree, sans-serif",  editable: true, stroke: "#757575", margin: 10 },
                    new go.Binding("text", "summary")),
            ),
            $("Button",
                {
                    alignment: go.Spot.Right,
                    "ButtonBorder.figure": "RoundedRectangle",
                    "ButtonBorder.fill": '#784BD1',
                    "ButtonBorder.stroke": null,
                    "ButtonBorder.strokeWidth": 3,

                    click: addNodeAndLink
                },
                $(go.TextBlock, "+",
                    { font: "bold 15px Figtree, sans-serif", stroke: "white" }),
            )
        ); 

    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal, corner: 50, selectable: false },
            $(go.Shape, { strokeWidth: 3, stroke: "#935CFF"}), //linhas
            $(go.Shape, {toArrow: 'Chevron', fill: "#935CFF", stroke: null})

        );

    function addNodeAndLink(e, obj) {
        var adorn = obj.part;
        var oldnode = adorn.adornedPart;
        
        let buttonOn = document.getElementById("id-toggleon");

        if (buttonOn.style.display == "none"){
            diagram.startTransaction("Add Node");

            var newdata = { key: total_temas + 1, text: `Novo Subtema ${total_temas}`, sumary: `Resumo do subtema ${total_temas}` };
            diagram.model.addNodeData(newdata);
            diagram.model.addLinkData({ from: oldnode.key, to: newdata.key })

            total_temas++;

            diagram.commitTransaction("Add Node");

            var newnode = diagram.findNodeForData(newdata);
            if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
        }
        else{
            link = window.location.href;

            link += ";" + String(oldnode.key) + "generate";

            window.open(link, "_self");
        }
        
    }

    function nodeStyle() {
        return [
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          {
            locationSpot: go.Spot.Center
          }
        ];
      }

    diagram.nodeTemplateMap.add("Comment", //Notas autoadesivas
    $(go.Node, "Auto", nodeStyle(), 
            {minSize: new go.Size(160, 160)},
            $(go.Shape, "Rectangle", {
                fill: note_color,
                stroke: null

            }),
        $(go.TextBlock, {stroke: "black", margin: 10, editable: true, font: "16px Kalam, sans-serif" },
            new go.Binding('text', 'text'))
    ));



}

function draw_map(nodes) {
    total_temas = nodes.length;

    define_diagram();

    summary_placeholder = 'Clique em + para adicionar um resumo!';

    var nodeDataArray = [{ key: 0, text: nodes[0], summary: summary_placeholder }];
    for(let i = 1; i < nodes.length; i++)
    {
        content = String(nodes[i]).substring(1);
        
        if(content != nodes[0])
        {
            nodeDataArray.push({ key: i, text: content, summary: summary_placeholder });
        }
    }

    var linkDataArray = [];
    for(let i = 1; i < nodes.length; i++)
    {
        linkDataArray.push({ to: i, from: nodes[i][0] });
    }

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    //Setup map controls
    document.getElementById('fitDiagram').addEventListener('click', () => {
        diagram.scale = 1;
        diagram.commandHandler.zoomToFit();
        diagram.commandHandler.scrollToPart(diagram.findNodeForKey(0));

        document.getElementById('zoom').value = 1;
    });

    document.getElementById('zoom').addEventListener('input', (event) => {
        diagram.scale = event.target.value;
    })
    
    document.getElementById('button-mindmap-json').addEventListener('click', () => {
        var endModel = diagram.model.toJson(); //Converte o mapa mental em um json
        var filename = 'mapa_mental.json';
        var blob = new Blob([endModel], { type: 'application/json' });
        downloadElement(filename, blob);
    });

    document.getElementById('button-mindmap-pdf').addEventListener('click', printDiagram); 

    document.getElementById('button-mindmap-png').addEventListener("click", () => {
        var blob = diagram.makeImageData({ background: "white", returnType: "blob", callback: downloadImage });
    });

}

function downloadImage(blob){
    var filename = 'mapa_mental.png';
    downloadElement(filename, blob);
}

function downloadElement(filename, blob) {
    var temporaryA = document.createElement('a');
    temporaryA.style = "display: none";
    temporaryA.href = URL.createObjectURL(blob);
    temporaryA.target = '_blank';
    temporaryA.download = filename;
    temporaryA.click();
    URL.revokeObjectURL(temporaryA.href);
    
    alert("Confira se inicia o download");
}
    
function printDiagram() {
    var svgWindow = window.open();
    if (!svgWindow) return; 
    var bnds = diagram.documentBounds;
    var x = bnds.x;
    var y = bnds.y;
    var printSize = new go.Size(bnds.right + 1, 530);
    while (y < bnds.bottom) {
        while (x < bnds.right) {
        var svg = diagram.makeSvg({ scale: diagram.scale, position: new go.Point(x, y), size: printSize });
        svgWindow.document.body.appendChild(svg);
        x += printSize.width;
        }
        x = bnds.x;
        y += printSize.height;
    }
    setTimeout(() => svgWindow.print(), 1);

}

// Importar JSON
document.addEventListener('DOMContentLoaded', function ()
{
    const getDiagramInput = document.getElementById('importMindMap');

    getDiagramInput.addEventListener('change', function (){
        const file = this.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', function(){
            // funcao que carrega o json em mapa
            diagram.model = go.Model.fromJson(reader.result);
        }); 

        if(file){
            reader.readAsText(file)
        }
    });
});

function addCommentNote(){
    var key = total_temas +1;
    diagram.model.addNodeData({key: key, category:"Comment", text:"Clique duas vezes para editar", loc: "0 0"});
}

function changeNotesColor(cor)
{
    if(cor === 1)
    {
        note_color = 'DeepPink';
    }
    
    if(cor === 2)
    {
        note_color = "LightYellow";
    }
}

document.addEventListener('keydown', function(event){
    if(event.key === 'o')
    {
       changeNotesColor(1);     
    }
    if(event.key === 'p')
    {
        changeNotesColor(2);
    }
})
