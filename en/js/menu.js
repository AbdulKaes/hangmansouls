function playSoundHover() {
    var sound = document.getElementById("hoverSound");
    sound.play();
}

function playSoundSelect() {
    var sound = document.getElementById("selectSound");
    sound.play();
}

function playMenuTheme() {
    var sound = document.getElementById("menuTheme");
    sound.play();
}

function comenzarJuego() {
    setTimeout(function () {
        location.href = "./juego.html";
    }, 600);
}

function mostrarInformacion() {
    var contenedorInf = document.getElementById("informacionCont");
    setTimeout(function () {
        contenedorInf.style.display = "flex";
    }, 600);
}

function mostrarOpciones() {
    var contenedorOpt = document.getElementById("opcionesCont");
    setTimeout(function () {
        contenedorOpt.style.display = "flex";
    }, 600);
}

function volverInicio() {
    setTimeout(function () {
        location.href = "./index.html";
    }, 600);
}

function irIdiomaEspanol() {
    location.href = "../index.html";
}

function cerrarInstrucciones() {
    var contenedorInstr = document.getElementById("informacionCont");

    contenedorInstr.style.display = "none";
}

function cerrarOpciones() {
    var contenedorInstr = document.getElementById("opcionesCont");

    contenedorInstr.style.display = "none";
}

window.onload = function () {
    playMenuTheme();
    var menuComenzarOption = document.getElementById("comenzar");
    var menuInformacionOption = document.getElementById("informacion");
    var menuOpcionesOption = document.getElementById("opciones");
    var menuSalirOption = document.getElementById("salir");
    var opctionsMenu = document.querySelectorAll("li");
    const audio = document.getElementById("menuTheme");
    var botonEntendido = document.getElementById("entendido");
    var botonIngles = document.getElementById("english");
    var botonEspanol = document.getElementById("spanish");

    audio.addEventListener("ended", function () {
        audio.currentTime = 0;
        audio.play();
    })

    opctionsMenu.forEach(function (option) {
        option.addEventListener("mouseover", playSoundHover, false);
    });

    opctionsMenu.forEach(function (option) {
        option.addEventListener("click", playSoundSelect, false);
    });

    menuComenzarOption.addEventListener("click", comenzarJuego, false);
    menuInformacionOption.addEventListener("click", mostrarInformacion, false);
    menuOpcionesOption.addEventListener("click", mostrarOpciones, false);
    menuSalirOption.addEventListener("click", volverInicio, false);
    botonEntendido.addEventListener("click", cerrarInstrucciones, false);
    botonIngles.addEventListener("click", cerrarOpciones, false);
    botonEspanol.addEventListener("click", irIdiomaEspanol, false);
}