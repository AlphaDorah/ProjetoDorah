let i = 0;
let placeholder = "";
const txt = "Digite um tema...";
const theme1 = "Revolução Russa";
const speed = 100;

function escrita(){
    placeholder += txt.charAt(i);
    document.getElementById("email").setAttribute("placeholder", placeholder);
    i++;
    setTimeout(escrita, speed);
}

escrita();