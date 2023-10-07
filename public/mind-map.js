var total_temas = 0;

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
                        { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
            });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", {
                stroke: "#757575",
                strokeWidth: 3,
                fill: "white"
            }),
            $(go.TextBlock, { margin: 10, font: "18px sans-serif" },
                new go.Binding("text"))
        );

    diagram.nodeTemplate.selectionAdornmentTemplate =
        $(go.Adornment, "Spot",
            $(go.Panel, "Auto",
                $(go.Shape, "RoundedRectangle", { fill: null, stroke: "black", strokeWidth: 3 }),
                $(go.Placeholder, { margin: 5 })
            ),
            $(go.Panel, "Auto", {
                alignment: go.Spot.Bottom,
                alignmentFocus: go.Spot.Top
            },
                $(go.Shape, "RoundedRectangle",
                    {
                        fill: "white", stroke: "black", strokeWidth: 3
                    }),
                $(go.TextBlock, { font: "bold 15px sans-serif", stroke: "#757575", margin: 10 },
                    new go.Binding("text", "sumary")),
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
                    { font: "bold 15px sans-serif", stroke: "#757575" }),
            )
        );

    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal, corner: 5, selectable: false },
            $(go.Shape,
                { strokeWidth: 3, stroke: "#757575" })
        );

    function addNodeAndLink(e, obj) {
        var adorn = obj.part;

        diagram.startTransaction("Add Node");
        var oldnode = adorn.adornedPart;

        var newdata = { key: total_temas + 1, text: `Novo Subtema ${total_temas}`, sumary: `Resumo do subtema ${total_temas}` };
        diagram.model.addNodeData(newdata);
        diagram.model.addLinkData({ from: oldnode.key, to: newdata.key })

        total_temas++;

        diagram.commitTransaction("Add Node");

        var newnode = diagram.findNodeForData(newdata);
        if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
    }
}

function draw_map(temas, resumos) {
    total_temas = temas.length;
    
    define_diagram();

    var nodeDataArray = [];
    for (let i = 0; i < temas.length; i++) {
        nodeDataArray.push({ key: i, text: temas[i], sumary: resumos[i] });
    }

    var linkDataArray = [];
    for (let i = 1; i < temas.length; i++) {
        linkDataArray.push({ to: i, from: 0 });
    }

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}