var total_temas = 0;
note_color = "LightYellow";
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
    allowCopy: false,
    allowDelete: true,
    maxSelectionCount: 1,
    "undoManager.isEnabled": true,
    "commandHandler.deletesTree": true,
    "draggingTool.dragsTree": true,

    layout: $(go.TreeLayout, {
      angle: 90,
      nodeSpacing: 15,
      layerSpacing: 60,
      layerStyle: go.TreeLayout.LayerUniform,
    }),
  });

  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(go.Shape, "RoundedRectangle", {
      stroke: "#C5C7D0",
      strokeWidth: 1,
      fill: "white",
    }),
    $(
      go.TextBlock,
      { margin: 10, font: "18px Figtree, sans-serif" },
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
        },
        new go.Binding("text", "summary")
      )
    ),
    $(
      "Button",
      {
        alignment: go.Spot.Right,
        "ButtonBorder.figure": "RoundedRectangle",
        "ButtonBorder.fill": "#784BD1",
        "ButtonBorder.stroke": null,
        "ButtonBorder.strokeWidth": 3,

        click: addNodeAndLink,
      },
      $(go.TextBlock, "+", {
        font: "bold 15px Figtree, sans-serif",
        stroke: "white",
      })
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 50, selectable: false },
    $(go.Shape, { strokeWidth: 3, stroke: "#935CFF" }), //linhas
    $(go.Shape, { toArrow:  "Chevron", name: "ARROW", fill: "#935CFF", stroke: null })
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
}

function draw_map(nodes) {
  total_temas = nodes.length;

  define_diagram();

  summary_placeholder = "Clique em + para adicionar um resumo!";

  var nodeDataArray = [
    { key: 0, text: nodes[0], summary: summary_placeholder },
  ];
  for (let i = 1; i < nodes.length; i++) {
    content = String(nodes[i]).substring(1);

    if (content != nodes[0]) {
      nodeDataArray.push({
        key: i,
        text: content,
        summary: summary_placeholder,
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

function openDownloadMenu() {
  let menuMobile = document.getElementById("downloadMenu");
  if (!menuMobile.classList.contains("open")) {
    menuMobile.classList.add("open");
  }
}

function closeDownloadMenu() {
  let menuMobile = document.getElementById("downloadMenu");
  menuMobile.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const getDiagramInput = document.getElementById("importMindMap");

  getDiagramInput.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      diagram.model = go.Model.fromJson(reader.result);
    });

    if (file) {
      reader.readAsText(file);
    }
  });
});

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

    if(node !== null)
    {
        if(color === 1)
        {
            node.findObject("NotaAdesiva").fill = "#ff7e7e";
        }
        if(cor === 2)
        {
            node.findObject("NotaAdesiva").fill = "#ffd97e";
        }
    }
}

function generateFlashcards() {
  let body = {
    summary:
      "O Brasil é um país de dimensões continentais que fica na América do Sul. É o quinto maior país do mundo em extensão territorial (8.515.767 km²) e o sexto em população (cerca de 210 milhões de habitantes).",
  };

  document.getElementById("generate-flashcards").classList.add("disabled");
  document.getElementById("generate-flashcards").innerHTML =
    "Gerando Flashcards...";
  document.getElementById("generate-flashcards").disabled = true;
  console.log("Gerando flashcards...");

  fetch("/api/generate/flashcard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async function (response) {
    let flashcard = await response.json();
    localStorage.setItem("ProjetoDorahFlashcards", JSON.stringify(flashcard));

    console.log("Flashcards gerados!");
    document.getElementById("generate-flashcards").classList.remove("disabled");
    document.getElementById("generate-flashcards").innerHTML =
      "Gerar Flashcards";
    document.getElementById("generate-flashcards").disabled = false;
  });
}

function openFlashcards() {
  window.open("/flashcards", "_blank");
}


function setColorPalette()
{
    let colorButton1 = document.getElementById('color-button1');
    let colorButton2 = document.getElementById('color-button2');
    let colorButton3 = document.getElementById('color-button3');
    let colorButton4 = document.getElementById('color-button4');
    let colorButton5 = document.getElementById('color-button5');
    let colorButton6 = document.getElementById('color-button6');
    let colorButton7 = document.getElementById('color-button7');
    let colorButton8 = document.getElementById('color-button8');
    let colorButton9 = document.getElementById('color-button9');
    let colorButton10 = document.getElementById('color-button10');

    if(colorPalette === true)
    {
        colorButton1.style.display = 'block';
        colorButton2.style.display = 'block';
        colorButton3.style.display = 'block';
        colorButton4.style.display = 'block';
        colorButton5.style.display = 'block';
        colorButton6.style.display = 'block';
        colorButton7.style.display = 'block';
        colorButton8.style.display = 'block';
        colorButton9.style.display = 'block';
        colorButton10.style.display = 'block';

    }
    if(colorPalette === false)
    {
        colorButton1.style.display = 'none';
        colorButton2.style.display = 'none';
        colorButton3.style.display = 'none';
        colorButton4.style.display = 'none';
        colorButton5.style.display = 'none';
        colorButton6.style.display = 'none';
        colorButton7.style.display = 'none';
        colorButton8.style.display = 'none';
        colorButton9.style.display = 'none';
        colorButton10.style.display = 'none';
    }
}

setInterval(setColorPalette, 1);

function changeArrowColor()
{
    let
}