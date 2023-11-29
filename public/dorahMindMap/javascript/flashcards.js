function generateFlashcards() {
  document.getElementById("generate-flashcards").classList.add("disabled");
  document.getElementById("generate-flashcards").innerHTML =
    "Gerando Flashcards...";
  document.getElementById("generate-flashcards").disabled = true;
  console.log("Gerando flashcards...");

  try {
    summarizeText(theme).then((summary) => {
      console.log("Sumário gerado! " + summary);

      fetch("/api/generate/flashcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      }).then(async function (response) {
        let flashcard = await response.json();
        localStorage.setItem(
          "ProjetoDorahFlashcards",
          JSON.stringify(flashcard)
        );

        console.log("Flashcards gerados!");
        document
          .getElementById("generate-flashcards")
          .classList.remove("disabled");
        document.getElementById("generate-flashcards").innerHTML =
          "Gerar Flashcards";
        document.getElementById("generate-flashcards").disabled = false;
        document.getElementById("open-flashcards").classList.remove("disabled");
        document.getElementById("open-flashcards").disabled = false;
      });
    });
  } catch (error) {
    console.log(error);
    document.getElementById("generate-flashcards").classList.remove("disabled");
    document.getElementById("generate-flashcards").innerHTML =
      "Gerar Flashcards";
    document.getElementById("generate-flashcards").disabled = false;

    alert("Erro ao gerar flashcards!");
  }
}

function openFlashcards() {
  window.open("/flashcards", "_blank");
}

/**
 * Summarize text
 * @param {string} term
 * @returns {Promise<string>}
 */
async function summarizeText(term) {
  let response = await fetch("/api/generate/flashcard/summary?term=" + term, {
    method: "GET",
  });

  let summary = await response.json();

  console.log("Texto sumarizado!");
  console.log(summary);

  return summary;
}
