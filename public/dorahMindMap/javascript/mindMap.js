var total_temas = 0;
note_color = "LightYellow";
pencilColor = "black";
line_color = "#935CFF";
arrow_color = "#935CFF";

function getColor() {
  return note_color;
}

function modePencilDrawing() {
  var size_pencil = 3;
  var tool = diagram.toolManager.findTool("FreehandDrawing");
  var pencil = document.getElementById("pencil");
  var highlighter = document.getElementById("highlighter");

  if (pencil.checked) {
    tool.isEnabled = true;
    if (pencilColor == 0)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#c5445b",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 1)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#e16432",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 2)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#f2cb2b",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 3)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#71c87a",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 4)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#709bf9",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 5)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#34508f",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 6)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#784bd1",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 7)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#dc1587",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 8)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "#896952",
        strokeWidth: size_pencil,
      };

    if (pencilColor == 9)
      tool.archetypePartData = {
        category: "FreehandDrawing",
        stroke: "black",
        strokeWidth: size_pencil,
      };
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

  onLoadDefs();

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

function changeColor(index) {
  var color1 = document.getElementById("color-button1");
  var color2 = document.getElementById("color-button2");
  var color3 = document.getElementById("color-button3");
  var color4 = document.getElementById("color-button4");
  var color5 = document.getElementById("color-button5");
  var color6 = document.getElementById("color-button6");
  var color7 = document.getElementById("color-button7");
  var color8 = document.getElementById("color-button8");
  var color9 = document.getElementById("color-button9");
  var color10 = document.getElementById("color-button10");

  if (index == 0) {
    pencilColor = 0;
    modePencilDrawing();
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 1) {
    pencilColor = 1;
    modePencilDrawing();
    color1.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 2) {
    pencilColor = 2;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 3) {
    pencilColor = 3;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 4) {
    pencilColor = 4;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 5) {
    pencilColor = 5;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 6) {
    pencilColor = 6;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color8.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 7) {
    pencilColor = 7;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color9.checked = false;
    color10.checked = false;
  }

  if (index == 8) {
    pencilColor = 8;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color10.checked = false;
  }

  if (index == 9) {
    pencilColor = 9;
    modePencilDrawing();
    color1.checked = false;
    color2.checked = false;
    color3.checked = false;
    color4.checked = false;
    color5.checked = false;
    color6.checked = false;
    color7.checked = false;
    color8.checked = false;
    color9.checked = false;
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
