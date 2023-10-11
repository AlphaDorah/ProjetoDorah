let i = 0;
let count = 0;
let placeholder = "";
const txt = "Digite um tema...";
const theme1 = "Independência do Brasil";
const theme2 = "Segunda Guerra Mundial";
const theme3 = "Produtos notáveis"
const theme4 = "Império Romano"
const speed = 100;


function escrita() {
        placeholder += txt.charAt(i);
        document.getElementById("theme").setAttribute("placeholder", placeholder);
        i++;
        setTimeout(escrita, speed);
    }

escrita();