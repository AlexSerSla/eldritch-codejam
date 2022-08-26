
//import difficulties from '../data/difficulties.js';
import ancientsData from '../data/ancients.js'
import blueCards from '../data/mythicCards/blue/index.js';
import orangeCards from '../data/mythicCards/brown/index.js';
import greenCards from '../data/mythicCards/green/index.js';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function severalRandom(min, max, num) {
      var i, arr = [], res = [];
      for (i = min; i <= max; i++ ) arr.push(i);
      for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0]);
      return res;
  }

function getStackRandomCards(stackCards, num) {
  let outputStack = [];
  let arrNumOfCards = [];

  arrNumOfCards = severalRandom(0, (stackCards.length - 1), num);
  //console.log(arrNumOfCards);

  for (const item of arrNumOfCards) {
    outputStack.push(stackCards[item]);
  }
  return outputStack;
}

function changeBoss (numOfBoss, bossesData) {
  return bossesData[numOfBoss];
}

function changeDifficulty (numOfDifficulty, curBoss, stackGreenCards, stackOrangeCards, stackBlueCards) {
  const numOfBlueCard = (curBoss.firstStage.blueCards + curBoss.secondStage.blueCards + curBoss.thirdStage.blueCards);
  const numOfOrandeCard = (curBoss.firstStage.brownCards + curBoss.secondStage.brownCards + curBoss.thirdStage.brownCards);
  const numOfGreenCard = (curBoss.firstStage.greenCards + curBoss.secondStage.greenCards + curBoss.thirdStage.greenCards);
  
  let retObj = {
    blueStack: [],
    orandeStack: [],
    greenStack: [],
    adrImgOfCard: '',
    numOfBlueCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    },
    numOfGreenCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    },
    numOfOrangeCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    }
  };

  retObj.blueStack = getStackRandomCards(stackBlueCards, numOfBlueCard);
  retObj.greenStack = getStackRandomCards(stackGreenCards, numOfGreenCard);
  retObj.orandeStack = getStackRandomCards(stackOrangeCards, numOfOrandeCard);

  retObj.numOfBlueCard.firstStage = curBoss.firstStage.blueCards;
  retObj.numOfBlueCard.secondStage = curBoss.secondStage.blueCards;
  retObj.numOfBlueCard.thirdStage = curBoss.thirdStage.blueCards;

  retObj.numOfGreenCard.firstStage = curBoss.firstStage.greenCards;
  retObj.numOfGreenCard.secondStage = curBoss.secondStage.greenCards;
  retObj.numOfGreenCard.thirdStage = curBoss.thirdStage.greenCards;

  retObj.numOfOrangeCard.firstStage = curBoss.firstStage.brownCards;
  retObj.numOfOrangeCard.secondStage = curBoss.secondStage.brownCards;
  retObj.numOfOrangeCard.thirdStage = curBoss.thirdStage.brownCards;

  return retObj;
}

function takeCardInStage (currentOfGameInf, nameStage) {
  let numOfColor = 0; //0 - зеленый, 1 - оранжевый, 2 - синий
  let nameStackOfCards = '';

  numOfColor = getRandomIntInclusive(0,2);

  if (numOfColor === 0) {
    nameStackOfCards = 'numOfGreenCard';
  } else if (numOfColor === 1) {
    nameStackOfCards = 'numOfOrangeCard';
  } else {
    nameStackOfCards = 'numOfBlueCard';
  };

  if (currentOfGameInf[nameStackOfCards][nameStage] === 0) {
    takeCardInStage (currentOfGameInf, nameStage);
    return nameStackOfCards;
  } else {
    return nameStackOfCards;
  }
}

function takeCardAndStat (currentOfGameInf) {
  let retObj = {
    blueStack: [],
    orandeStack: [],
    greenStack: [],
    adrImgOfCard: '',
    numOfBlueCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    },
    numOfGreenCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    },
    numOfOrangeCard: {
      firstStage: 0,
      secondStage: 0,
      thirdStage: 0
    }
  };

  let nameStackOfCards = '';
  let nameStage = '';
  let curCard = [];

  retObj = currentOfGameInf;
  
  const firstStageCards = retObj.numOfBlueCard.firstStage + retObj.numOfGreenCard.firstStage + retObj.numOfOrangeCard.firstStage;
  const secondStageCards = retObj.numOfBlueCard.secondStage + retObj.numOfGreenCard.secondStage + retObj.numOfOrangeCard.secondStage;
  const thirdStageCards = retObj.numOfBlueCard.thirdStage + retObj.numOfGreenCard.thirdStage + retObj.numOfOrangeCard.thirdStage;

  if (firstStageCards > 0) {
    nameStage = 'firstStage';
    nameStackOfCards = takeCardInStage (retObj, nameStage);
  } else if (secondStageCards > 0) {
    nameStage = 'secondStage';
    nameStackOfCards = takeCardInStage (retObj, nameStage);
  } else if (thirdStageCards > 0) {
    nameStage = 'thirdStage';
    nameStackOfCards = takeCardInStage (retObj, nameStage);
  } else {
    alert('Это была последняя карта')
    return retObj;
  }

  console.log(nameStage);
  console.log(nameStackOfCards);

  retObj[nameStackOfCards][nameStage] = retObj[nameStackOfCards][nameStage] - 1;
  
  if (nameStackOfCards === 'numOfGreenCard') {
    curCard = retObj.greenStack.pop();
  } else if (nameStackOfCards === 'numOfOrangeCard') {
    curCard = retObj.orandeStack.pop();
  } else {
    curCard = retObj.blueStack.pop();
  }

  retObj.adrImgOfCard = curCard.cardFace;

  return retObj;
}

let currentBoss;
let objCurrentGame = {};

const azathothBoss = document.querySelector('.azathoth-card');
const cthulthuBoss = document.querySelector('.cthulthu-card');
const iogSothothBoss = document.querySelector('.iogSothoth-card');
const shubNiggurathBoss = document.querySelector('.shubNiggurath-card');

const levelsBtns = document.querySelector('.levels');
const packCardsDiv = document.querySelector('.pack-card');

const veryEasyLvl = document.querySelector('.very-easy-lvl-btn');
const easyLvl = document.querySelector('.easy-lvl-btn');
const normalLvl = document.querySelector('.normal-lvl-btn');
const hardLvl = document.querySelector('.hard-lvl-btn');
const veryHardLvl = document.querySelector('.very-hard-lvl-btn');

const firstGreenCards = document.querySelector('.first-green');
const firstOrangeCards = document.querySelector('.first-orange');
const firstBlueCards = document.querySelector('.first-blue');
const secondGreenCards = document.querySelector('.second-green');
const secondOrangeCards = document.querySelector('.second-orange');
const secondBlueCards = document.querySelector('.second-blue');
const thirdGreenCards = document.querySelector('.third-green');
const thirdOrangeCards = document.querySelector('.third-orange');
const thirdBlueCards = document.querySelector('.third-blue');

const closeCardBtn = document.querySelector('.close-card-btn');
const openCard = document.querySelector('.open-card');

levelsBtns.style.opacity = '0';
packCardsDiv.style.opacity = '0';

azathothBoss.addEventListener('click', () => {
  currentBoss = changeBoss(0, ancientsData);
  levelsBtns.style.opacity = '1';

  cthulthuBoss.style.opacity = '0';
  iogSothothBoss.style.opacity = '0';
  shubNiggurathBoss.style.opacity = '0';
});
cthulthuBoss.addEventListener('click', () => {
  currentBoss = changeBoss(1, ancientsData);
  levelsBtns.style.opacity = '1';

  azathothBoss.style.opacity = '0';
  iogSothothBoss.style.opacity = '0';
  shubNiggurathBoss.style.opacity = '0';
});
iogSothothBoss.addEventListener('click', () => {
  currentBoss = changeBoss(2, ancientsData);
  levelsBtns.style.opacity = '1';
  
  azathothBoss.style.opacity = '0';
  cthulthuBoss.style.opacity = '0';
  shubNiggurathBoss.style.opacity = '0';
});
shubNiggurathBoss.addEventListener('click', () => {
  currentBoss = changeBoss(3, ancientsData);
  levelsBtns.style.opacity = '1';
  
  azathothBoss.style.opacity = '0';
  cthulthuBoss.style.opacity = '0';
  iogSothothBoss.style.opacity = '0';
});

normalLvl.addEventListener('click', () => {
  objCurrentGame = changeDifficulty(1, currentBoss, greenCards, orangeCards, blueCards);
  packCardsDiv.style.opacity = '1';

  veryEasyLvl.style.opacity = '0';
  easyLvl.style.opacity = '0';
  hardLvl.style.opacity = '0';
  veryHardLvl.style.opacity = '0';

  firstGreenCards.textContent = `${objCurrentGame.numOfGreenCard.firstStage}`;
  secondGreenCards.textContent = `${objCurrentGame.numOfGreenCard.secondStage}`;
  thirdGreenCards.textContent = `${objCurrentGame.numOfGreenCard.thirdStage}`;

  firstOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.firstStage}`;
  secondOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.secondStage}`;
  thirdOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.thirdStage}`;

  firstBlueCards.textContent = `${objCurrentGame.numOfBlueCard.firstStage}`;
  secondBlueCards.textContent = `${objCurrentGame.numOfBlueCard.secondStage}`;
  thirdBlueCards.textContent = `${objCurrentGame.numOfBlueCard.thirdStage}`;
});

closeCardBtn.addEventListener('click', () => {
  objCurrentGame = takeCardAndStat(objCurrentGame);
  
  openCard.style.background = `url(${objCurrentGame.adrImgOfCard})`;

  //background: url(../assets/mythicCardBackground.png);

  firstGreenCards.textContent = `${objCurrentGame.numOfGreenCard.firstStage}`;
  secondGreenCards.textContent = `${objCurrentGame.numOfGreenCard.secondStage}`;
  thirdGreenCards.textContent = `${objCurrentGame.numOfGreenCard.thirdStage}`;

  firstOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.firstStage}`;
  secondOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.secondStage}`;
  thirdOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.thirdStage}`;

  firstBlueCards.textContent = `${objCurrentGame.numOfBlueCard.firstStage}`;
  secondBlueCards.textContent = `${objCurrentGame.numOfBlueCard.secondStage}`;
  thirdBlueCards.textContent = `${objCurrentGame.numOfBlueCard.thirdStage}`;
});

/*
objCurrentGame = changeDifficulty(1, currentBoss, greenCards, orangeCards, blueCards);
console.log(objCurrentGame);

objCurrentGame = takeCardAndStat(objCurrentGame);
console.log(objCurrentGame);
*/