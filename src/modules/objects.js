export {Mark, Player, Turn, Cell};
// mark OBJECT
const turn = new Turn;
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

// CELL OBJECT
const cellPrototype = {
  addClick(imageToShow){
    let elem = document.querySelector(`#\\3${this.id}`);
    elem.addEventListener("click", (e)=>{
      let iconToShow = e.currentTarget.querySelector(`.icon-${imageToShow}`);
      iconToShow.classList.remove("not-show-element");
      // this.removeClick();
    });
  },
  removeClick(){
    let elem = document.querySelector(`#\\3${this.id}`);
    elem.removeEventListener("click",(e)=>{});
  },
  addHover(){},
  removeHover(){},
  reset(){},
  showMark(markToShow,event){
    console.log(this);
  },
};
function Cell(id){
  this.marked = "";
  this.id = id;
}
Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell;
