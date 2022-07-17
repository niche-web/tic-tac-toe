export {Mark, Player, Turn};
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
const dialogBoxPrototype = {
  configure(kind) {
    switch (kind) {
      case this.type.first:
        this.head.playerWonLost.classList.remove('not-show-element');
        this.head.playerWonLost.querySelector('.player-number').textContent = 1;
        this.main.takeARound.iconX.classList.remove('not-show-element');
        this.main.takeARound.takesRound.classList.remove('not-show-element');
        this.main.takeARound.takesRound.style.color = this.main.takeARound.iconX
          .querySelector('path')
          .getAttribute('fill');
        break;
      case this.type.second:
        this.head.playerWonLost.classList.remove('not-show-element');
        this.head.playerWonLost.querySelector('.player-number').textContent = 1;
        this.main.takeARound.iconO.classList.remove('not-show-element');
        this.main.takeARound.takesRound.classList.remove('not-show-element');
        this.main.takeARound.takesRound.style.color =
          this.main.takeARound.iconO.querySelector('path').style.fill;
        break;
      case this.type.third:
        this.head.playerwonLost.classList.remove('not-show-element');
        this.head.playerWonLost.querySelector('.player-number').textContent = 2;
        this.main.takeARound.iconX.classList.remove('not-show-element');
        this.main.takeARound.takesRound.classList.remove('not-show-element');
        this.main.takeARound.takesRound.style.color =
          this.main.takeARound.iconX.querySelector('path').style.fill;
        break;
      case this.type.fourth:
        this.head.playerWonLost.classList.remove('not-show-element');
        this.head.playerWonLost.querySelector('.player-number').textContent = 2;
        this.main.takeARound.iconO.classList.remove('not-show-element');
        this.main.takeARound.takesRound.classList.remove('not-show-element');
        this.main.takeARound.takesRound.style.color =
          this.main.takeARound.iconO.querySelector('path').style.fill;
        break;
      case this.type.fifth:
        this.head.won.remove('not-show-element');
        this.main.takeARound.iconX.classList.remove('not-show-element');
        this.main.takesRound.classList.remove('not-show-element');
        break;
      case this.type.sixth:
        this.head.won.remove('not-show-element');
        this.main.takeARound.iconO.classList.remove('not-show-element');
        this.main.takesRound.classList.remove('not-show-element');
        break;
      case this.type.seventh:
        this.head.lost.remove('not-show-element');
        this.main.takeARound.iconX.classList.remove('not-show-element');
        this.main.takesRound.classList.remove('not-show-element');
        break;
      case this.type.eighth:
        this.head.lost.remove('not-show-element');
        this.main.takeARound.iconO.classList.remove('not-show-element');
        this.main.takesRound.classList.remove('not-show-element');
        break;
      case this.type.nineth:
        this.main.restart.classList.remove('not-show-element');
        break;
      case this.type.thenth:
        this.main.tied.classList.remove('not-show-element');
        break;
    }
    if (kind === this.type.nineth) {
      this.foot.quitCancelBtn.classList.replace('quit-btn', 'quit-resize');
      this.foot.roundRestartBtn.classList.replace(
        'nextround-restart-btn',
        'next-round-resize'
      );
      this.foot.quitCancelBtn.querySelector('h5').textContent = 'no, cancel';
      this.foot.roundRestartBtn.querySelector('h5').textContent =
        'yes, restart';
    } else {
      this.foot.quitCancelBtn.classList.replace('quit-resize', 'quit-btn');
      this.foot.roundRestartBtn.classList.replace(
        'next-round-resize',
        'nextround-restart-btn'
      );
      this.foot.quitCancelBtn.querySelector('h5').textContent = 'quit';
      this.foot.roundRestartBtn.querySelector('h5').textContent = 'next round';
    }
  },
  reset() {
    for (let [key, value] of Object.entries(this.head)) {
      value.classList.add('not-show-element');
    for (let [key, value] of Object.entries(this.main.takeARound)) {
      value.classList.add('not-show-element');
    for (let [key, value] of Object.entries(this.main)) {
      console.log(value);
      // value.classList.add('not-show-element');
    }
};
