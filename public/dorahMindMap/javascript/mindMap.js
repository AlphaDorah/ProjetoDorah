var total_temas = 0;
let note_color = "#FEFF9C";

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
                $(go.Shape, "RoundedRectangle", { fill: null, stroke: "#CB77FF", strokeWidth: 3 }), 
                $(go.Placeholder, { margin: -2 })
            ),
            $(go.Panel, "Auto", {
                alignment: go.Spot.Bottom,
                alignmentFocus: go.Spot.Top
            },
                $(go.Shape, "RoundedRectangle",
                    {
                        fill: "white", stroke: "black", strokeWidth: 3
                    }),
                $(go.TextBlock, { font: "bold  15px Figtree, sans-serif", stroke: "#757575", margin: 10 },
                    new go.Binding("text", "summary")),
            ),
            $("Button",
                {
                    alignment: go.Spot.Right,
                    "ButtonBorder.figure": "Circle",
                    "ButtonBorder.fill": "white",
                    "ButtonBorder.stroke": "black",
                    "ButtonBorder.strokeWidth": 3,

                    click: addNodeAndLink
                },
                $(go.TextBlock, "+",
                    { font: "bold 15px Figtree, sans-serif", stroke: "#757575" }),
            )
        ); 

    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal, corner: 5, selectable: false },
            $(go.Shape, { strokeWidth: 3, stroke: "#D99BFF"}), //linhas
            $(go.Shape, {toArrow: 'Chevron', fill: "#D99BFF", stroke: null})

        );

    function addNodeAndLink(e, obj) {
        var adorn = obj.part;
        var oldnode = adorn.adornedPart;
        
        link = window.location.href;

        link += ";" + String(oldnode.key) + "generate";

        window.open(link, "_self");
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
            stroke:null,
            fill: note_color
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

function openDownloadMenu(){
    let menuMobile = document.getElementById("downloadMenu");
    if (!menuMobile.classList.contains('open')) {
        menuMobile.classList.add('open');
    }
}

function closeDownloadMenu(){
    let menuMobile = document.getElementById("downloadMenu");
    menuMobile.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function ()
{
    const getDiagramInput = document.getElementById('importMindMap');

    getDiagramInput.addEventListener('change', function (){
        const file = this.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', function(){
            diagram.model = go.Model.fromJson(reader.result);
        }); 

        if(file){
            reader.readAsText(file)
        }
    });
});

function addCommentNote(){
    var key = total_temas +1;
    diagram.model.addNodeData({key: key, category:"Comment", text:"Clique duplo para editar", loc: "0 0"});
}

function changeNotesColor(cor)
{
    if(cor === 1)
    {
        note_color = "#FF65A3";
        alert(cor);
    }
    
    if(cor === 2)
    {
        note_color = "#FEFF9C";
        alert(cor);
    }
}

document.addEventListener('keydown', function(event){
    if(event.key === 'c')
    {
       changeNotesColor(1);     
    }
    if(event.key === 'v')
    {
        changeNotesColor(2);
    }
})

