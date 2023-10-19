let animationPaused = false;
let inputEmail, inputPassword;

function getInput()
{
   let auxEmail =  document.getElementById("emailInput");
   let auxPassword = document.getElementById("senhaInput");

    inputEmail = auxEmail.value;
    inputPassword = auxPassword.value;

    alert(inputEmail + "\n" + inputPassword);

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

function isValidEmail(emailInput)
{
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(emailInput);
}

document.addEventListener('DOMContentLoaded', function ()
{
    const getEmailInput = document.getElementById('emailInput');
    const getPasswordInput = document.getElementById('senhaInput');
    const getLoginButton = document.getElementById('loginButton');
    let email = document.getElementById('loginButton');

    getEmailInput.addEventListener('input', toggleButton);
    getPasswordInput.addEventListener('input', toggleButton);

    function toggleButton()
    {
        if(getPasswordInput.value && getEmailInput.value)
        {
            getLoginButton.removeAttribute('disabled');
        } else
        {
            getLoginButton.setAttribute('disabled', 'true');
        }
    }
});

/*
document.addEventListener('DOMContentLoaded', function ()
{
    var contentH1 = document.getElementById('textDorah');
    var contentH2 = document.getElementById('textBV');

    function getLuminance(color)
    {
        var rgb = color.match(/\d+/g);
        if (!rgb) return 0;
        var r = parseInt(rgb[0]), g = parseInt(rgb[1]), b = parseInt(rgb[2]);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
   }

   function toggleColor()
   {
       var currentBackgroundColorH1 = getComputedStyle(contentH1).backgroundColor,
           luminanceH1 = getLuminance(currentBackgroundColorH1),
           currentBackgroundColorH2 = getComputedStyle(contentH2).backgroundColor,
           luminanceH2 = getLuminance(currentBackgroundColorH2);

       if (luminanceH1 > 0.0005) {
           contentH1.style.color = '#000';

       } else {
           contentH1.style.color = '#fff';
       }

       if (luminanceH2 > 0.0005) {
           contentH2.style.color = '#000';

       } else {
           contentH2.style.color = '#fff';
       }
   }

   setInterval(toggleColor, 100);

}); */