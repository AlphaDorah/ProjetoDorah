let i = 0;
let placeholder = "";
const txt = "Digite um tema...";
const speed = 100;
let inputTheme;
let animationPaused = false;
let loggedUser = false;

document.getElementById("themeInput").addEventListener("keydown", function (event){
    if(event.key === "Enter")
    {
        getInput();
    }
});
function writteanimation()
{
        placeholder += txt.charAt(i);
        document.getElementById("themeInput").setAttribute("placeholder", placeholder);
        i++;
        setTimeout(writteanimation, speed);
}

    writteanimation();

function getInput()
{
    let input = document.getElementById("themeInput");

    inputTheme = input.value;
    alert("Tema inserido: " +inputTheme);
}

function getAnimationButton()
{
    const animationBubble1 = document.querySelector(".bubble1");
    const animationBubble2 = document.querySelector(".bubble2");
    const animationBubble3 = document.querySelector(".bubble3");
    const animationBubble4 = document.querySelector(".bubble4");

    if(animationPaused === true)
    {
        animationBubble1.style.animationPlayState = "running";
        animationBubble2.style.animationPlayState = "running";
        animationBubble3.style.animationPlayState = "running";
        animationBubble4.style.animationPlayState = "running";
        animationPaused = false;
    } else
    {
        animationBubble1.style.animationPlayState = "paused";
        animationBubble2.style.animationPlayState = "paused";
        animationBubble3.style.animationPlayState = "paused";
        animationBubble4.style.animationPlayState = "paused";
        animationPaused = true;
    }
}

const historyView = document.getElementById("id.historyButton");
const downloadView = document.getElementById("id.downloadButton");

function getLoginButton()
{
    if(loggedUser === false)
    {
        historyView.style.display = "none";
        downloadView.style.display = "none";
        loggedUser = true;
    } else
    {
        historyView.style.display = "block";
        downloadView.style.display = "block";
        loggedUser = false;
    }
    window.location.href = "/public/dorahLogin/login.html";
}

function getHistoryButton()
{
    alert("BOTÃO DE HISTÓRICO");
}

function getDownloadButton()
{
    alert("BOTÃO DE DOWNLOAD");
}
document.addEventListener("keydown", function (event){
    if(event.key === "d" || event.key === "D")
    {
        const body = document.body;
        body.classList.toggle("dark-mode");
    }
});