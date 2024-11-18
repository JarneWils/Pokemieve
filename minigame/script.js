// PRESS START
const startButton = document.getElementsByClassName("press-start")[0]; // de nul selecteert het eerste element met die class... anders kan je niet removen
const song = document.getElementById("song");
song.loop = true;

document.addEventListener('click', e =>{
    if (startButton) {
        song.play();
        startButton.remove();
        setTimeout(() => {
        let bullet2Animation = bullet2.animate([
            {
              transform: "translateX(850px)",
               opacity: 1,
            },
            {
                transform: "translateX(-55px)",
                opacity: 1,
            },
        ],  {
            duration: 1800,
            fill: "forwards",
            iterations: Infinity
        });
    }, 2000);
    }
});


//bullets
const bullet1 = document.getElementById("bullet1");
const bullet2 = document.getElementById("bullet2");
const gunshot = document.getElementById("gun");

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        gunshot.play();
    }});

// SHOOT
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        const newBullet = document.createElement("div"); // Creëer nieuwe bullet
        newBullet.className = "bullet1"; // Geef de bullet een class
        newBullet.style.marginTop = '25vh';

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
              transform: "translateX(-20px)",
               opacity: 1,
            },
            {
                transform: "translateX(920px)",
                opacity: 1,
            },
            {
                transform: "translateX(920px)",
                opacity: 0,
            },
        ],  {
            duration: 2000,
            fill: "forwards",
            playState: 'paused',
        });
        // Bullet moet na 1 seconde niet meer bestaan
        setTimeout(() => {
            newBullet.remove();
            console.log("verwijderd", newBullet);
        }, 1000);
    }
});



// Player

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


//collision

