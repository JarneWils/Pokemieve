const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;


const myImage = './path/to/image.jpg';

const imgElement = document.createElement('img');
imgElement.src = 'img/levels/Map-Level01.png';
c.drawImage(image, 0, 0);
