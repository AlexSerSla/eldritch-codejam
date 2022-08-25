
//import difficulties from '../data/difficulties.js';
import ancientsData from '../data/ancients.js'
import blueCards from '../data/mythicCards/blue/index.js';
import orangeCards from '../data/mythicCards/brown/index.js';
import greenCards from '../data/mythicCards/green/index.js';

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

function takeCard (currentOfGameInf) {
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

  

  return retObj;
}

let currentBoss;
let objCurrentGame = {};

currentBoss = changeBoss(0, ancientsData)
console.log(currentBoss);
objCurrentGame = changeDifficulty(1, currentBoss, greenCards, orangeCards, blueCards);
console.log(objCurrentGame);