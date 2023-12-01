let i = 0;
let placeholder = "";
const txt = "Digite um tema...";
const speed = 100;
let inputTheme;
let animationPaused = false;
let loggedUser = false;

document.getElementById("id-historybutton").style.display = "none";
document.getElementById("id-exportButton").style.display = "none";

document
  .getElementById("themeInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getInput();
    }
  });

function writteanimation() {
  placeholder += txt.charAt(i);
  document
    .getElementById("themeInput")
    .setAttribute("placeholder", placeholder);
  i++;
  setTimeout(writteanimation, speed);
}

writteanimation();

function getInput() {
  let input = document.getElementById("themeInput");

  inputTheme = input.value;

  if (inputTheme == "") {
    alert("Insira um tema para começarmos!");
  } else {
    link = "/mindmap/" + inputTheme;

    window.open(link, "_self");
  }
}

function getAnimationButton() {
  const animationBubble1 = document.querySelector(".bubble1");
  const animationBubble2 = document.querySelector(".bubble2");
  const animationBubble3 = document.querySelector(".bubble3");
  const animationBubble4 = document.querySelector(".bubble4");

  if (animationPaused === true) {
    animationBubble1.style.animationPlayState = "running";
    animationBubble2.style.animationPlayState = "running";
    animationBubble3.style.animationPlayState = "running";
    animationBubble4.style.animationPlayState = "running";
    animationPaused = false;
    document.getElementById("id-toggleon").style.display = "block";
    document.getElementById("id-toggleoff").style.display = "none";
  } else {
    animationBubble1.style.animationPlayState = "paused";
    animationBubble2.style.animationPlayState = "paused";
    animationBubble3.style.animationPlayState = "paused";
    animationBubble4.style.animationPlayState = "paused";
    animationPaused = true;
    document.getElementById("id-toggleon").style.display = "none";
    document.getElementById("id-toggleoff").style.display = "block";
  }
}

const historyView = document.getElementById("id-historybutton");
const downloadView = document.getElementById("id-exportButton");
const signupView = document.getElementById("id-signupButton");

function getLoginButton() {
  if (loggedUser === false) {
    historyView.style.display = "none";
    downloadView.style.display = "none";
    signupView.style.display = "none";
    loggedUser = true;
  } else {
    historyView.style.display = "inline-flex";
    downloadView.style.display = "inline-flex";
    signupView.style.display = "inline-flex";
    loggedUser = false;
  }

  window.open("/login", "_self");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "D") {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }
});
