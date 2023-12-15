function onLoadDefs() {
  var zoomRange = document.getElementById("zoom");
  if (!zoomRange) {
    console.log("zoomRange not found");
  }

  zoomRange.addEventListener("input", function () {
    var percent =
      ((zoomRange.value - zoomRange.min) / (zoomRange.max - zoomRange.min)) *
      100;
    zoomRange.style.background =
      "linear-gradient(to right, #0073EA 0%, #0073EA " +
      percent +
      "%, white " +
      percent +
      "%, white 100%)";
  });

  const diagram = globalThis.diagram;
  document.getElementById("id-historybutton").style.display = "none";
}
