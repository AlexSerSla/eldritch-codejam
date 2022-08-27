
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

function delDifficultyCards (nameForDelDifficulty, stackGreenCards, stackOrangeCards, stackBlueCards) {
  let stackSortCadrs = {
    stackBlueCards: [],
    stackGreenCards: [],
    stackOrangeCards: []
  }

  for (const item of stackGreenCards) {
    if (item.difficulty !== nameForDelDifficulty) {
      stackSortCadrs.stackGreenCards.push(item);
    }
  }
  for (const item of stackOrangeCards) {
    if (item.difficulty !== nameForDelDifficulty) {
      stackSortCadrs.stackOrangeCards.push(item);
    }
  }
  for (const item of stackBlueCards) {
    if (item.difficulty !== nameForDelDifficulty) {
      stackSortCadrs.stackBlueCards.push(item);
    }
  }

  return stackSortCadrs;
}

function addDifficultyCards (nameForAddDifficulty, stackGreenCards, stackOrangeCards, stackBlueCards, numOfBlueCard, numOfOrandeCard, numOfGreenCard) {
  let stackSortCadrs = {
    stackBlueCards: [],
    stackGreenCards: [],
    stackOrangeCards: []
  }

  let stackNormalCards = {
    stackBlueCards: [],
    stackGreenCards: [],
    stackOrangeCards: []
  }

  for (const item of stackGreenCards) {
    if (item.difficulty === 'normal') {
      stackNormalCards.stackGreenCards.push(item);
    }
  }
  for (const item of stackOrangeCards) {
    if (item.difficulty === 'normal') {
      stackNormalCards.stackOrangeCards.push(item);
    }
  }
  for (const item of stackBlueCards) {
    if (item.difficulty === 'normal') {
      stackNormalCards.stackBlueCards.push(item);
    }
  }

  for (const item of stackGreenCards) {
    if (item.difficulty === nameForAddDifficulty) {
      stackSortCadrs.stackGreenCards.push(item);
    }
  }
  for (const item of stackOrangeCards) {
    if (item.difficulty === nameForAddDifficulty) {
      stackSortCadrs.stackOrangeCards.push(item);
    }
  }
  for (const item of stackBlueCards) {
    if (item.difficulty === nameForAddDifficulty) {
      stackSortCadrs.stackBlueCards.push(item);
    }
  }

  console.log(stackSortCadrs.stackBlueCards.length);
  console.log(numOfBlueCard);
  console.log(stackSortCadrs.stackGreenCards.length);
  console.log(numOfGreenCard);
  console.log(stackSortCadrs.stackOrangeCards.length);
  console.log(numOfOrandeCard);

  if (stackSortCadrs.stackBlueCards.length < numOfBlueCard) {
    const requiredOfBlueCards = getStackRandomCards(stackNormalCards.stackBlueCards, (numOfBlueCard - stackSortCadrs.stackBlueCards.length));

    for (let i = 0; i < requiredOfBlueCards.length; i++) {
      stackSortCadrs.stackBlueCards.push(requiredOfBlueCards[i]);     
    }
  }
  if (stackSortCadrs.stackGreenCards.length < numOfGreenCard) {
    const requiredOfGreenCards = getStackRandomCards(stackNormalCards.stackGreenCards, (numOfGreenCard - stackSortCadrs.stackGreenCards.length));

    for (let i = 0; i < requiredOfGreenCards.length; i++) {
      stackSortCadrs.stackGreenCards.push(requiredOfGreenCards[i]);     
    }
  }
  if (stackSortCadrs.stackOrangeCards.length < numOfOrandeCard) {
    const requiredOfOrangeCards = getStackRandomCards(stackNormalCards.stackOrangeCards, (numOfOrandeCard - stackSortCadrs.stackOrangeCards.length));

    for (let i = 0; i < requiredOfOrangeCards.length; i++) {
      stackSortCadrs.stackOrangeCards.push(requiredOfOrangeCards[i]);     
    }
  }

  console.log(stackSortCadrs);

  return stackSortCadrs;
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
    colorHeaderFirstStage: 'white',
    colorHeaderSecondStage: 'white',
    colorHeaderThirdStage: 'white',
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

  let finallyStasksCards = {};

  retObj.numOfBlueCard.firstStage = curBoss.firstStage.blueCards;
  retObj.numOfBlueCard.secondStage = curBoss.secondStage.blueCards;
  retObj.numOfBlueCard.thirdStage = curBoss.thirdStage.blueCards;

  retObj.numOfGreenCard.firstStage = curBoss.firstStage.greenCards;
  retObj.numOfGreenCard.secondStage = curBoss.secondStage.greenCards;
  retObj.numOfGreenCard.thirdStage = curBoss.thirdStage.greenCards;

  retObj.numOfOrangeCard.firstStage = curBoss.firstStage.brownCards;
  retObj.numOfOrangeCard.secondStage = curBoss.secondStage.brownCards;
  retObj.numOfOrangeCard.thirdStage = curBoss.thirdStage.brownCards;

  //numOfDifficulty: 0 - очень легкий, 1 - легкий, 2 - средний, 3 - высокий, 4 - очень высокий
  
  if (numOfDifficulty === 1) {
    finallyStasksCards = delDifficultyCards('hard', stackGreenCards, stackOrangeCards, stackBlueCards);

    retObj.blueStack = getStackRandomCards(finallyStasksCards.stackBlueCards, numOfBlueCard);
    retObj.greenStack = getStackRandomCards(finallyStasksCards.stackGreenCards, numOfGreenCard);
    retObj.orandeStack = getStackRandomCards(finallyStasksCards.stackOrangeCards, numOfOrandeCard);
  } else if (numOfDifficulty === 3) {
    finallyStasksCards = delDifficultyCards('easy', stackGreenCards, stackOrangeCards, stackBlueCards);

    retObj.blueStack = getStackRandomCards(finallyStasksCards.stackBlueCards, numOfBlueCard);
    retObj.greenStack = getStackRandomCards(finallyStasksCards.stackGreenCards, numOfGreenCard);
    retObj.orandeStack = getStackRandomCards(finallyStasksCards.stackOrangeCards, numOfOrandeCard);
  } else if (numOfDifficulty === 0) {
    finallyStasksCards = addDifficultyCards('easy', stackGreenCards, stackOrangeCards, stackBlueCards, numOfBlueCard, numOfOrandeCard, numOfGreenCard);

    retObj.blueStack = getStackRandomCards(finallyStasksCards.stackBlueCards, numOfBlueCard);
    retObj.greenStack = getStackRandomCards(finallyStasksCards.stackGreenCards, numOfGreenCard);
    retObj.orandeStack = getStackRandomCards(finallyStasksCards.stackOrangeCards, numOfOrandeCard);
  } else if (numOfDifficulty === 4) {
    finallyStasksCards = addDifficultyCards('hard', stackGreenCards, stackOrangeCards, stackBlueCards, numOfBlueCard, numOfOrandeCard, numOfGreenCard);

    retObj.blueStack = getStackRandomCards(finallyStasksCards.stackBlueCards, numOfBlueCard);
    retObj.greenStack = getStackRandomCards(finallyStasksCards.stackGreenCards, numOfGreenCard);
    retObj.orandeStack = getStackRandomCards(finallyStasksCards.stackOrangeCards, numOfOrandeCard);
  } else {
    retObj.blueStack = getStackRandomCards(stackBlueCards, numOfBlueCard);
    retObj.greenStack = getStackRandomCards(stackGreenCards, numOfGreenCard);
    retObj.orandeStack = getStackRandomCards(stackOrangeCards, numOfOrandeCard);
  }

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
    nameStackOfCards = takeCardInStage (currentOfGameInf, nameStage);
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
    colorHeaderFirstStage: 'white',
    colorHeaderSecondStage: 'white',
    colorHeaderThirdStage: 'white',
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
    retObj.colorHeaderThirdStage = 'red';
    //alert('Это была последняя карта')
    return retObj;
  }

  if (firstStageCards === 0) {
    retObj.colorHeaderFirstStage = 'red';
  }
  if (secondStageCards === 0) {
    retObj.colorHeaderSecondStage = 'red';
  }


  //console.log(nameStage);
  //console.log(nameStackOfCards);

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

const headerFirstStage = document.querySelector('.item-header-stage-1');
const headerSecondStage = document.querySelector('.item-header-stage-2');
const headerThirdStage = document.querySelector('.item-header-stage-3');

const newGameBtn = document.querySelector('.new-game-btn');

levelsBtns.style.opacity = '0';
packCardsDiv.style.opacity = '0';
newGameBtn.style.opacity = '0';

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
  objCurrentGame = changeDifficulty(2, currentBoss, greenCards, orangeCards, blueCards);
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

easyLvl.addEventListener('click', () => {
  objCurrentGame = changeDifficulty(1, currentBoss, greenCards, orangeCards, blueCards);
  packCardsDiv.style.opacity = '1';

  veryEasyLvl.style.opacity = '0';
  normalLvl.style.opacity = '0';
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

veryEasyLvl.addEventListener('click', () => {
  objCurrentGame = changeDifficulty(0, currentBoss, greenCards, orangeCards, blueCards);
  packCardsDiv.style.opacity = '1';

  easyLvl.style.opacity = '0';
  normalLvl.style.opacity = '0';
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

hardLvl.addEventListener('click', () => {
  objCurrentGame = changeDifficulty(3, currentBoss, greenCards, orangeCards, blueCards);
  packCardsDiv.style.opacity = '1';

  veryEasyLvl.style.opacity = '0';
  normalLvl.style.opacity = '0';
  easyLvl.style.opacity = '0';
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

veryHardLvl.addEventListener('click', () => {
  objCurrentGame = changeDifficulty(4, currentBoss, greenCards, orangeCards, blueCards);
  packCardsDiv.style.opacity = '1';

  easyLvl.style.opacity = '0';
  normalLvl.style.opacity = '0';
  hardLvl.style.opacity = '0';
  veryEasyLvl.style.opacity = '0';

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
  
  firstGreenCards.textContent = `${objCurrentGame.numOfGreenCard.firstStage}`;
  secondGreenCards.textContent = `${objCurrentGame.numOfGreenCard.secondStage}`;
  thirdGreenCards.textContent = `${objCurrentGame.numOfGreenCard.thirdStage}`;

  firstOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.firstStage}`;
  secondOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.secondStage}`;
  thirdOrangeCards.textContent = `${objCurrentGame.numOfOrangeCard.thirdStage}`;

  firstBlueCards.textContent = `${objCurrentGame.numOfBlueCard.firstStage}`;
  secondBlueCards.textContent = `${objCurrentGame.numOfBlueCard.secondStage}`;
  thirdBlueCards.textContent = `${objCurrentGame.numOfBlueCard.thirdStage}`;

  headerFirstStage.style.color = objCurrentGame.colorHeaderFirstStage;
  headerSecondStage.style.color = objCurrentGame.colorHeaderSecondStage;
  headerThirdStage.style.color = objCurrentGame.colorHeaderThirdStage;

  if (objCurrentGame.colorHeaderThirdStage === 'red') {
    newGameBtn.style.opacity = '1';
  }
});

newGameBtn.addEventListener('click', () => {
  location.reload();
});
