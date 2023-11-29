var total_temas = 0;
note_color = "LightYellow";
line_color = "#935CFF";
arrow_color = "#935CFF";
var zoomRange = document.getElementById("zoom");
if (!zoomRange) {
  console.log("zoomRange not found");
}

zoomRange.addEventListener("input", function () {
  var percent =
    ((zoomRange.value - zoomRange.min) / (zoomRange.max - zoomRange.min)) * 100;
  zoomRange.style.background =
    "linear-gradient(to right, #0073EA 0%, #0073EA " +
    percent +
    "%, white " +
    percent +
    "%, white 100%)";
});

function getColor() {
  return note_color;
}

function define_diagram() {
  const $ = go.GraphObject.make;

  diagram = new go.Diagram("mind-map", {
    allowCopy: true,
    allowDelete: true,
    maxSelectionCount: 1,
    "undoManager.isEnabled": true,
    "commandHandler.deletesTree": true,
    "draggingTool.dragsTree": true,
    "grid.visible": false,
    "animationManager.isEnabled": false,// AQUI
    "linkingTool.isUnconnectedLinkValid": true,
    "linkingTool.portGravity": 20,
    "relinkingTool.isUnconnectedLinkValid": true,
    "relinkingTool.portGravity": 20,
    "relinkingTool.fromHandleArchetype":
        $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
    "relinkingTool.toHandleArchetype":
        $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
    "linkReshapingTool.handleArchetype":
        $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
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

  diagram.gridTemplate = $(
    go.Panel,
    "Grid",
    { gridCellSize: new go.Size(100, 100) },
    $(go.Shape, "Ellipse", { width: 1, height: 1, stroke: "gray" })
  );

  var nodeResizeAdornmentTemplate =
        $(go.Adornment, "Spot",
          { locationSpot: go.Spot.Right },
          $(go.Placeholder),
          $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
        );

var nodeRotateAdornmentTemplate =
    $(go.Adornment,
    { locationSpot: go.Spot.Center, locationObjectName: "ELLIPSE" },
        $(go.Shape, "Ellipse", { name: "ELLIPSE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
        $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
    );


function showSmallPorts(node, show) {
    node.ports.each(port => {
        if (port.portId !== "") {  // don't change the default port, which is the big shape
            port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
    });
}

var nodeSelectionAdornmentTemplate =
    $(go.Adornment, "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
    $(go.Placeholder)
);

var linkSelectionAdornmentTemplate =
    $(go.Adornment, "Link",
        $(go.Shape,
            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
);


function makePort(name, spot, output, input)
{

    return $(go.Shape, "Circle",
    {
        fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
        stroke: null,
        desiredSize: new go.Size(7, 7),
        alignment: spot,  // align the port on the main Shape
        alignmentFocus: spot,  // just inside the Shape
        portId: name,  // declare this object to be a "port"
        fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
        fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
        cursor: "pointer"  // show a different cursor to indicate potential link point
    });
}
  diagram.nodeTemplate =
  $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
          { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
          { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
          new go.Binding("angle").makeTwoWay(),

    $(go.Panel, "Auto",
    { name: 'PANEL'},
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        $(go.Shape,
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
      $(go.TextBlock,
      {
        margin: 10,
        cursor: "pointer",
        editable: true,
        font: "18px Figtree, sans-serif",
      },
       new go.Binding("text").makeTwoWay()),


        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false),
        {
            mouseEnter: (e, node) => showSmallPorts(node, true),
            mouseLeave: (e, node) => showSmallPorts(node, false)
        }
    ),



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
        toLinkableDuplicates: true
      }),
      $(go.Placeholder, { margin: -2 }),

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
        stroke: "black",
        strokeWidth: 2,
      }),

        $(
        go.TextBlock,
        {
          font: "regular  10px Figtree, sans-serif",
          editable: true,
          stroke: "#757575",
          margin: 10,
          maxSize: new go.Size(400, NaN),
            wrap: go.TextBlock.WrapDesiredSize
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
      $(go.TextBlock, "v Expandir o mapa", {
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
      $(go.TextBlock, "+ Adicionar Resumo", {
        font: "bold 15px Figtree, sans-serif",
        stroke: "white",
      })
    ),
  );

  diagram.linkTemplate =
  $(go.Link,
    {
      selectable: true,
      relinkableFrom: true,
      relinkableTo: true,
      routing: go.Link.Orthogonal,
      corner: 50,
      toShortLength: 3,
      reshapable: true,
      curve: go.Link.Orthogonal,
      selectionAdornmentTemplate: linkSelectionAdornmentTemplate
    },
    new go.Binding("points").makeTwoWay(),
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

    link = window.location.href;
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

    link = window.location.href;
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
          stroke:'black',
          margin: 10,
          editable: true,
          font: "16px Kalam, sans-serif",
        },
        new go.Binding("text", "text")
      )
    )
  );
   
  diagram.nodeTemplateMap.add("FreehandDrawing",
    $(go.Part,
      { locationSpot: go.Spot.Center, isLayoutPositioned: false },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      {
        selectionAdorned: true,
        selectionObjectName: "SHAPE",
        selectionAdornmentTemplate:
          $(go.Adornment, "Auto",
            $(go.Shape, { stroke: "dodgerblue", fill: null }),
            $(go.Placeholder, { margin: -1 }))
      },
      { resizable: true, resizeObjectName: "SHAPE" },
      { rotatable: true, rotateObjectName: "SHAPE" },
      { reshapable: true },
      $(go.Shape,
        { name: "SHAPE", fill: null, strokeWidth: 1.5 },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
        new go.Binding("angle").makeTwoWay(),
        new go.Binding("geometryString", "geo").makeTwoWay(),
        new go.Binding("fill"),
        new go.Binding("stroke"),
        new go.Binding("strokeWidth"))
    ));
  var tool = new FreehandDrawingTool();
  tool.archetypePartData = { category: "FreehandDrawing", stroke: 'black', strokeWidth: 4 };
  tool.isBackgroundOnly = false;
  tool.isEnabled = false;
  diagram.toolManager.mouseMoveTools.insertAt(0, tool);
}

function modePencilDrawing() {
  var color_pencil = 'black';
  var size_pencil =  3;
  var tool = diagram.toolManager.findTool("FreehandDrawing");
  var pencil = document.getElementById("pencil");
  var highlighter = document.getElementById("highlighter");
  
  if(pencil.checked) {
    tool.archetypePartData = { category: "FreehandDrawing", stroke: color_pencil, strokeWidth: size_pencil };
    tool.isEnabled = true;
  }
  else{
    tool.isEnabled = false;
  }

  if(highlighter.checked) {
    highlighter.checked = false;
  }
}

function modeHighlighterDrawing() {
  var color_highlighter = 'rgb(255, 255, 0, 0.30)';
  var size_highlighter =  40;
  var tool = diagram.toolManager.findTool("FreehandDrawing");
  var highlighter = document.getElementById("highlighter");
  var pencil = document.getElementById("pencil");
  
  if(highlighter.checked) {
    tool.archetypePartData = { category: "FreehandDrawing", stroke: color_highlighter, strokeWidth: size_highlighter };
    tool.isEnabled = true;
  }
  else{
    tool.isEnabled = false;
  }

  if(pencil.checked) {
    pencil.checked = false;
  }
}

function draw_map(nodes, summaries) {
  total_temas = nodes.length;

  define_diagram();

  var nodeDataArray = [
    { key: 0, text: nodes[0], summary: summaries[0] },
  ];
  for (let i = 1; i < nodes.length; i++) {
    content = String(nodes[i]).substring(1);

    if (content != nodes[0]) {
      nodeDataArray.push({
        key: i,
        text: content,
        summary: summaries[i],
      });
    }
  }

  var linkDataArray = [];
  for (let i = 1; i < nodes.length; i++) {
    linkDataArray.push({ to: i, from: nodes[i][0] });
  }

  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  //Setup map controls
  document.getElementById("fitDiagram").addEventListener("click", () => {
    diagram.scale = 1;
    diagram.commandHandler.zoomToFit();
    diagram.commandHandler.scrollToPart(diagram.findNodeForKey(0));

    document.getElementById("zoom").value = 1;
  });

  document.getElementById("zoom").addEventListener("input", (event) => {
    diagram.scale = event.target.value;
  });

  document
    .getElementById("button-mindmap-json")
    .addEventListener("click", () => {
      var endModel = diagram.model.toJson(); //Converte o mapa mental em um json
      var filename = "mapa_mental.json";
      var blob = new Blob([endModel], { type: "application/json" });
      downloadElement(filename, blob);
    });

  document
    .getElementById("button-mindmap-pdf")
    .addEventListener("click", printDiagram);

  document
    .getElementById("button-mindmap-png")
    .addEventListener("click", () => {
      var blob = diagram.makeImageData({
        background: "white",
        returnType: "blob",
        callback: downloadImage,
      });
    });
}

function downloadImage(blob) {
  var filename = "mapa_mental.png";
  downloadElement(filename, blob);
}

function downloadElement(filename, blob) {
  var temporaryA = document.createElement("a");
  temporaryA.style = "display: none";
  temporaryA.href = URL.createObjectURL(blob);
  temporaryA.target = "_blank";
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
      var svg = diagram.makeSvg({
        scale: diagram.scale,
        position: new go.Point(x, y),
        size: printSize,
      });
      svgWindow.document.body.appendChild(svg);
      x += printSize.width;
    }
    x = bnds.x;
    y += printSize.height;
  }
  setTimeout(() => svgWindow.print(), 1);
}

function loadImportMindMap() {
  var uploadFileMap = document.getElementById("importMindMap");
  const file = uploadFileMap.files[0];
  const reader = new FileReader();

  alert("Vai importar " + file.name);

  reader.addEventListener("load", function () {
    // funcao que carrega o json em mapa
    diagram.model = go.Model.fromJson(reader.result);
  });

  if (file) {
    reader.readAsText(file);
  }
}

colorPalette = false;

function addCommentNote() {
  colorPalette = true;
  var key = total_temas + 1;
  diagram.model.addNodeData({
    key: key,
    category: "Comment",
    text: "Clique duas vezes para editar",
    loc: "0 0",
    id: "NotaAdesiva",
  });
}

function changeNotesColor(cor) {
  let node = diagram.findNodeForKey("NotaAdesiva");

  if (node !== null) {
    if (color === 1) {
      node.findObject("NotaAdesiva").fill = "#ff7e7e";
    }
    if (cor === 2) {
      node.findObject("NotaAdesiva").fill = "#ffd97e";
    }
  }
}

function setColorPalette() {
  let colorButton1 = document.getElementById("color-button1");
  let colorButton2 = document.getElementById("color-button2");
  let colorButton3 = document.getElementById("color-button3");
  let colorButton4 = document.getElementById("color-button4");
  let colorButton5 = document.getElementById("color-button5");
  let colorButton6 = document.getElementById("color-button6");
  let colorButton7 = document.getElementById("color-button7");
  let colorButton8 = document.getElementById("color-button8");
  let colorButton9 = document.getElementById("color-button9");
  let colorButton10 = document.getElementById("color-button10");

  if (colorPalette === true) {
    colorButton1.style.display = "block";
    colorButton2.style.display = "block";
    colorButton3.style.display = "block";
    colorButton4.style.display = "block";
    colorButton5.style.display = "block";
    colorButton6.style.display = "block";
    colorButton7.style.display = "block";
    colorButton8.style.display = "block";
    colorButton9.style.display = "block";
    colorButton10.style.display = "block";
  }
  if (colorPalette === false) {
    colorButton1.style.display = "none";
    colorButton2.style.display = "none";
    colorButton3.style.display = "none";
    colorButton4.style.display = "none";
    colorButton5.style.display = "none";
    colorButton6.style.display = "none";
    colorButton7.style.display = "none";
    colorButton8.style.display = "none";
    colorButton9.style.display = "none";
    colorButton10.style.display = "none";
  }
}

//setInterval(setColorPalette, 1);

function changeArrowColor(colorNumber) {
  if (colorNumber === 1) {
    arrow_color = "rgb(224,228,204)";
    line_color = "rgb(224,228,204)";
    diagram.requestUpdate();
    diagram.rebuildParts;
  }
}
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
diagram.model.modelData = { test: true, hello: "world", version: 42 };
diagram.select(diagram.nodes.first());

var inspector = new Inspector("myInspectorDiv", diagram, {
  multipleSelection: true,
  showSize: 4,
  showAllProperties: true,
  properties: {
    color: { show: Inspector.showIfPresent, type: "color" },
    choices: { show: false },
    password: { show: Inspector.showIfPresent, type: "password" },
  },
});
