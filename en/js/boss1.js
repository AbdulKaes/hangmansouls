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
    var enemyDamage = document.getElementById("thanielHurtSound");
    playerAttack.play();
    enemyDamage.play();
}

function playSoundEnemyAttack() {
    var attack = document.getElementById("thanielAttackSound");
    attack.play();
}

function playEnemyDeathSound() {
    var attack = document.getElementById("thanielDeathSound");
    attack.play();
}

function repetirCancion() {
    var audio = document.getElementById("bgm");

    audio.currentTime = 0;
    audio.play();
}

function generarPalabra() {
    var guessedWord = document.getElementById("guessedWord");
    var palabras = ["Governor", "Flaming", "Fireproof", "Thaniel", "Reign", "Ecclesiastical", "Violinist", "Orchestra",
    "Destroyer", "Strength", "Great", "Luminous"];
    var palabra = palabras[Math.floor(Math.random() * 12)].toUpperCase();
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
        window.location.replace("../gracias.html");
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
            if (palabraAdivinar[i] === letraIntroducida && guessedWord.value !== palabraAdivinar) {
                letraVisible[i] = letraIntroducida;
                letraAcertada = true;
                letrasAcertadas.push(letraIntroducida);
                playSoundPlayerAttack();
                jugador.setAttribute("src", "../img/playerAttack.gif");
                enemigo.setAttribute("src", "../img/thanielBossHurt.gif");
                setTimeout(function () {
                    jugador.setAttribute("src", "../img/playerIdle.gif");
                    enemigo.setAttribute("src", "../img/thanielBossIdle.gif");
                }, 600);
            }

            guessedWord.value = "";
            guessedWord.value = letraVisible.join("");
        }

        if (letraAcertada == false && letraMetidaArrayFallos == false && vidaJugador > 0) {
            playErrorSound();
            entrarComprobacion = false;
            vidaJugador -= 40;
            letrasFalladas.push(letraIntroducida);
            mostrarLetraFallada();
            letraMetidaArrayFallos = true;
            enemigo.setAttribute("src", "../img/thanielBosssAttack.gif");
            playSoundEnemyAttack();
            setTimeout(function () {
                jugadorHP.setAttribute("src", "../img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerHurt.gif");
            }, 1400);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "../img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerIdle.gif");
                enemigo.setAttribute("src", "../img/thanielBossIdle.gif");
            }, 1900);
        }

        if (vidaJugador < 0)
            vidaJugador = 0;

        //EL jugador ha perdido = muerte
        if (vidaJugador == 0) {
            enemigo.setAttribute("src", "../img/thanielBosssAttack.gif");
            playSoundEnemyAttack();
            setTimeout(function () {
                stopBgm();
                jugadorHP.setAttribute("src", "../img/hpbarGhost" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerDeath.gif");
                playHasMuertoSound();
            }, 1400);
            setTimeout(function () {
                jugadorHP.setAttribute("src", "../img/hpbar" + vidaJugador + ".png");
                jugador.setAttribute("src", "../img/playerIsDead.png");
                enemigo.setAttribute("src", "../img/thanielBossIdle.gif");
                hasMuertoPopUp.style.display = "flex";
            }, 1900);
        }

        if (guessedWord.value === palabraAdivinar) {
            playSoundPlayerAttack();
            playEnemyDeathSound();
            jugador.setAttribute("src", "../img/playerAttack.gif");
            enemigo.setAttribute("src", "../img/thanielBossDeath.gif");
            setTimeout(function () {
                playHasGanadoSound();
                stopBgm();
                jugador.setAttribute("src", "../img/playerIdle.gif");
                enemigo.setAttribute("src", "../img/thanielBossDead.png");
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
    var palabras = ["Governor", "Flaming", "Fireproof", "Thaniel", "Reign", "Ecclesiastical", "Violinist", "Orchestra",
    "Destroyer", "Strength", "Great", "Luminous"];

    if (palabraAdivinar === "GOVERNOR" || palabraAdivinar === "THANIEL" || palabraAdivinar === "REIGN")
        pistaTextArea.value = "King Thaniel speaks: Nothing can defeat me, not even a brave being like you. I AM the strongest.";
    else if (palabraAdivinar === "FLAMING" || palabraAdivinar === "FIREPROOF" || palabraAdivinar === "DESTROYER" || palabraAdivinar === "STRENGTH")
        pistaTextArea.value = "King Thaniel speaks: My GREATSWORD, forged by Raime, will be the one to end you.";
    else if (palabraAdivinar === "ECCLESIASTICAL" || palabraAdivinar === "LUMINOUS")
        pistaTextArea.value = "King Thaniel speaks: This PALACE was built as a church by the first monarch, Raime. How dare you set foot in it, you strange being.";
        else if (palabraAdivinar === "VIOLINIST" || palabraAdivinar === "GREAT" || palabraAdivinar === "ORCHESTRA")
        pistaTextArea.value = "King Thaniel speaks: Do you hear that? The choir moves to the rhythm of my grandeur!";
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