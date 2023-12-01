async function generateFlashcards() {
  const generateButton = document.getElementById("generate-flashcards");
  generateButton.classList.add("disabled");
  generateButton.innerHTML = "Gerando Flashcards...";
  generateButton.disabled = true;

  try {
    const summary = await summarizeText(theme);
    const response = await fetch("/api/generate/flashcard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary),
    });
    const flashcard = await response.json();
    localStorage.setItem("ProjetoDorahFlashcards", JSON.stringify(flashcard));

    generateButton.classList.remove("disabled");
    generateButton.innerHTML = "Gerar Flashcards";
    generateButton.disabled = false;

    document.getElementById("open-flashcards").classList.remove("disabled");
    document.getElementById("open-flashcards").disabled = false;
  } catch (error) {
    console.log(error);

    generateButton.classList.remove("disabled");
    generateButton.innerHTML = "Gerar Flashcards";
    generateButton.disabled = false;

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
