if (typeof model === "function") {
  const { GraphLinksModel } = require("gojs");
}

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
    "animationManager.isEnabled": false, // AQUI
    "linkingTool.isUnconnectedLinkValid": true,
    "linkingTool.portGravity": 20,
    "relinkingTool.isUnconnectedLinkValid": true,
    "relinkingTool.portGravity": 20,
    "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
      segmentIndex: 0,
      cursor: "pointer",
      desiredSize: new go.Size(8, 8),
      fill: "#D9C6FF",
      stroke: "#935CFF",
    }),
    "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
      segmentIndex: -1,
      cursor: "pointer",
      desiredSize: new go.Size(8, 8),
      fill: "#D9C6FF",
      stroke: "#935CFF",
    }),
    "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
      desiredSize: new go.Size(7, 7),
      fill: "#D9C6FF",
      stroke: "#935CFF",
    }),
    "rotatingTool.handleAngle": 270,
    "rotatingTool.handleDistance": 30,
    "rotatingTool.snapAngleMultiple": 15,
    "rotatingTool.snapAngleEpsilon": 15,
    "undoManager.isEnabled": true,
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

  const temptonode = $(
    go.Node,
    { layerName: "Tool" },
    $(go.Shape, "RoundedRectangle", {
      stroke: "#D9C6FF",
      strokeWidth: 3,
      fill: "none",
      portId: "",
      width: 1,
      height: 1,
    })
  );

  diagram.toolManager.linkingTool.temporaryToNode = temptonode;
  diagram.toolManager.linkingTool.temporaryToPort = temptonode.port;
  globalThis.diagram = diagram;

  diagram.gridTemplate = $(
    go.Panel,
    "Grid",
    { gridCellSize: new go.Size(100, 100) },
    $(go.Shape, "Ellipse", { width: 1, height: 1, stroke: "gray" })
  );

  var nodeResizeAdornmentTemplate = $(
    go.Adornment,
    "Spot",
    { locationSpot: go.Spot.Right },
    $(go.Placeholder),
    $(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: "nw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      alignment: go.Spot.Top,
      cursor: "n-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: "ne-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),

    $(go.Shape, {
      alignment: go.Spot.Left,
      cursor: "w-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      alignment: go.Spot.Right,
      cursor: "e-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),

    $(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: "se-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: "s-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: "sw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue",
    })
  );

  var nodeRotateAdornmentTemplate = $(
    go.Adornment,
    { locationSpot: go.Spot.Center, locationObjectName: "ELLIPSE" },
    $(go.Shape, "Ellipse", {
      name: "ELLIPSE",
      cursor: "pointer",
      desiredSize: new go.Size(7, 7),
      fill: "lightblue",
      stroke: "deepskyblue",
    }),
    $(go.Shape, {
      geometryString: "M3.5 7 L3.5 30",
      isGeometryPositioned: true,
      stroke: "deepskyblue",
      strokeWidth: 1.5,
      strokeDashArray: [4, 2],
    })
  );

  function showSmallPorts(node, show) {
    if (!node || !node.ports) return;
    node.ports.each((port) => {
      if (port.portId !== "") {
        // don't change the default port, which is the big shape
        port.fill = show ? "rgba(0,0,0,.3)" : null;
      }
    });
  }

  var nodeSelectionAdornmentTemplate = $(
    go.Adornment,
    "Auto",
    $(go.Shape, {
      fill: null,
      stroke: "deepskyblue",
      strokeWidth: 1.5,
      strokeDashArray: [4, 2],
    }),
    $(go.Placeholder)
  );

  var linkSelectionAdornmentTemplate = $(
    go.Adornment,
    "Link",
    $(go.Shape, {
      isPanelMain: true,
      fill: null,
      stroke: "#935CFF",
      strokeWidth: 0,
    }) // use selection object's strokeWidth
  );

  function makePort(name, spot, output, input) {
    return $(go.Shape, "Circle", {
      fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
      stroke: null,
      desiredSize: new go.Size(7, 7),
      alignment: spot, // align the port on the main Shape
      alignmentFocus: spot, // just inside the Shape
      portId: name, // declare this object to be a "port"
      fromSpot: spot,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: "pointer", // show a different cursor to indicate potential link point
    });
  }

  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    {
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides,
      fromLinkable: true,
      toLinkable: true,
      locationSpot: go.Spot.Center,
    },
    new go.Binding("location", "location", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Panel,
      "Auto",
      { name: "PANEL" },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
        go.Size.stringify
      ),
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
        go.Panel,
        "Vertical",
        $(
          go.TextBlock,
          {
            margin: new go.Margin(10, 10, 10, 10),
            cursor: "pointer",
            editable: true,
            font: "18px Figtree, sans-serif",
          },
          new go.Binding("text").makeTwoWay()
        )
        /*
           $(
            go.TextBlock,
            {
              margin: new go.Margin(0, 10, 10, 10),
              cursor: "pointer",
              stroke: '#1e1f22',
              editable: true,
              font: "16px Figtree, sans-serif",
            },
             new go.Binding("text", "summary")
          )*/
      ),

      makePort("T", go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, true, false),
      {
        mouseEnter: (e, node) => showSmallPorts(node, true),
        mouseLeave: (e, node) => showSmallPorts(node, false),
      }
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
        fill: "#EBEBEB",
        stroke: "#C5C7D0",
        strokeWidth: 2,
        maxSize: new go.Size(500, NaN),
      }),

      $(
        go.TextBlock,
        {
          font: "regular  10px Figtree, sans-serif",
          editable: true,
          stroke: "#757575",
          margin: 10,
          maxSize: new go.Size(400, NaN),
          wrap: go.TextBlock.WrapDesiredSize,
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
        "ButtonBorder.strokeWidth": 2,

        click: addNodeAndLink,
      },
      $(go.TextBlock, "▼ Expandir o mapa", {
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
      $(go.TextBlock, "✦ Gerar resumo", {
        font: "bold 15px Figtree, sans-serif",
        stroke: "white",
      })
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    {
      selectable: true,
      relinkableFrom: true,
      relinkableTo: true,
      routing: go.Link.Orthogonal,
      corner: 50,
      toShortLength: 3,
      reshapable: true,
      curve: go.Link.Orthogonal,
      selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
      adjusting: go.Link.Strech,
    },
    new go.Binding("points").makeTwoWay(),
    new go.Binding("fromSpot", "fromSpot", go.Spot.parse).makeTwoWay(
      go.Spot.stringify
    ),
    new go.Binding("toSpot", "toSpot", go.Spot.parse).makeTwoWay(
      go.Spot.stringify
    ),
    $(go.Shape, { strokeWidth: 3, name: "SHAPE", stroke: line_color }), //linhas
    $(go.Shape, {
      toArrow: "Chevron",
      name: "ARROW",
      fill: arrow_color,
      stroke: null,
    })
  );

  /**
   * Adds a node and a link to the diagram.
   *
   * @param {go.InputEvent} e - The event object.
   * @param {go.GraphObject} obj - The object parameter.
   * @return {void} No return value.
   */
  function addNodeAndLink(e, obj) {
    let data = obj.part.data;
    let key = obj.part.key;

    console.log(total_temas);

    console.log(data);
    console.log(key);

    var url = "/api/generate/map/" + data.text + "?theme=" + theme;
    console.log(url);
    /** @type {GraphLinksModel} */
    let model = globalThis.diagram.model;

    document.getElementById("generating-info").style.display = "block";

    fetch(url)
      .then((response) => response.json())
      .then((newdata) => {
        for (let i = 0; i < newdata.topics.length; i++) {
          const content = newdata.topics[i];
          const summary = newdata.summaries[i];

          if (model.nodeDataArray.find((node) => node.text === content)) {
            continue;
          }
          console.log(content);
          console.log(model);
          console.log("addNodeAndLink");
          model.addNodeData({
            key: total_temas + 1,
            text: content,
            summary: summary,
          });
          model.addLinkData({
            from: key,
            to: total_temas + 1,
          });
          console.log("addNodeAndLink");

          total_temas++;
        }
      })
      .catch((error) => {
        alert("Erro ao gerar o mapa mental, tente novamente.");
        throw error;
      })
      .finally(() => {
        document.getElementById("generating-info").style.display = "none";
      });
  }

  function addSummary(e, obj) {
    /** @type {GraphLinksModel} */
    let model = globalThis.diagram.model;
    let data = obj.part.data;
    let key = obj.part.key;

    console.log(data);
    console.log(key);

    let url = "/api/generate/summary/" + data.text;

    document.getElementById("summary-info").style.display = "block";

    fetch(url)
      .then((response) => response.json())
      .then((newdata) => {
        console.log(newdata.summary);
        model.setDataProperty(data, "summary", newdata.summary);
        console.log(obj);
      })
      .catch((error) => {
        alert("Erro ao gerar o resumo, tente novamente.");
        throw error;
      })
      .finally(() => {
        document.getElementById("summary-info").style.display = "none";
      });
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
          $(go.Shape, { stroke: "#935CFF", fill: null }),
          $(go.Placeholder, { margin: -1 })
        ),
      },
      { resizable: true, resizeObjectName: "SHAPE" },
      { rotatable: true, rotateObjectName: "SHAPE" },
      { reshapable: true },
      $(
        go.Shape,
        {
          name: "SHAPE",
          fill: null,
          strokeWidth: 1,
          geometryString: "F M0 0 C10 30 40 30 50 0 C60 30 90 30 100 0",
        },
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
    strokeWidth: 2,
  };
  tool.isBackgroundOnly = false;
  tool.isEnabled = false;
  diagram.toolManager.mouseMoveTools.insertAt(0, tool);
}
