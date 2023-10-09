var palabraAdivinar = "";
var letrasFalladas = [];
var letrasAcertadas = [];
var vidaJugador = 100;
var estadoJuego = false; // false es derrota, true es victroria
var entrado = false;

function playBgm() {
    var sound = document.getElementById("bgm");
    sound.play();
}

function playErrorSound() {
    var sound = document.getElementById("errorSound");
    sound.play();
}

function playHasMuertoSound() {
    var sound = document.getElementById("hasMuertoSound");
    sound.play();
}

function playHasGanadoSound() {
    var sound = document.getElementById("hasGanadoSound");
    sound.play();
}

function stopBgm() {
    var sound = document.getElementById("bgm");
    sound.pause();
    sound.currentTime = 0;
}

function playSoundPlayerAttack() {
    var playerAttack = document.getElementById("attackSound");
    var enemyDamage = document.getElementById("skeletonHurtSound");
    playerAttack.play();
    enemyDamage.play();
}

function playSoundEnemyAttack() {
    var attack = document.getElementById("attackSound");
    attack.play();
}

function repetirCancion() {
    var audio = document.getElementById("bgm");

    audio.currentTime = 0;
    audio.play();
}

function generarPalabra() {
    var guessedWord = document.getElementById("guessedWord");
    var palabras = ["Bone", "Forest", "Bad", "Leaf", "Branch", "Easy", "Blue", "Larry"];
    var palabra = palabras[Math.floor(Math.random() * 8)].toUpperCase();
    palabraAdivinar = palabra;

    for (let i = 0; i < palabra.length; i++) {
        guessedWord.value += "-";
    }
    mostrarPistaDePalabra();
}

function formatear() {
    var letra = document.getElementById("typedLetter");
    var valor = letra.value;
    var letras = valor.split("");

    if (letras.length > 1) {
        letra.value = letras[0].toUpperCase();
    }
}

function volverAJugar() {
    setTimeout(function () {
        location.reload("./juego.html");
    }, 14000);
}

function pasarSiguienteNivel() {
    setTimeout(function () {
        window.location.replace("./nivel2.html");
    }, 10000);
}


function comprobarLetraIntroducida() {
    var letraIntroducida = document.getElementById("typedLetter").value.toUpperCase();
    var guessedWord = document.getElementById("guessedWord");
    var letraVisible = guessedWord.value.split("");
    var jugador = document.getElementById("playerSprite");
    var jugadorHP = document.getElementById("playerHP");
    var enemigo = document.getElementById("enemySprite");
    var hasMuertoPopUp = document.getElementById("hasMuerto");
    var enemigoDerrotadoPopUp = document.getElementById("hasGanado");
    var letraAcertada = false;
    var letraMetidaArrayFallos = false;
    var letraMetidaArrayAciertos = false;
    var entrarComprobacion = true;

    var letraYaEstaEnAcertadas = letrasAcertadas.includes(letraIntroducida);
    var letraYaEstaEnFalladas = letrasFalladas.includes(letraIntroducida);
    //Comprobar si la letra ya esta en `letrasFalladas[]`
    if (!letraYaEstaEnFalladas && !letraYaEstaEnAcertadas) {
        console.log("LA LETRA NO ESTA");
    } else {
        letraMetidaArrayFallos = true;
        letraMetidaArrayAciertos = true;
    }

    if (entrarComprobacion) {
        for (var i = 0; i < palabraAdivinar.length && letraMetidaArrayAciertos == false; i++) {
            if (palabraAdivinar[i] === letraIntroducida) {
                letraVisible[i] = letraIntroducida;
                letraAcertada = true;
                letrasAcertadas.push(letraIntroducida);
                playSoundPlayerAttack();
                jugador.setAttribute("src", "../img/playerAttack.gif");
                enemigo.setAttribute("src", "../img/skeletonHurt.gif");
                setTimeout(function () {
                    jugador.setAttribute("src", "../img/playerIdle.gif");
                    enemigo.setAttribute("src", "../img/skeleton.gif");
                }, 600);
            }

            guessedWord.value = "";
            guessedWord.value = letraVisible.join("");
        }

        if (letraAcertada == false && letraMetidaArrayFallos == false && vidaJugador > 0) {
            playErrorSound();
            entrarComprobacion = false;
            vidaJugador -= 20;
            letrasFalladas.push(letraIntroducida);
            mostrarLetraFallada();
            letraMetidaArrayFallos = true;
            enemigo.setAttribute("src", "../img/skeletonAttack.gif");
            setTimeout(function () {
                playSoundEnemyAttack();
                jugadorHP.setAttribute("src", "../img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerHurt.gif");
            }, 300);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "../img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerIdle.gif");
                enemigo.setAttribute("src", "../img/skeleton.gif");
            }, 800);
        }

        if (vidaJugador < 0)
            vidaJugador = 0;

        //El jugador ha perdido = muerte
        if (vidaJugador == 0) {
            enemigo.setAttribute("src", "../img/skeletonAttack.gif");
            setTimeout(function () {
                playSoundEnemyAttack();
                stopBgm();
                jugadorHP.setAttribute("src", "../img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerDeath.gif");
                playHasMuertoSound();
            }, 1000);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "../img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerIsDead.png");
                enemigo.setAttribute("src", "../img/skeleton.gif");
                hasMuertoPopUp.style.display = "flex";
            }, 1500);
            estadoJuego = false;
        }

        //El jugador ha ganado = palabra adivinada
        if (guessedWord.value === palabraAdivinar) {
            playSoundPlayerAttack();
            jugador.setAttribute("src", "../img/playerAttack.gif");
            enemigo.setAttribute("src", "../img/skeletonDeath.gif");
            setTimeout(function () {
                playHasGanadoSound();
                stopBgm();
                jugador.setAttribute("src", "../img/playerIdle.gif");
                enemigo.setAttribute("src", "../img/skeletonDead.png");
                enemigoDerrotadoPopUp.style.display = "flex";
            }, 1000);
            estadoJuego = true;
        }
    }

    if (guessedWord.value === palabraAdivinar || vidaJugador == 0)
        juego();
}

function juego() {
    if (estadoJuego) {
        console.log("HAS GANADO");
        pasarSiguienteNivel();
        entrado = true;
    } else {
        console.log("HAS PERDIDO");
        volverAJugar();
        entrado = true;
    }
}

function mostrarLetraFallada() {
    var fallosTextArea = document.getElementById("letrasErroneas");
    fallosTextArea.value = letrasFalladas;
}

function mostrarPistaDePalabra() {
    var pistaTextArea = document.getElementById("pistaPalabra");

    if (palabraAdivinar === "BONE" || palabraAdivinar === "BLUE" || palabraAdivinar === "LARRY")
        pistaTextArea.value = "This word is easy to guess! Just look at the enemy.";
    else if (palabraAdivinar === "FOREST" || palabraAdivinar === "LEAF" || palabraAdivinar === "BRANCH")
        pistaTextArea.value = "This word is easy to guess! Do you see the arena? Then that's it!";
    else if (palabraAdivinar === "EASY")
        pistaTextArea.value = "This word is easy to guess! The level and the hint says it!";
    else if (palabraAdivinar === "BAD")
        pistaTextArea.value = "This word is easy to guess! We learn from mistakes!";
}

function cerrarInstrucciones() {
    var contenedorInstr = document.getElementById("instrucciones");

    contenedorInstr.style.display = "none";
}

window.onload = function () {
    playBgm();
    generarPalabra();
    var audio = document.getElementById("bgm");
    var letra = document.getElementById("typedLetter");
    var botonOk = document.getElementById("botonOk");
    var botonEntendido = document.getElementById("entendido");

    letra.addEventListener("input", formatear, false);
    audio.addEventListener("ended", repetirCancion, false);
    botonOk.addEventListener("click", comprobarLetraIntroducida, false);
    botonEntendido.addEventListener("click", cerrarInstrucciones, false);
}