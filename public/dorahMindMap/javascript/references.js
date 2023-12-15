let loaded_references = false;

function loadReferences() {
  if (loaded_references) {
    return;
  }
  let info = document.getElementById("links-info");
  info.style.display = "block";
  fetch("/api/generate/links/" + theme)
    .then((response) => response.json())
    .then((data) => {
      let referenceArea = document.getElementById("referenceArea");
      referenceArea.innerHTML = "";
      console.log(data["links"]);

      for (let i = 0; i < data["links"].length; i++) {
        let reference = data["links"][i];
        let referenceLink = document.createElement("a");
        referenceLink.href = reference;
        referenceLink.target = "_blank";
        referenceLink.innerHTML = reference;

        referenceArea.appendChild(referenceLink);
      }

      loaded_references = true;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      let info = document.getElementById("links-info");
      info.style.display = "none";
    });
}

function addReference() {
  var urlInput = document.getElementById("page");
  var referenceArea = document.getElementById("referenceArea");

  var url = urlInput.value;

  var link = document.createElement("a");
  link.href = url;
  link.textContent = url;

  referenceArea.appendChild(link);
}
