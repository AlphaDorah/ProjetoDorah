function setFirstAsActive() {
  document.querySelector(".flashcard").classList.add("active");
}

function nextFlashcard() {
  let active = document.querySelector(".flashcard.active");
  let next = active.nextElementSibling;
  if (!next) {
    next = active.parentElement.firstElementChild;
  }
  active.classList.remove("active");
  next.classList.add("active");
}

function previousFlashcard() {
  let active = document.querySelector(".flashcard.active");
  let previous = active.previousElementSibling;
  if (!previous) {
    previous = active.parentElement.lastElementChild;
  }
  active.classList.remove("active");
  previous.classList.add("active");
}

function flipFlashcard() {
  document.querySelector(".flip.active").classList.toggle("flipped");
}

function addFlashcard(question, answer) {
  let flashcardContainer = document.querySelector(".flashcard-container");
  let flashcard = document.createElement("div");
  flashcard.classList.add("flashcard");
  flashcard.classList.add("flip");
  flashcard.innerHTML = `
    <div class="front">
      <h1>${question}</h1>
    </div>
    <div class="back">
      <h1>${answer}</h1>
    </div>
  `;
  flashcardContainer.appendChild(flashcard);
}

try {
  let flashcards = JSON.parse(localStorage.getItem("ProjetoDorahFlashcards"));

  for (let flashcard of flashcards) {
    addFlashcard(flashcard.question, flashcard.answer);
  }
} catch (error) {
  console.log(error);
}

setFirstAsActive();
