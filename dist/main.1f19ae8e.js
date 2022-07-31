// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ============================================================================
// ---------------------------------CONSTS-------------------------------------
// ============================================================================
var COMBINATIONS_MATRIX = [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]];
var POSSIBLE_PLAYS = [5, 2, 4, 6, 8, 1, 3, 7, 9]; // DOM INTIALIZING
// page new game

var newGame = document.querySelector('#new-game'); // choice buttons

var markBtnO = document.querySelector('#o-choice-button');
var markBtnX = document.querySelector('#x-choice-button'); // page start

var start = document.querySelector('#start');
var cellElements = document.querySelectorAll("#start #cells > div");
var turnIconX = document.querySelector('.turn .icon-x');
var turnIconO = document.querySelector('.turn .icon-o');
var xScore = document.getElementById("x-score");
var oScore = document.getElementById("o-score");
var tie = document.getElementById("ties"); // dialog page

var dialogBox = document.querySelector("#dialog-box"); // CSS Variables

var cssRoot = document.querySelector(":root");
var cssRootStyle = getComputedStyle(cssRoot); // BUTTONS

var playerVsPlayerButton = document.querySelector('#player1-vs-player2-button');
var cpuVsPlayerButton = document.querySelector("#cpu-vs-player-button");
var restartBtn = document.getElementById("restart-button"); // dialog initializing
// head

var playerWonLost = document.querySelector('#dialog-box #player-won-lost');
var won = document.querySelector('#dialog-box #won');
var lost = document.querySelector('#dialog-box #lost'); // main take a round

var iconContainer = document.querySelector("#msg-body #msg-icon-container");
var takesRound = document.querySelector('#dialog-box #takes-round'); // main Restart and Tied

var restart = document.querySelector('#dialog-box #restart');
var tied = document.querySelector('#dialog-box #tied'); // foot

var quitCancelBtn = document.querySelector('#dialog-box footer #quit-cancel');
var roundRestartBtn = document.querySelector('#dialog-box footer #round-restart');
var type = {
  first: 'player1-X',
  second: 'player1-O',
  third: 'player2-X',
  fourth: 'player2-O',
  fifth: 'won-X',
  sixth: 'won-O',
  seventh: 'lost-X',
  eighth: 'lost-O',
  nineth: 'restart',
  tenth: 'tied'
}; // to sessionStorage use

var markObj, turnObj, player1Obj, player2Obj, cellsGridObj, computerObj, xScoreContent, oScoreContent;
var newGameClass, xChoiceButtonClass, oChoiceButtonClass, startClass, turnIconXClass, turnIconOClass, restartBtnClass, cellsClass, tieContent;
var cellObjs = []; // =============================================================================
// -------------------------------------OBJECTS---------------------------------
// =============================================================================
// MARK OBJECT

var markPrototype = {
  updateMark: function updateMark() {
    if (markBtnX.classList.contains('active-mark-button')) {
      this.p1Mark = 'x';
      this.p2Mark = 'o';
    } else {
      this.p2Mark = 'x';
      this.p1Mark = 'o';
    }
  },
  switch: function _switch() {
    markBtnX.classList.toggle('active-mark-button');
    markBtnO.classList.toggle('active-mark-button');
    this.updateMark();
  },

  get getProperties() {
    var obj = {
      p1Mark: this.p1Mark,
      p2Mark: this.p2Mark
    };
    return obj;
  },

  set setProperties(obj) {
    this.p1Mark = obj.p1Mark;
    this.p2Mark = obj.p2Mark;
  }

}; // Mark constructor function

function Mark() {
  this.p1Mark = 'x';
  this.p2Mark = 'o';
}

Mark.prototype = markPrototype;
Mark.prototype.constructor = Mark; // PLAYER OBJECT

var playerPrototype = {
  updateScore: function updateScore() {
    var scoreString = this.score.toString();

    if (this.score < 10) {
      scoreString = '0' + scoreString;
    }

    if (this.mark === "x") {
      xScore.querySelector('.score').textContent = scoreString;
    } else {
      oScore.querySelector('.score').textContent = scoreString;
    }
  },
  initializeScore: function initializeScore() {
    if (this.mark === 'x') {
      this.scoreCell = xScore;
    } else {
      this.scoreCell = oScore;
    }

    this.scoreCell.querySelector('p span').textContent = this.name;
  },
  //For CPU user
  generateClick: function generateClick(id) {
    if (player2.name === "CPU" && cellsGrid.totalClicks < 9) {
      document.getElementById("".concat(id)).click();
    }
  },
  reset: function reset() {
    this.track = [0, 0, 0, 0, 0, 0, 0, 0];
  },

  get getProperties() {
    var obj = {
      mark: this.mark,
      name: this.name,
      score: this.score,
      track: this.track
    };
    return obj;
  },

  set setProperties(obj) {
    this.mark = obj.mark;
    this.name = obj.name;
    this.score = obj.score;
    this.track = obj.track;
  }

};

function Player() {
  this.mark = '';
  this.name = '';
  this.score = 0;
  this.scoreCell = {};
  this.track = [0, 0, 0, 0, 0, 0, 0, 0];
}

Player.prototype = playerPrototype;
Player.prototype.constructor = Player; // TURN OBJECT

var turnPrototype = {
  switch: function _switch() {
    var thirdRecipe;
    thirdRecipe = this.currentTurn;
    this.currentTurn = this.previousTurn;
    this.previousTurn = thirdRecipe;
    this.show();
  },
  show: function show() {
    var markPrevious = this.previousTurn;
    var markCurrent = this.currentTurn;
    turnIconO.classList.remove('not-show-element');
    turnIconX.classList.add('not-show-element');

    if (markCurrent === "x") {
      turnIconX.classList.remove('not-show-element');
      turnIconO.classList.add('not-show-element');
    }
  },
  reset: function reset() {
    this.currentTurn = 'x';
    this.previousTurn = 'o';
    this.show();
  },

  get getProperties() {
    var obj = {
      currentTurn: this.currentTurn,
      previousTurn: this.previousTurn
    };
    return obj;
  },

  set setProperties(obj) {
    this.currentTurn = obj.currentTurn;
    this.previousTurn = obj.previousTurn;
  }

};

function Turn() {
  this.currentTurn = 'x';
  this.previousTurn = 'o';
}

Turn.prototype = turnPrototype;
Turn.prototype.constructor = Turn; // CELL OBJECT

var cellPrototype = {
  markAsWinner: function markAsWinner() {
    document.getElementById(this.id).classList.add("cell-background-win-".concat(this.marked));
  },
  addClickEvent: function addClickEvent() {
    this.clickEventHandler = this.clickEventHandler.bind(this);

    if (!this.marked) {
      document.getElementById(this.id).addEventListener("click", this.clickEventHandler, false);
    }
  },
  removeClickEvent: function removeClickEvent() {
    document.getElementById(this.id).removeEventListener("click", this.clickEventHandler, false);
  },
  resetCell: function resetCell() {
    this.marked = "";
    this.addClickEvent();
    this.resetCellBackground();
  },
  resetCellBackground: function resetCellBackground() {
    document.getElementById(this.id).removeAttribute("class");
  },
  showCellMark: function showCellMark(mark) {
    document.getElementById(this.id).classList.add("cell-background-".concat(this.marked));
  },

  get getProperties() {
    var obj = {
      marked: this.marked,
      id: this.id
    };
    return obj;
  },

  set setProperties(obj) {
    this.marked = obj.marked;
    this.id = obj.id;
  }

};

function Cell(id) {
  this.marked = "";
  this.id = id;

  this.clickEventHandler = function (event) {
    event.stopPropagation();
    event.preventDefault(); // Using this if-statement to fix the clicking twice bug

    if (!cellsGrid.allCellsId.includes(event.currentTarget.id)) {
      this.marked = turn.currentTurn;
      restartBtn.removeAttribute("disabled");
      this.showCellMark();
      cellsGrid.clickCentinel(this.marked, this.playerName, this.id);
      this.removeClickEvent();

      if (player2.name === "CPU") {
        computer.anotate();
      }

      turn.switch();
      populateStorage(); // managing computer move

      if (player2.name === "CPU") {
        if (computer.isItMyTurn()) {
          var computerMove = computer.chooseMove();
          player2.generateClick(computerMove);
        }
      }
    }
  };
}

Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell; // CELLSGRID OBJECT

var cellsGridPrototype = {
  addAllCellsClickEvent: function addAllCellsClickEvent() {
    var _iterator = _createForOfIteratorHelper(cells),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        cell = _step.value;
        cell.addClickEvent();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  removeCellsClick: function removeCellsClick() {
    var _iterator2 = _createForOfIteratorHelper(cells),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        cell = _step2.value;
        cell.removeClickEvent();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  init: function init() {
    this.addAllCellsClickEvent();
  },
  clickCentinel: function clickCentinel(mark, name, cellId) {
    this.totalClicks++;
    this.allCellsId.push(cellId);
    var cellIdNumber = Number(cellId); // update players track arrays

    if (mark === player1.mark) {
      this.combinations.forEach(function (e, i) {
        if (e.includes(cellIdNumber)) {
          player1.track[i]++;
        }
      });
    } else if (mark === player2.mark) {
      this.combinations.forEach(function (e, i) {
        if (e.includes(cellIdNumber)) {
          player2.track[i]++;
        }
      });
    }

    this.tiesTrack = function () {
      var result = [];

      for (var i = 0; i < 8; i++) {
        result.push(player1.track[i] * player2.track[i]);
      }

      return result;
    };

    this.winnerCentinel();
  },
  winnerCentinel: function winnerCentinel() {
    var player1TrackIndex = player1.track.includes(3) ? player1.track.findIndex(function (x) {
      return x === 3;
    }) : false;
    var player2TrackIndex = player2.track.includes(3) ? player2.track.findIndex(function (x) {
      return x === 3;
    }) : false;
    var tiedGame = !this.tiesTrack().includes(0);

    if (player1TrackIndex || player1TrackIndex === 0) {
      this.won.playerName = player1.name;
      this.won.mark = player1.mark;
      this.won.cellsId = this.combinations[player1TrackIndex];
      player1.score++;
      this.summary(this.won);
      return;
    } else if (player2TrackIndex || player2TrackIndex === 0) {
      this.won.playerName = player2.name;
      this.won.mark = player2.mark;
      this.won.cellsId = this.combinations[player2TrackIndex];
      player2.score++;
      this.summary(this.won);
      return;
    } else if (tiedGame) {
      this.tiesScore++;
      this.won.playerName = "none";
      this.summary(this.won);
      return;
    }
  },
  summary: function summary(winnerData) {
    this.markWinnerCells(this.won.cellsId);
    this.UpdateScore();
    this.removeCellsClick();
    dialogBox.show();
    this.showDialog();
    populateDialogStorage();
  },
  UpdateScore: function UpdateScore() {
    var player = this.won.playerName;

    switch (player) {
      case player1.name:
        player1.updateScore();
        break;

      case player2.name:
        player2.updateScore();
        break;

      case "none":
        var tieScoreSlot = document.querySelector("#start #ties");
        var scoreString = this.tiesScore.toString();

        if (this.tiesScore < 10) {
          scoreString = '0' + scoreString;
        }

        tieScoreSlot.querySelector('.score').textContent = scoreString;
        break;
    }
  },
  showDialog: function showDialog() {
    var mark = this.won.mark;
    var player = this.won.playerName;

    if (player === "none") {
      configurePoppupDialog("tied");
    }

    switch (player) {
      case "P1":
        if (mark === "x") {
          if (player2.name === "CPU") {
            configurePoppupDialog("won-X");
          } else {
            configurePoppupDialog("player1-X");
          }
        } else if (mark === "o") {
          if (player2.name === "CPU") {
            configurePoppupDialog("won-O");
          } else {
            configurePoppupDialog("player1-O");
          }
        }

        break;

      case "P2":
        if (mark === "x") {
          configurePoppupDialog("player2-X");
        } else if (mark === "o") {
          configurePoppupDialog("player2-O");
        }

        break;

      case "CPU":
        if (mark === "x") {
          configurePoppupDialog("lost-X");
        } else if (mark === "o") {
          configurePoppupDialog("lost-O");
        }

        break;
    }
  },
  resetGrid: function resetGrid() {
    var _iterator3 = _createForOfIteratorHelper(cells),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        cellElement = _step3.value;
        cellElement.resetCell();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    this.won.cellsId = [];
    this.won.playerName = "";
    this.won.mark = "";
    this.totalClicks = 0;
    this.allCellsId = [];
    this.tiesTrack = [0, 0, 0, 0, 0, 0, 0, 0];
  },
  markWinnerCells: function markWinnerCells(cellsIds) {
    var _iterator4 = _createForOfIteratorHelper(cellsIds),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        cellId = _step4.value;
        var pos = cellId - 1;
        cells[pos].markAsWinner();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  },

  get getProperties() {
    var obj = {
      won: this.won,
      totalClicks: this.totalClicks,
      tiesScore: this.tiesScore,
      allCellsId: this.allCellsId,
      tiesTrack: this.tiesTrack
    };
    return obj;
  },

  set setProperties(obj) {
    this.won = obj.won;
    this.totalClicks = obj.totalClicks;
    this.tiesScore = obj.tiesScore;
    this.allCellsId = obj.allCellsId;
    this.tiesTrack = obj.tiesTrack;
  }

};

function CellsGrid() {
  this.won = {
    playerName: "",
    cellsId: [],
    mark: ""
  };
  this.totalClicks = 0;
  this.tiesScore = 0;
  this.allCellsId = [];
  this.combinations = [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]];
  this.tiesTrack = [0, 0, 0, 0, 0, 0, 0, 0];
}

CellsGrid.prototype = cellsGridPrototype;
CellsGrid.prototype.constructor = CellsGrid; // COMPUTER OBJECT

computerPrototype = {
  initialize: function initialize() {
    this.possiblePlays = JSON.parse(JSON.stringify(POSSIBLE_PLAYS));
  },
  anotate: function anotate() {
    // pop out the number clicked from the possible future moves
    var cellClicked = Number(cellsGrid.allCellsId[cellsGrid.allCellsId.length - 1]);
    var index = this.possiblePlays.findIndex(function (x) {
      return x === cellClicked;
    });
    this.possiblePlays.splice(index, 1);
  },
  // Analize the options and return the chosen move
  chooseMove: function chooseMove() {
    var iHaveWinningMove = this.haveIWinningMove();
    var playerHaveWinningMove = this.havePWinningMove();
    var playerHaveHalfEmptyCombs = this.havePHalfEmptyCombs();
    var playerHaveEmptyCombs = this.havePEmptyCombs();

    if (iHaveWinningMove || iHaveWinningMove === 0) {
      var _iterator5 = _createForOfIteratorHelper(this.possiblePlays),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var element = _step5.value;

          if (cellsGrid.combinations[iHaveWinningMove].includes(element)) {
            return element;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } else if (playerHaveWinningMove || playerHaveWinningMove === 0) {
      var _iterator6 = _createForOfIteratorHelper(this.possiblePlays),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _element = _step6.value;

          if (cellsGrid.combinations[playerHaveWinningMove].includes(_element)) {
            return _element;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    } else if (playerHaveHalfEmptyCombs || playerHaveHalfEmptyCombs === 0) {
      var _iterator7 = _createForOfIteratorHelper(this.possiblePlays),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _element2 = _step7.value;

          if (cellsGrid.combinations[playerHaveHalfEmptyCombs].includes(_element2)) {
            return _element2;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    } else if (playerHaveEmptyCombs || playerHaveEmptyCombs === 0) {
      var _iterator8 = _createForOfIteratorHelper(this.possiblePlays),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _element3 = _step8.value;

          if (cellsGrid.combinations[playerHaveEmptyCombs].includes(_element3)) {
            return _element3;
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    } else if (this.possiblePlays.length) {
      return computer.takeFirstOpt();
    }
  },
  // small tasks
  isItMyTurn: function isItMyTurn() {
    if (turn.currentTurn === player2.mark) {
      return true;
    }

    return false;
  },
  haveIWinningMove: function haveIWinningMove() {
    var indexToReturn = null;
    player2.track.forEach(function (element, index) {
      if (element === 2 && player1.track[index] == 0) {
        indexToReturn = index;
      }
    });
    return indexToReturn;
  },
  havePWinningMove: function havePWinningMove() {
    var indexToReturn = null;
    player1.track.forEach(function (element, index) {
      if (element === 2 && player2.track[index] === 0) {
        indexToReturn = index;
      }
    });
    return indexToReturn;
  },
  havePEmptyCombs: function havePEmptyCombs() {
    var indexToReturn = null;
    player1.track.forEach(function (element, index) {
      if (element === 0 && player2.track[index] === 0) {
        indexToReturn = index;
      }
    });
    return indexToReturn;
  },
  havePHalfEmptyCombs: function havePHalfEmptyCombs() {
    var indexToReturn = null;
    player1.track.forEach(function (element, index) {
      if (element === 0 && player2.track[index] === 1) {
        indexToReturn = index;
      }
    });
    return indexToReturn;
  },
  takeFirstOpt: function takeFirstOpt() {
    return this.possiblePlays[0];
  },

  get getProperties() {
    return this.possiblePlays;
  },

  set setProperties(arr) {
    this.possiblePlays = arr;
  }

};

function Computer() {
  this.possiblePlays = [];
}

Computer.prototype = computerPrototype;
Computer.prototype.constructor = Computer; // ============================================================================
// --------------------------------FUNCTIONS-----------------------------------
// ============================================================================
// DIALOG

function configurePoppupDialog(kind) {
  switch (kind) {
    case type.first:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "1";
      iconContainer.setAttribute("class", "msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.second:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "1";
      iconContainer.setAttribute('class', 'msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;
      ye;

    case type.third:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "2";
      iconContainer.setAttribute("class", "msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.fourth:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "2";
      iconContainer.setAttribute('class', 'msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;

    case type.fifth:
      won.classList.remove('not-show-element');
      iconContainer.setAttribute("class", "msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.sixth:
      won.classList.remove('not-show-element');
      iconContainer.setAttribute('class', 'msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;

    case type.seventh:
      lost.classList.remove('not-show-element');
      iconContainer.setAttribute("class", "msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.eighth:
      lost.classList.remove('not-show-element');
      iconContainer.setAttribute('class', 'msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;

    case type.nineth:
      iconContainer.setAttribute("class", 'not-show-element');
      restart.classList.remove('not-show-element');
      break;

    case type.tenth:
      iconContainer.setAttribute("class", 'not-show-element');
      tied.classList.remove('not-show-element');
      break;
  }

  if (kind === type.nineth) {
    quitCancelBtn.classList.replace('quit-btn', 'quit-resize');
    roundRestartBtn.classList.replace('nextround-restart-btn', 'next-round-resize');
    quitCancelBtn.querySelector('h5').textContent = 'no, cancel';
    roundRestartBtn.querySelector('h5').textContent = 'yes, restart';
  } else {
    quitCancelBtn.classList.replace('quit-resize', 'quit-btn');
    roundRestartBtn.classList.replace('next-round-resize', 'nextround-restart-btn');
    quitCancelBtn.querySelector('h5').textContent = 'quit';
    roundRestartBtn.querySelector('h5').textContent = 'next round';
  }

  ;
  dialogBox.setAttribute("data-type", kind);
}

function resetDialog() {
  var dialogElemList = document.querySelectorAll("#dialog-box p, #dialog-box h3, #dialog-box svg");

  var _iterator9 = _createForOfIteratorHelper(dialogElemList.entries()),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _step9$value = _slicedToArray(_step9.value, 2),
          _key = _step9$value[0],
          entrie = _step9$value[1];

      entrie.classList.add('not-show-element');
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  ;
  iconContainer.setAttribute("class", "");
}

function restartNewRound() {
  cellsGrid.resetGrid();
  turn.reset();
  player1.reset();
  player2.reset();

  if (player2.name === "CPU") {
    computer.initialize();
  }

  restartBtn.setAttribute("disabled", "");
  populateStorage();

  if (player2.mark === "x" && player2.name === 'CPU') {
    var computerMove = computer.chooseMove();
    player2.generateClick(computerMove);
  }
}

function cellsCreator() {
  var cellsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var cellPosition;

  var _iterator10 = _createForOfIteratorHelper(cellElements.entries()),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var _step10$value = _slicedToArray(_step10.value, 2);

      cellElementKey = _step10$value[0];
      cellElement = _step10$value[1];
      var cell = new Cell(cellElement.id, cellElement);
      cellPosition = Number(cellElement.id) - 1;
      cellsArray.splice(cellPosition, 1, cell);
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }

  return cellsArray;
}

; // ------------------------------session storage functions----------------------

function populateStorage() {
  // HTML
  // new Game
  newGameClass = newGame.getAttribute("class");
  sessionStorage.setItem("new-game", newGameClass);
  xChoiceButtonClass = markBtnX.getAttribute("class");
  oChoiceButtonClass = markBtnO.getAttribute("class");
  sessionStorage.setItem("x-choice-button", xChoiceButtonClass);
  sessionStorage.setItem("o-choice-button", oChoiceButtonClass); // start

  startClass = start.getAttribute("class");
  sessionStorage.setItem("start", startClass);
  turnIconXClass = turnIconX.getAttribute("class");
  turnIconOClass = turnIconO.getAttribute("class");
  sessionStorage.setItem("turnIconX", turnIconXClass);
  sessionStorage.setItem("turnIconO", turnIconOClass);
  restartBtnClass = restartBtn.getAttribute("class");
  sessionStorage.setItem("restart-btn", restartBtnClass);
  cellsClass = {};

  var _iterator11 = _createForOfIteratorHelper(cells),
      _step11;

  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      cell = _step11.value;

      if (cell) {
        cellsClass[cell.id] = document.getElementById(cell.id).getAttribute("class");
      }
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }

  sessionStorage.setItem("cellsClassObj", JSON.stringify(cellsClass));
  xScoreContent = {
    xScorePlayer: xScore.querySelector("p").innerHTML,
    xScoreScore: xScore.querySelector("h4").innerHTML
  };
  oScoreContent = {
    oScorePlayer: oScore.querySelector("p").innerHTML,
    oScoreScore: oScore.querySelector("h4").innerHTML
  };
  tieContent = tie.querySelector("h4").textContent;
  sessionStorage.setItem("xScoreContentObj", JSON.stringify(xScoreContent));
  sessionStorage.setItem("oScoreContentObj", JSON.stringify(oScoreContent));
  sessionStorage.setItem("tieContent", tieContent); // GETTING JAVASCRIPT OBJECTS

  markObj = mark.getProperties;
  turnObj = turn.getProperties;
  player1Obj = player1.getProperties;
  player2Obj = player2.getProperties;
  cellObjs.length = 0;

  var _iterator12 = _createForOfIteratorHelper(cells),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      cell = _step12.value;
      cellObjs.push(cell.getProperties);
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }

  cellsGridObj = cellsGrid.getProperties;
  computerObj = computer.getProperties;
  sessionStorage.setItem("mark", JSON.stringify(markObj));
  sessionStorage.setItem("turn", JSON.stringify(turnObj));
  sessionStorage.setItem("player1", JSON.stringify(player1Obj));
  sessionStorage.setItem("player2", JSON.stringify(player2Obj));
  sessionStorage.setItem("cells", JSON.stringify(cellObjs));
  sessionStorage.setItem("cellsGrid", JSON.stringify(cellsGridObj));
  sessionStorage.setItem("computer", JSON.stringify(computerObj));
}

function populateDialogStorage() {
  var dialogBoxObj = {
    dialogBoxOpen: dialogBox.hasAttribute("open"),
    type: dialogBox.dataset.type
  };
  sessionStorage.setItem("dialogBoxStyle", JSON.stringify(dialogBoxObj));
}

function setStyle() {
  // new game
  newGameClass = sessionStorage.getItem("new-game");
  newGame.setAttribute("class", newGameClass);
  xChoiceButtonClass = sessionStorage.getItem("x-choice-button");
  markBtnX.setAttribute("class", xChoiceButtonClass);
  oChoiceButtonClass = sessionStorage.getItem("o-choice-button");
  markBtnO.setAttribute("class", oChoiceButtonClass); // start

  startClass = sessionStorage.getItem("start");
  start.setAttribute("class", startClass);
  turnIconXClass = sessionStorage.getItem("turnIconX");
  turnIconX.setAttribute("class", turnIconXClass);
  turnIconOClass = sessionStorage.getItem("turnIconO");
  turnIconO.setAttribute("class", turnIconOClass);
  restartBtnClass = sessionStorage.getItem("restart-btn");
  restartBtn.setAttribute("class", restartBtnClass);
  cellsClass = JSON.parse(sessionStorage.getItem("cellsClassObj"));

  if (cellsClass) {
    for (var _i2 = 0, _Object$entries = Object.entries(cellsClass); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2);

      key = _Object$entries$_i[0];
      value = _Object$entries$_i[1];
      document.getElementById(key).setAttribute('class', value);
    }
  }

  xScoreContent = JSON.parse(sessionStorage.getItem("xScoreContentObj"));
  oScoreContent = JSON.parse(sessionStorage.getItem("oScoreContentObj"));
  tieContent = sessionStorage.getItem("tieContent");
  xScore.querySelector("p").innerHTML = xScoreContent.xScorePlayer;
  xScore.querySelector("h4").innerHTML = xScoreContent.xScoreScore;
  oScore.querySelector("p").innerHTML = oScoreContent.oScorePlayer;
  oScore.querySelector("h4").innerHTML = oScoreContent.oScoreScore;
  tie.querySelector("h4").textContent = tieContent; // DIALOG

  if (sessionStorage.getItem("dialogBoxStyle")) {
    var dialogBoxObj = JSON.parse(sessionStorage.getItem("dialogBoxStyle"));

    if (dialogBoxObj.dialogBoxOpen) {
      dialogBox.show();
      configurePoppupDialog(dialogBoxObj.type);
    }
  } // JAVASCRIPT


  markObj = JSON.parse(sessionStorage.getItem("mark"));
  turnObj = JSON.parse(sessionStorage.getItem("turn"));
  player1Obj = JSON.parse(sessionStorage.getItem("player1"));
  player2Obj = JSON.parse(sessionStorage.getItem("player2"));
  cellObjs = JSON.parse(sessionStorage.getItem('cells'));
  cellsGridObj = JSON.parse(sessionStorage.getItem("cellsGrid"));
  computerObj = JSON.parse(sessionStorage.getItem("computer"));
  mark.setProperties = markObj;
  turn.setProperties = turnObj;
  player1.setProperties = player1Obj;
  player2.setProperties = player2Obj;
  cells.forEach(function (cell, index) {
    cell.setProperties = cellObjs[index];
  });
  cellsGrid.setProperties = cellsGridObj;
  cellsGrid.addAllCellsClickEvent();
  computer.setProperties = computerObj;
} // ============================================================================
//---------------------------CREATING OBJECTS ---------------------------------
// ============================================================================
// creating mark object


var mark = new Mark(); // creating player objects

var player1 = new Player();
var player2 = new Player();
var computer = new Computer(); // creating Turn OBJECT

var turn = new Turn(); //Arrays of cell

var cells = cellsCreator(); // creating cellsGrid OBJECT to group and manage the cells all

var cellsGrid = new CellsGrid(); // ============================================================================
// --------------------------------------EVENTS--------------------------------
// ============================================================================
// Buttons
//adding event to choose the player1's mark

for (var _i3 = 0, _arr2 = [markBtnX, markBtnO]; _i3 < _arr2.length; _i3++) {
  var button = _arr2[_i3];
  button.addEventListener('click', function () {
    mark.switch();
    populateStorage();
  });
}

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
  cellsGrid.init();
  populateStorage();
});
cpuVsPlayerButton.addEventListener("click", function () {
  player1.mark = mark.p1Mark;
  player1.name = "P1";
  player2.mark = mark.p2Mark;
  player2.name = "CPU";
  player1.initializeScore();
  player2.initializeScore();
  newGame.classList.add('not-show-element');
  start.classList.remove('not-show-element');
  cellsGrid.init();
  computer.initialize();

  if (player2.mark === "x") {
    var computerMove = computer.chooseMove();
    player2.generateClick(computerMove);
  }

  populateStorage();
}); // dialog events

quitCancelBtn.addEventListener("click", function (e) {
  if (e.target.textContent.toLowerCase() === "quit") {
    // reload the page without creating a history entry
    sessionStorage.clear();
    window.location.reload();
  } else {
    resetDialog();
    dialogBox.close();
    populateDialogStorage();
  }
});
roundRestartBtn.addEventListener("click", function () {
  restartNewRound();
  resetDialog();
  dialogBox.close();
  populateDialogStorage();
});
restartBtn.addEventListener("click", function () {
  configurePoppupDialog("restart");
  dialogBox.show();
  populateDialogStorage();
}); //session storage events

window.addEventListener("load", function () {
  if (sessionStorage.length) {
    setStyle();
  }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54879" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map