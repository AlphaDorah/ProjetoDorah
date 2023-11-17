function openDownloadMenu(){
    let menu = document.getElementById("downloadMenu");
    if (!menu.classList.contains('open')) {
        menu.classList.add('open');
    }
}

function closeDownloadMenu(){
    let menu = document.getElementById("downloadMenu");
    menu.classList.remove('open');
}

function openExtraArea(){
    let menu = document.getElementById("extraArea");
    let button = document.getElementById("controlExtraArea");
    if (!menu.classList.contains('open')) {
        menu.classList.add('open');
        button.classList.add('buttonCloseExtraArea');
    }
}

function closeExtraArea(){
    let menu = document.getElementById("extraArea");
    let button = document.getElementById("controlExtraArea");
    menu.classList.remove('open');
    button.classList.remove('buttonCloseExtraArea');
}

function sugestionButton(){
    let buttonOff = document.getElementById("id-toggleoff");
    let buttonOn = document.getElementById("id-toggleon");

    if (buttonOn.style.display == "none") {
        buttonOn.style.display = "block";
        buttonOff.style.display = "none";
    }
    else {
        buttonOn.style.display = "none";
        buttonOff.style.display = "block";
    }
}