var total_temas = 0;
let note_color = "LightYellow";
let line_color = "#935CFF";
let arrow_color = "#935CFF";
var zoomRange = document.getElementById("zoom");
if (!zoomRange) {
  console.log("zoomRange not found");
}

document.getElementById("id-historybutton").style.display = "none";

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

function modePencilDrawing() {
  var color_pencil = "black";
  var size_pencil = 3;
  var tool = diagram.toolManager.findTool("FreehandDrawing");
  var pencil = document.getElementById("pencil");
  var highlighter = document.getElementById("highlighter");

  if (pencil.checked) {
    tool.archetypePartData = {
      category: "FreehandDrawing",
      stroke: color_pencil,
      strokeWidth: size_pencil,
    };
    tool.isEnabled = true;
  } else {
    tool.isEnabled = false;
  }

  if (highlighter.checked) {
    highlighter.checked = false;
  }
}

function modeHighlighterDrawing() {
  var color_highlighter = "rgb(255, 255, 0, 0.30)";
  var size_highlighter = 40;
  var tool = diagram.toolManager.findTool("FreehandDrawing");
  var highlighter = document.getElementById("highlighter");
  var pencil = document.getElementById("pencil");

  if (highlighter.checked) {
    tool.archetypePartData = {
      category: "FreehandDrawing",
      stroke: color_highlighter,
      strokeWidth: size_highlighter,
    };
    tool.isEnabled = true;
  } else {
    tool.isEnabled = false;
  }

  if (pencil.checked) {
    pencil.checked = false;
  }
}

function init_map(theme) {
  define_diagram();

  var nodeDataArray = [{ key: 0, text: theme, summary: "" }];
  var linkDataArray = [];

  globalThis.diagram.model = new go.GraphLinksModel(
    nodeDataArray,
    linkDataArray
  );

  var url = "/api/generate/map/" + theme;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      draw_map(data.topics, data.summaries);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Erro ao gerar o mapa mental, tente novamente.");
    });
}

function draw_map(nodes, summaries) {
  total_temas = nodes.length;

  var nodeDataArray = [{ key: 0, text: theme, summary: "" }];
  for (let i = 0; i < nodes.length; i++) {
    const content = nodes[i];
    if (content == theme) continue;
    nodeDataArray.push({
      key: i + 1,
      text: content,
      summary: summaries[i],
    });
  }

  var linkDataArray = [];
  for (let i = 1; i < nodes.length + 1; i++) {
    linkDataArray.push({ to: i, from: 0 });
  }

  globalThis.diagram.model = new go.GraphLinksModel(
    nodeDataArray,
    linkDataArray
  );

  //Setup map controls
  document.getElementById("fitDiagram").addEventListener("click", () => {
    globalThis.diagram.scale = 1;
    globalThis.diagram.commandHandler.zoomToFit();
    globalThis.diagram.commandHandler.scrollToPart(diagram.findNodeForKey(0));

    document.getElementById("zoom").value = 1;
  });

  document.getElementById("zoom").addEventListener("input", (event) => {
    globalThis.diagram.scale = event.target.value;
  });

  document
    .getElementById("button-mindmap-json")
    .addEventListener("click", () => {
      var endModel = globalThis.diagram.model.toJson(); //Converte o mapa mental em um json
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
      var blob = globalThis.diagram.makeImageData({
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
  var bnds = globalThis.diagram.documentBounds;
  var x = bnds.x;
  var y = bnds.y;
  var printSize = new go.Size(bnds.right + 1, 530);
  while (y < bnds.bottom) {
    while (x < bnds.right) {
      var svg = globalThis.diagram.makeSvg({
        scale: globalThis.diagram.scale,
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
    globalThis.diagram.model = go.Model.fromJson(reader.result);
  });

  if (file) {
    reader.readAsText(file);
  }
}

setColorPalette = false;

function addCommentNote() {
  const colorPalette = true;
  var key = total_temas + 1;
  globalThis.diagram.model.addNodeData({
    key: key,
    category: "Comment",
    text: "Clique duas vezes para editar",
    loc: "0 0",
    id: "NotaAdesiva",
  });
}

function changeNotesColor(cor) {
  let node = globalThis.diagram.findNodeForKey("NotaAdesiva");

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
    const arrow_color = "rgb(224,228,204)";
    const line_color = "rgb(224,228,204)";
    globalThis.diagram.requestUpdate();
    globalThis.diagram.rebuildParts;
  }
}
