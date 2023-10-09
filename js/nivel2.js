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
    var enemyDamage = document.getElementById("purpleShadowHurtSound");
    playerAttack.play();
    enemyDamage.play();
}

function playSoundEnemyAttack() {
    var attack = document.getElementById("attackSound");
    attack.play();
}

function playSoundEnemyDeath() {
    var attack = document.getElementById("purpleShadowDeathSound");
    attack.play();
}

function repetirCancion() {
    var audio = document.getElementById("bgm");

    audio.currentTime = 0;
    audio.play();
}

function generarPalabra() {
    var guessedWord = document.getElementById("guessedWord");
    var palabras = ["Sombra", "Morado", "Electrico", "Demonio", "Lluvia", "Rapido", "Sharple", "Podrido"];
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
        window.location.replace("./juego.html");
    }, 14000);
}

function pasarSiguienteNivel() {
    setTimeout(function () {
        window.location.replace("./nivel3.html");
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
                jugador.setAttribute("src", "./img/playerAttack.gif");
                enemigo.setAttribute("src", "./img/prurpleShadowHurt.gif");
                setTimeout(function () {
                    jugador.setAttribute("src", "./img/playerIdle.gif");
                    enemigo.setAttribute("src", "./img/purpleShadowIdle.gif");
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
            enemigo.setAttribute("src", "./img/purpleShadowAttack.gif");
            setTimeout(function () {
                playSoundEnemyAttack();
                jugadorHP.setAttribute("src", "./img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "./img/playerHurt.gif");
            }, 300);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "./img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "./img/playerIdle.gif");
                enemigo.setAttribute("src", "./img/purpleShadowIdle.gif");
            }, 800);
        }

        if (vidaJugador < 0)
            vidaJugador = 0;

        //EL jugador ha perdido = muerte
        if (vidaJugador == 0) {
            enemigo.setAttribute("src", "./img/purpleShadowAttack.gif");
            setTimeout(function () {
                playSoundEnemyAttack();
                stopBgm();
                jugadorHP.setAttribute("src", "./img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "./img/playerDeath.gif");
                playHasMuertoSound();
            }, 1000);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "./img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "./img/playerIsDead.png");
                enemigo.setAttribute("src", "./img/purpleShadowIdle.gif");
                hasMuertoPopUp.style.display = "flex";
            }, 1500);
            estadoJuego = false;
        }

        if (guessedWord.value === palabraAdivinar) {
            playSoundPlayerAttack();
            playSoundEnemyDeath();
            jugador.setAttribute("src", "./img/playerAttack.gif");
            enemigo.setAttribute("src", "./img/purpleShadowDeath.gif");
            setTimeout(function () {
                playHasGanadoSound();
                stopBgm();
                jugador.setAttribute("src", "./img/playerIdle.gif");
                enemigo.setAttribute("src", "./img/nothing.png");
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

    if (palabraAdivinar === "SOMBRA" || palabraAdivinar === "MORADO" || palabraAdivinar === "SHARPLE" || palabraAdivinar === "DEMONIO")
        pistaTextArea.value = "Para adivinar la palabra, analiza la contra.";
    else if (palabraAdivinar === "LLUVIA" || palabraAdivinar === "PODRIDO")
        pistaTextArea.value = "La palabra tiene que ver con el entorno.";
    else if (palabraAdivinar === "RAPIDO" || palabraAdivinar === "ELECTRICO")
        pistaTextArea.value = "Fijate en el enemigo, como es este?";
}

window.onload = function () {
    playBgm();
    generarPalabra();
    var audio = document.getElementById("bgm");
    var letra = document.getElementById("typedLetter");
    var botonOk = document.getElementById("botonOk");

    letra.addEventListener("input", formatear, false);
    audio.addEventListener("ended", repetirCancion, false);
    botonOk.addEventListener("click", comprobarLetraIntroducida, false);
}