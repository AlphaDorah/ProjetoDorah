let animationPaused = false;

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