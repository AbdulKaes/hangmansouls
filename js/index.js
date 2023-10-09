function playSoundSelect() {
    var sound = document.getElementById("selectSound");
    sound.play();
}

/**
 * Este script se encarga de que, al hacer click en Comenzar,
    te mande a la pagina del juego. 
    Se usa el `setTimeout(funcion, tiempo)` para que no se corte el sonido
    del click, con lo que se asigna un tiempo de 500 milisegundos.
 */
function comenzarJuego() {
    setTimeout(function () {
        location.href = "../menu.html";
    }, 500);
}

window.onload = function () {
    var opcionComenzar = document.getElementById("comenzar");

    opcionComenzar.addEventListener("click", playSoundSelect, false);

    opcionComenzar.addEventListener("click", comenzarJuego, false);
}