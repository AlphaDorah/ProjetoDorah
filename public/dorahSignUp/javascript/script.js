let animationPaused = false;
let inputEmail, inputPassword, inputConfirmPassword;
let loginIsValid = false;

function getInput()
{

    
    let auxEmail =  document.getElementById("emailInput");
    let auxPassword = document.getElementById("senhaInput");
    let auxConfirmPass = document.getElementById("confirmaSenhaInput");
 
    inputEmail = auxEmail.value;
    inputPassword = auxPassword.value;
    inputConfirmPassword = auxConfirmPass.value;



    if(inputConfirmPassword != inputPassword)
    {
        alert(inputEmail + "\n" + inputPassword + "\n" + inputConfirmPassword);
    } else
    {
        alert(inputEmail + "\n" + inputPassword + "\n" + inputConfirmPassword);
    }


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
        document.getElementById("id-toggleon").style.display = "block";
        document.getElementById("id-toggleoff").style.display = "none";
        animationPaused = false;
    } else
    {
        animationBubble1.style.animationPlayState = "paused";
        animationBubble2.style.animationPlayState = "paused";
        animationBubble3.style.animationPlayState = "paused";
        animationBubble4.style.animationPlayState = "paused";
        document.getElementById("id-toggleon").style.display = "none";
        document.getElementById("id-toggleoff").style.display = "block";
        animationPaused = true;
    }
}

document.addEventListener('DOMContentLoaded', function ()
{
    const getEmailInput = document.getElementById('emailInput');
    const getPasswordInput = document.getElementById('senhaInput');
    const getLoginButton = document.getElementById('loginButton');
    const getConfirmPass = document.getElementById('confirmaSenhaInput');

    getEmailInput.addEventListener('input', toggleButton);
    getPasswordInput.addEventListener('input', toggleButton);
    getConfirmPass.addEventListener('input', toggleButton);

    function toggleButton()
    {
        if(getPasswordInput.value && getEmailInput.value && getConfirmPass.value)
        {
                getLoginButton.removeAttribute('disabled');
                loginIsValid = true;
        } else
        {
            getLoginButton.setAttribute('disabled', 'true');
            loginIsValid = false;
        }


    } 
});

document.getElementById("senhaInput").addEventListener("keydown", function (event){

    if(loginIsValid === true)
    {
        if(event.key === "Enter")
        {
            getInput();
        }
    }
});
/*
function writteanimation()
{
    if(welcomeMessageMale === true)
    {
        eraseMessage();
    }
}


writteanimation();

function eraseMessage()
{
    placeholder += txt.charAt(i);
    document.getElementById("textBV").setAttribute("text", welcomeMessageM);
    i--;
    setTimeout(eraseMessage, speed);
}

function changeMessage()
{
    if(welcomeMessageMale === true)
    {
        placeholder += txt.charAt(i);
        document.getElementById("textBV").setAttribute("text", welcomeMessageW);
        i++;
        setTimeout(eraseMessage, speed);
    } else
    {   placeholder += txt.charAt(i);
        document.getElementById("textBV").setAttribute("text", welcomeMessageW);
        i++;
        setTimeout(eraseMessage, speed);
    }
}
*/