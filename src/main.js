// import {Mark, Player, Turn} from './modules/objects.js';
// mark OBJECT
const markPrototype = {
  updateMark() {
    if (this.btnX.classList.contains('active-mark-button')) {
      this.p1Mark = 'x';
      this.p2Mark = 'o';
    } else {
      this.p2Mark = 'x';
      this.p1Mark = 'o';
    }
  },
  switch() {
    this.btnX.classList.toggle('active-mark-button');
    this.btnO.classList.toggle('active-mark-button');
    this.updateMark();
  },
};
function Mark() {
  this.p1Mark = 'x';
  this.p2Mark = 'o';
  this.btnX = document.querySelector('#x-choice-button');
  this.btnO = document.querySelector('#o-choice-button');
}
Mark.prototype = markPrototype;
Mark.prototype.constructor = Mark;

// Player OBJECT
const playerPrototype = {
  updateScore() {
    let scoreString = this.score.toString();
    if (this.score < 10) {
      scoreString = '0' + scoreString;
    }
    this.scoreCell.querySelector('.score').textContent = scoreString;
  },
  initializeScore() {
    if (this.mark === 'x') {
      this.scoreCell = document.querySelector('#x-score');
    } else {
      this.scoreCell = document.querySelector('#o-score');
    }
    this.scoreCell.querySelector('p span').textContent = this.name;
  },
  generateClick() {}, //For CPU user
};

function Player() {
  this.mark = '';
  this.name = '';
  this.score = 0;
  this.scoreCell = {};
}

Player.prototype = playerPrototype;
Player.prototype.constructor = Player;

// Turn OBJECT
const turnPrototype = {
  switch() {
    let thirdRecipe;
    thirdRecipe = this.currentTurn;
    this.currentTurn = this.previousTurn;
    this.previousTurn = thirdRecipe;
    this.show();
  },
  show() {
    let markPrevious = this.previousTurn.toUpperCase();
    let markCurrent = this.currentTurn.toUpperCase();
    this['icon' + markCurrent].classList.remove('not-show-element');
    this['icon' + markPrevious].classList.add('not-show-element');
  },
  reset() {
    this.currentTurn = 'x';
    this.previousTurn = '0';
    this.show();
  },
};
function Turn() {
  this.currentTurn = 'x';
  this.previousTurn = 'o';
  this.iconX = document.querySelector('.turn .icon-x');
  this.iconO = document.querySelector('.turn .icon-o');
}
Turn.prototype = turnPrototype;
Turn.prototype.constructor = Turn;

// dialog OBJECT
  function configure(kind) {
    switch (kind) {
      case type.first:
        playerWonLost.classList.remove('not-show-element');
        playerWonLost.querySelector('.player-number').textContent = "1";
        iconX.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color = iconX.querySelector('path').getAttribute("fill");
        break;
      case type.second:
        playerWonLost.classList.remove('not-show-element');
        playerWonLost.querySelector('.player-number').textContent = "1";
        iconO.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconO.querySelector('path').getAttribute("fill");
        break;
        case type.third:
        playerWonLost.classList.remove('not-show-element');
        playerWonLost.querySelector('.player-number').textContent = "2";
        iconX.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconX.querySelector('path').getAttribute("fill");
        break;
        case type.fourth:
        playerWonLost.classList.remove('not-show-element');
        playerWonLost.querySelector('.player-number').textContent = "2";
        iconO.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconO.querySelector('path').getAttribute("fill");
        break;
      case type.fifth:
        won.classList.remove('not-show-element');
        iconX.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconX.querySelector('path').getAttribute("fill");
        break;
      case type.sixth:
      console.log(won);
        won.classList.remove('not-show-element');
        console.log(won);
        iconO.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconO.querySelector('path').getAttribute("fill");
        break;
      case type.seventh:
        lost.classList.remove('not-show-element');
        iconX.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconX.querySelector('path').getAttribute("fill");
        break;
      case type.eighth:
        lost.classList.remove('not-show-element');
        iconO.classList.remove('not-show-element');
        takesRound.classList.remove('not-show-element');
        takesRound.style.color =
          iconO.querySelector('path').getAttribute("fill");
        break;
      case type.nineth:
      iconContainer.classList.add('not-show-element');
        restart.classList.remove('not-show-element');
        break;
      case type.tenth:
      iconContainer.classList.add('not-show-element');
        tied.classList.remove('not-show-element');
        break;
    }
    if (kind === type.nineth) {
      quitCancelBtn.classList.replace('quit-btn', 'quit-resize');
      roundRestartBtn.classList.replace(
        'nextround-restart-btn',
        'next-round-resize'
      );
      quitCancelBtn.querySelector('h5').textContent = 'no, cancel';
      roundRestartBtn.querySelector('h5').textContent =
        'yes, restart';
    } else {
      quitCancelBtn.classList.replace('quit-resize', 'quit-btn');
      roundRestartBtn.classList.replace(
        'next-round-resize',
        'nextround-restart-btn'
      );
      quitCancelBtn.querySelector('h5').textContent = 'quit';
      roundRestartBtn.querySelector('h5').textContent = 'next round';
    };
  }
  function resetDialog() {
    const dialogElemList = document.querySelectorAll("#dialog-box p, #dialog-box h3, #dialog-box svg");
    for (let [key, entrie] of dialogElemList.entries()) {
      console.log(entrie);
      entrie.classList.add('not-show-element');
    };
    iconContainer.classList.remove('not-show-element');
    counterType = counterType < 10 ? ++counterType:counterType
}
// dialog initializing
const dialogBox = document.querySelector("#dialog-box");
// head
    const playerWonLost = document.querySelector('#dialog-box #player-won-lost');
    const won = document.querySelector('#dialog-box #won');
    const lost = document.querySelector('#dialog-box #lost');
// main take a round
const iconContainer = document.querySelector("#msg-body .icon-container");
      const iconX = document.querySelector('#dialog-box #icon-x');
      const iconO = document.querySelector('#dialog-box #icon-o');
      const takesRound = document.querySelector('#dialog-box #takes-round');
// main Restart and Tied
    const restart = document.querySelector('#dialog-box #restart');
    const tied = document.querySelector('#dialog-box #tied');
// foot
    const quitCancelBtn = document.querySelector('#dialog-box footer #quit-cancel');
    const roundRestartBtn = document.querySelector(
      '#dialog-box footer #round-restart');

  const type = {
    first: 'player1-X',
    second: 'player1-O',
    third: 'player2-X',
    fourth: 'player2-O',
    fifth: 'won-X',
    sixth: 'won-O',
    seventh: 'lost-X',
    eighth: 'lost-O',
    nineth: 'restart',
    tenth: 'tied',
  };
// Initialize
// pages
const newGame = document.querySelector('#new-game');
const start = document.querySelector('#start');
// creating mark object
const mark = new Mark();
// creating player objects
const player1 = new Player();
const player2 = new Player();
// creating Turn OBJECT
const turn = new Turn();

//adding event to choose the player1's mark
for (let button of [mark.btnX, mark.btnO]) {
  button.addEventListener('click', () => mark.switch());
}

// player vs player addEventListener
const playerVsPlayerButton = document.querySelector(
  '#player1-vs-player2-button'
);
playerVsPlayerButton.addEventListener('click', function () {
  // initializing player objects
  player1.mark = mark.p1Mark;
  player1.name = 'P1';
  player2.mark = mark.p2Mark;
  player2.name = 'P2';
  player1.initializeScore();
  player2.initializeScore();
  newGame.classList.add('not-show-element');
  start.classList.remove('not-show-element');
});
quitCancelBtn.addEventListener("click",()=>dialogBox.close() );
dialogBox.addEventListener("close", resetDialog);
