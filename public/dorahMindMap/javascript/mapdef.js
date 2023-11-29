function define_diagram() {
  const $ = go.GraphObject.make;

  const diagram = new go.Diagram("mind-map", {
    allowCopy: true,
    allowDelete: true,
    maxSelectionCount: 1,
    "undoManager.isEnabled": true,
    "commandHandler.deletesTree": true,
    "draggingTool.dragsTree": true,
    "grid.visible": false,
    "animationManager.isEnabled": false,
    "clickCreatingTool.archetypeNodeData": {
      text: "Clique duas vezes para editar",
      color: "white",
      stroke: "#C5C7D0",
      strokeWidth: 1,
      fill: "white",
      cursor: "pointer",
    },
    "commandHandler.archetypeGroupData": {
      text: "Group",
      isGroup: true,
      color: "blue",
    },

    layout: $(go.TreeLayout, {
      angle: 90,
      nodeSpacing: 15,
      layerSpacing: 60,
      layerStyle: go.TreeLayout.LayerUniform,
    }),
  });

  globalThis.diagram = diagram;

  diagram.gridTemplate = $(
    go.Panel,
    "Grid",
    { gridCellSize: new go.Size(100, 100) },
    $(go.Shape, "Ellipse", { width: 1, height: 1, stroke: "gray" })
  );

  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      {
        stroke: "#C5C7D0",
        strokeWidth: 1,
        fill: "white",
        cursor: "pointer",
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableSelfNode: true,
        toLinkableDuplicates: true,
      },
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      {
        margin: 10,
        cursor: "pointer",
        editable: true,
        font: "18px Figtree, sans-serif",
      },
      new go.Binding("text")
    )
  );

  diagram.nodeTemplate.selectionAdornmentTemplate = $(
    go.Adornment,
    "Spot",
    $(
      go.Panel,
      "Auto",
      $(go.Shape, "RoundedRectangle", {
        fill: null,
        stroke: "#935CFF",
        strokeWidth: 3,
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableSelfNode: true,
        toLinkableDuplicates: true,
      }),
      $(go.Placeholder, { margin: -2 })
    ),
    $(
      go.Panel,
      "Auto",
      {
        alignment: go.Spot.Bottom,
        alignmentFocus: go.Spot.Top,
      },
      $(go.Shape, "RoundedRectangle", {
        fill: "EBEBEB",
        stroke: "black",
        strokeWidth: 3,
      }),
      $(
        go.TextBlock,
        {
          font: "regular  10px Figtree, sans-serif",
          editable: true,
          stroke: "#757575",
          margin: 10,
          editable: true,
        },
        new go.Binding("text", "summary")
      )
    ),
    $(
      "Button",
      {
        alignment: go.Spot.BottomRight,
        "ButtonBorder.figure": "RoundedRectangle",
        "ButtonBorder.fill": "#784BD1",
        "ButtonBorder.stroke": null,
        "ButtonBorder.strokeWidth": 3,

        click: addNodeAndLink,
      },
      $(go.TextBlock, "v", {
        font: "bold 15px Figtree, sans-serif",
        stroke: "white",
      })
    ),
    $(
      "Button",
      {
        alignment: go.Spot.TopRight,
        "ButtonBorder.figure": "RoundedRectangle",
        "ButtonBorder.fill": "#784BD1",
        "ButtonBorder.stroke": null,
        "ButtonBorder.strokeWidth": 3,

        click: addSummary,
      },
      $(go.TextBlock, "+", {
        font: "bold 15px Figtree, sans-serif",
        stroke: "white",
      })
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.Orthogonal,
      corner: 50,
      selectable: true,
      relinkableFrom: true,
      relinkableTo: true,
    },
    $(go.Shape, { strokeWidth: 3, name: "SHAPE", stroke: line_color }), //linhas
    $(go.Shape, {
      toArrow: "Chevron",
      name: "ARROW",
      fill: arrow_color,
      stroke: null,
    })
  );

  function addNodeAndLink(e, obj) {
    let buttonOn = document.getElementById("id-toggleon");
    var adorn = obj.part;
    var oldnode = adorn.adornedPart;

    let link = window.location.href;
    link = link.split("&");

    if (buttonOn.style.display == "none") {
      var newdata = {
        key: total_temas + 1,
        text: `Novo Subtema ${total_temas}`,
        sumary: `Resumo do subtema ${total_temas}`,
      };
      link[0] += oldnode.key + newdata.text + ";";
    } else {
      link[0] += String(oldnode.key) + "generate" + ";";
    }

    window.open(link[0] + "&" + link[1], "_self");
  }

  function addSummary(e, obj) {
    var adorn = obj.part;
    var node = adorn.adornedPart;

    let link = window.location.href;
    link = link.split("&");

    link[1] += String(node.key) + ";";

    window.open(link[0] + "&" + link[1], "_self");
  }

  function nodeStyle() {
    return [
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        locationSpot: go.Spot.Center,
      },
    ];
  }

  diagram.nodeTemplateMap.add(
    "Comment", //Notas autoadesivas
    $(
      go.Node,
      "Auto",
      nodeStyle(),
      { minSize: new go.Size(160, 160) },
      $(go.Shape, "Rectangle", {
        fill: note_color,
        stroke: null,
      }),
      $(
        go.TextBlock,
        {
          stroke: "black",
          margin: 10,
          editable: true,
          font: "16px Kalam, sans-serif",
        },
        new go.Binding("text", "text")
      )
    )
  );

  diagram.nodeTemplateMap.add(
    "FreehandDrawing",
    $(
      go.Part,
      { locationSpot: go.Spot.Center, isLayoutPositioned: false },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        selectionAdorned: true,
        selectionObjectName: "SHAPE",
        selectionAdornmentTemplate: $(
          go.Adornment,
          "Auto",
          $(go.Shape, { stroke: "dodgerblue", fill: null }),
          $(go.Placeholder, { margin: -1 })
        ),
      },
      { resizable: true, resizeObjectName: "SHAPE" },
      { rotatable: true, rotateObjectName: "SHAPE" },
      { reshapable: true },
      $(
        go.Shape,
        { name: "SHAPE", fill: null, strokeWidth: 1.5 },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        new go.Binding("angle").makeTwoWay(),
        new go.Binding("geometryString", "geo").makeTwoWay(),
        new go.Binding("fill"),
        new go.Binding("stroke"),
        new go.Binding("strokeWidth")
      )
    )
  );
  var tool = new FreehandDrawingTool();
  tool.archetypePartData = {
    category: "FreehandDrawing",
    stroke: "black",
    strokeWidth: 4,
  };
  tool.isBackgroundOnly = false;
  tool.isEnabled = false;
  diagram.toolManager.mouseMoveTools.insertAt(0, tool);
}
