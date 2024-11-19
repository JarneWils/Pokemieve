// Canvas setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;




// AUDIO

const themeSong = document.getElementById("theme-song");
document.addEventListener('keydown', e =>{
    if('keydown') {
        themeSong.play();
    }
})

const walking = document.getElementById("walking");
walking.loop = true;
document.addEventListener('keydown', e => {
        walking.play();
})
document.addEventListener('keyup', e => {
    walking.pause();
})




// Map blokkade data importeren

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) { // Omdat de map 70 tiles lang is. Zo kan je een rij van de map uit de data array filteren.
    collisionsMap.push(collisions.slice(i, i + 70));
}

const boundaries = [];
const offset = {
    x: -2325,
    y: -1040   
};
// i is de index voor de rijen en j is de index voor de kolommen
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
    });
});




// Inladen en positioneren

const image = new Image();
image.src = './img/Map-Final.png';

const forgroundImage = new Image();
forgroundImage.src = './img/Map-Forground.png';

const playerImage = new Image();
playerImage.src = './img/playerDown.png';


const player =  new Sprite ({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,  // 192 is de officiele pixel-breedte van de player image
        y: canvas.height / 2 - 68 / 2   // 68 is de officiele pixel-hoogte van de player image
    },
    image: playerImage,
    frames: {
        max: 4
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y 
    },
    image: image
});

const forground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y 
    },
    image: forgroundImage
});



// Bediening

const keys = {
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};

const movables = [background, ...boundaries, forground]; // hier zet je alle constante die moeten meebewegen met de MAP

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
        rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height > rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    player.draw();
    forground.draw();

    // Movement values
    let moving = true

    //up
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++ ){
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 4
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movable) => {
            movable.position.y +=4
        })}

    //down
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        for (let i = 0; i < boundaries.length; i++ ){
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 4
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -=4
        })}
            
    //left
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        for (let i = 0; i < boundaries.length; i++ ){
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x +4,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x +=4
        })}
  
    //right
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        for (let i = 0; i < boundaries.length; i++ ){
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x -4,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -=4
        })} 
};

animate();


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp';
            break;

        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown';
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft';
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;

        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
});


const battleButton = document.getElementsByClassName("battle")[0];
document.addEventListener('click', e => {
    if(battleButton){
        window.location.href = "../minigame/index.html";
    }
}); 