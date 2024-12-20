// PRESS START
const startButton = document.getElementsByClassName("start")[0]; // de nul selecteert het eerste element met die class... anders kan je niet removen
const startButtonBackground = document.getElementsByClassName("press-start")[0];
const song = document.getElementById("song");
song.play();
song.loop = true;




//bullets
const bullet1 = document.getElementById("bullet1");
const bullet2 = document.getElementById("bullet2");
const gunshot = document.getElementById("gun");

//start
if (startButton) {
startButton.addEventListener('click', e =>{
        song.play();
        startButtonBackground.remove();
        setTimeout(() => {
        let bullet2Animation = bullet2.animate([
            {
              transform: "translateX(550px)",
               opacity: 1,
            },
            {
                transform: "translateX(-340px)",
                opacity: 1,
            },
        ],  {
            duration: 1500,
            fill: "forwards",
            iterations: Infinity
        });
        // Zorgt dat het geluid opnieuw speelt bij elke iteration
    }, 3000);
})};


document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        gunshot.play();
    }});





// SHOOT

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        const newBullet = document.createElement("div"); // Creëer nieuwe bullet
        newBullet.className = "bullet1"; // Geef de bullet een class
        newBullet.style.marginTop = '200px';

        // Bullet IMAGE
        const bulletImage = document.createElement("img");
        bulletImage.src = "../img/bullet-blue.png"; // Controleer of het pad correct is
        bulletImage.style.width = '26px';
        bulletImage.style.height = '20px'; // Correcte height gebruiken

        // Voeg de afbeelding toe aan de bullet
        newBullet.appendChild(bulletImage);

        // Voeg de bullet toe aan de DOM
        const container = document.getElementById("bullet-container"); // Zorg dat dit element bestaat
        container.appendChild(newBullet);

        console.log("gemaakt", newBullet);

        // Bullet1 Animation
        let bullet1Animation = newBullet.animate([
            {
              transform: "translateX(-280px)",
               opacity: 1,
            },
            {
                transform: "translateX(560px)",
                opacity: 1,
            },
            {
                transform: "translateX(580px)",
                opacity: 0,
            },
        ],  {
            duration: 2000,
            playState: 'paused',
        });
        // Bullet moet na 1 seconde niet meer bestaan
        setTimeout(() => {
            newBullet.remove();
            console.log("verwijderd", newBullet);
        }, 1000);
    }
});




// JUMP

const player = document.getElementById("player-container");
const jumpSound = document.getElementById('jump-sound');

document.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp') {
        jumpSound.play();
        let playerAnimation = player.animate([
            {
                transform: "translateY(0px)", // Startpositie
                offset: 0
            },
            {
                transform: "translateY(-180px)", // Hoogste punt van de sprong
                offset: 0.2
            },
            {
                transform: "translateY(-225px)", // Hoogste punt van de sprong
                offset: 0.4
            },
            {
                transform: "translateY(-225px)", // Kleinere vertraging bij de top
                offset: 0.5
            },
            {
                transform: "translateY(-220px)", // Kleinere vertraging bij de top
                offset: 0.6
            },
            {
                transform: "translateY(0px)", // Terug naar de grond
                offset: 1
            }
        ],  {
            duration: 800,
            fill: "forwards"
        });
    }
});




//GAMEOVER

function detectCollision(player, bullet) {
    const playerRect = player.getBoundingClientRect();
    const bulletRect = bullet.getBoundingClientRect();

    // Controleer of de rechthoeken overlappen
    return (
        playerRect.x < bulletRect.x + bulletRect.width &&
        playerRect.x + playerRect.width > bulletRect.x &&
        playerRect.y < bulletRect.y + bulletRect.height &&
        playerRect.y + playerRect.height > bulletRect.y
    );
}

let dieAnimation;

function stopGame() {
    // Stop alle animaties
    const animations = document.getAnimations();
    animations.forEach(animation => {
            animation.pause();
    });
    // Pauzeer alle geluiden
    song.pause();
    gunshot.pause();

    // Geef een alert
}

// Controleer op botsing in een interval
let remainingWidth = 16; // Declare this outside the setInterval so it persists

setInterval(() => {
    const player = document.getElementById("player-container");
    const bullet2 = document.getElementById("bullet2");
    const auwSound = document.getElementById("auw");
    const gamOverSound = document.getElementById("game-over-sound");

    if (detectCollision(player, bullet2)) {
        const damagePlayer = document.getElementById("damage-line-player");
        auwSound.play();

        // Subtract 4 from the remaining width
        remainingWidth -= 2;

        if (remainingWidth <= 0) {
            const playerRaster = document.getElementsByClassName("damage-player1")[0];
            playerRaster.style.backgroundColor = "red";
            auwSound.pause(); // Stop the sound
            auwSound.currentTime = 0;

            stopGame();
            gamOverSound.play();
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 4000);
        }

        // Update the width of the damage line
        damagePlayer.style.width = remainingWidth + "vw"; // Set the width in vw
    }
}, 100);




// GEWONNE

let remainingWidthBot = 16;

setInterval(() => {
    const bot = document.getElementById("bot-container");
    const bullets = document.querySelectorAll(".bullet1"); // Selecteer alle dynamische bullets
    const hitSound = document.getElementById("hit");
    const victorySound = document.getElementById("victory");

    bullets.forEach(bullet => { // Controleer elke bullet afzonderlijk
        if (detectCollision(bot, bullet)) {
            const damageBot = document.getElementById("damage-line-bot");
            hitSound.play();

            // Verminder de resterende breedte
            remainingWidthBot -= 0.5;

            if (remainingWidthBot <= 0) {
                const botRaster = document.getElementsByClassName("damage-player2")[0];
                botRaster.style.backgroundColor = "red";
                hitSound.pause(); // Stop het geluid
                hitSound.currentTime = 0;
                stopGame();
                victorySound.play();
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 7000);
            }

            // Update de breedte van de damage-lijn
            damageBot.style.width = remainingWidthBot + "vw";

            // Verwijder de bullet na een botsing
            bullet.remove();
        }
    });
}, 100);

