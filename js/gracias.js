function playSoundHover() {
    var sound = document.getElementById("hoverSound");
    sound.play();
}

function playSoundSelect() {
    var sound = document.getElementById("selectSound");
    sound.play();
}

function playMenuTheme() {
    var sound = document.getElementById("graciasTheme");
    sound.play();
}

function volverInicio() {
    location.href = "./index.html";
}

window.onload = function () {
    playMenuTheme();
    var againButton = document.getElementById("again");
    const audio = document.getElementById("graciasTheme");

    audio.addEventListener("ended", function () {
        audio.currentTime = 0;
        audio.play();
    })

    againButton.addEventListener("click", volverInicio, false);
}