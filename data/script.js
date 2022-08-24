
import difficulties from '../data/difficulties.js';
import ancientsData from '../data/ancients.js'
import blueCards from '../data/mythicCards/blue/index.js';
import orangeCards from '../data/mythicCards/brown/index.js';
import greenCards from '../data/mythicCards/green/index.js';

console.log(blueCards[0].cardFace);
console.log(orangeCards[10].cardFace);
console.log(greenCards[4].cardFace);
console.log(difficulties[0].id);
console.log(ancientsData[0].firstStage);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }