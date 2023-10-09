let i = 0;
let placeholder = "";
const txt = "Digite um tema...";
const speed = 100;
let inputTheme;

document.getElementById("themeInput").addEventListener("keydown", function (event){
    if(event.key === "Enter")
    {
        getInput();
    }
})
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
    var input = document.getElementById("themeInput");

    inputTheme = input.value;
    alert("Tema inserido: " +inputTheme);
}
