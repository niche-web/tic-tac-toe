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

// MARK OBJECT
var markPrototype = {
  updateMark: function updateMark() {
    if (this.btnX.classList.contains('active-mark-button')) {
      this.p1Mark = 'x';
      this.p2Mark = 'o';
    } else {
      this.p2Mark = 'x';
      this.p1Mark = 'o';
    }
  },
  switch: function _switch() {
    this.btnX.classList.toggle('active-mark-button');
    this.btnO.classList.toggle('active-mark-button');
    this.updateMark();
  }
}; // Mark constructor function

function Mark() {
  this.p1Mark = 'x';
  this.p2Mark = 'o';
  this.btnX = document.querySelector('#x-choice-button');
  this.btnO = document.querySelector('#o-choice-button');
}

Mark.prototype = markPrototype;
Mark.prototype.constructor = Mark; // ==========================================================================
// PLAYER OBJECT

var playerPrototype = {
  updateScore: function updateScore() {
    var scoreString = this.score.toString();

    if (this.score < 10) {
      scoreString = '0' + scoreString;
    }

    this.scoreCell.querySelector('.score').textContent = scoreString;
  },
  initializeScore: function initializeScore() {
    if (this.mark === 'x') {
      this.scoreCell = document.querySelector('#x-score');
    } else {
      this.scoreCell = document.querySelector('#o-score');
    }

    this.scoreCell.querySelector('p span').textContent = this.name;
  },
  //For CPU user
  generateClick: function generateClick(id) {
    if (player2.name === "CPU") {
      document.getElementById("".concat(id)).click();
    }
  },
  reset: function reset() {
    this.track = [0, 0, 0, 0, 0, 0, 0, 0];
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
Player.prototype.constructor = Player; // ==============================================================================
// TURN OBJECT

var turnPrototype = {
  switch: function _switch() {
    var thirdRecipe;
    thirdRecipe = this.currentTurn;
    this.currentTurn = this.previousTurn;
    this.previousTurn = thirdRecipe;
    this.show();
  },
  show: function show() {
    var markPrevious = this.previousTurn.toUpperCase();
    var markCurrent = this.currentTurn.toUpperCase();
    this['icon' + markCurrent].classList.remove('not-show-element');
    this['icon' + markPrevious].classList.add('not-show-element');
  },
  reset: function reset() {
    this.currentTurn = 'x';
    this.previousTurn = 'o';
    this.show();
  }
};

function Turn() {
  this.currentTurn = 'x';
  this.previousTurn = 'o';
  this.iconX = document.querySelector('.turn .icon-x');
  this.iconO = document.querySelector('.turn .icon-o');
}

Turn.prototype = turnPrototype;
Turn.prototype.constructor = Turn; // ============================================================================
// CELL OBJECT

var cellPrototype = {
  markAsWinner: function markAsWinner() {
    this.element.classList.add("cell-background-win-".concat(this.marked));
  },
  addClickEvent: function addClickEvent() {
    this.clickEventHandler = this.clickEventHandler.bind(this);
    this.element.addEventListener("click", this.clickEventHandler, false);
  },
  removeClickEvent: function removeClickEvent() {
    this.element.removeEventListener("click", this.clickEventHandler, false);
  },
  resetCell: function resetCell() {
    this.addClickEvent();
    this.resetCellBackground();
    this.marked = "";
  },
  resetCellBackground: function resetCellBackground() {
    this.element.removeAttribute("class");
  },
  showCellMark: function showCellMark(mark) {
    this.element.classList.add("cell-background-".concat(this.marked));
  }
};

function Cell(id, element) {
  this.marked = "";
  this.id = id;
  this.element = element;

  this.clickEventHandler = function (event) {
    event.stopPropagation();
    event.preventDefault(); // Using this if-statement to fix the clicking twice bug

    if (!cellsGrid.allCellsId.includes(event.currentTarget.id)) {
      this.marked = turn.currentTurn;
      restartBtn.removeAttribute("disabled");
      this.showCellMark();
      cellsGrid.clickCentinel(this.marked, this.playerName, Number(this.id));
      this.removeClickEvent();

      if (player2.name === "CPU") {
        computer.anotate();
      }

      turn.switch();
    } // managing computer move


    if (player2.name === "CPU") {
      if (computer.isItMyTurn()) {
        var computerMove = computer.chooseMove();
        player2.generateClick(computerMove);
      }
    }
  };
}

Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell; // ===========================================================================
// CELLSGRID OBJECT

var cellsGridPrototype = {
  init: function init() {
    var cellArrayPosition;
    var cellElements = document.querySelectorAll("#start #cells > div");

    var _iterator = _createForOfIteratorHelper(cellElements.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2);

        key = _step$value[0];
        cellElement = _step$value[1];

        var _cell = new Cell(cellElement.id, cellElement);

        _cell.addClickEvent();

        cellArrayPosition = Number(cellElement.id) - 1;
        this.cells.splice(cellArrayPosition, 1, _cell);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  clickCentinel: function clickCentinel(mark, name, cellId) {
    this.totalClicks++;
    this.allCellsId.push(cellId); // update players track arrays

    if (mark === player1.mark) {
      this.combinations.forEach(function (e, i) {
        if (e.includes(cellId)) {
          player1.track[i]++;
        }
      });
    } else if (mark === player2.mark) {
      this.combinations.forEach(function (e, i) {
        if (e.includes(cellId)) {
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

    if (player1TrackIndex) {
      this.won.playerName = player1.name;
      this.won.mark = player1.mark;
      this.won.cellsId = this.combinations[player1TrackIndex];
      player1.score++;
      this.summary(this.won);
      return;
    } else if (player2TrackIndex) {
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
    var _iterator2 = _createForOfIteratorHelper(this.cells),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        cellElement = _step2.value;
        cellElement.resetCell();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this.won.cellsId = [];
    this.won.playerName = "";
    this.won.mark = "";
    this.totalClicks = 0;
    this.allCellsId = [];
    this.tiesTrack = [0, 0, 0, 0, 0, 0, 0, 0];
  },
  markWinnerCells: function markWinnerCells(cellsIds) {
    var _iterator3 = _createForOfIteratorHelper(cellsIds),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        cellId = _step3.value;
        var pos = cellId - 1;
        this.cells[pos].markAsWinner();
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  },
  removeCellsClick: function removeCellsClick() {
    var _iterator4 = _createForOfIteratorHelper(cellsGrid.cells),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        cell = _step4.value;
        cell.removeClickEvent();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  },
  updateRecord: function updateRecord() {}
};

function CellsGrid() {
  this.won = {
    playerName: "",
    cellsId: [],
    mark: ""
  };
  this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.totalClicks = 0;
  this.tiesScore = 0;
  this.allCellsId = [];
  this.combinations = [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]];
  this.tiesTrack = [0, 0, 0, 0, 0, 0, 0, 0];
}

CellsGrid.prototype = cellsGridPrototype;
CellsGrid.prototype.constructor = CellsGrid; // =====================================================================
// COMPUTER OBJECT

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
    this.possiblePlays.splice(index, 1); // // keeping track of the combinations used for each player
    // if ( !this.isItMyTurn() ) {
    // 	this.combinations.forEach( ( e, i ) => {
    // 		if ( e.includes( cellClicked ) ) {
    // 			this.playerTrackArray[ i ]++;
    // 		}
    // 	} );
    // } else {
    // 	this.combinations.forEach( ( e, i ) => {
    // 		if ( e.includes( cellClicked ) ) {
    // 			this.computerTrackArray[ i ]++;
    // 		}
    // 	} );
    // }
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
    } else if (playerHaveHalfEmptyCombs || playerHaveEmptyCombs === 0) {
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
    } else {
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
  }
};

function Computer() {
  this.possiblePlays = [];
}

Computer.prototype = computerPrototype;
Computer.prototype.constructor = Computer; // ==========================================================================
// DIALOG

function configurePoppupDialog(kind) {
  switch (kind) {
    case type.first:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "1";
      iconContainer.classList.add("msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.second:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "1";
      iconContainer.classList.add('msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;
      ye;

    case type.third:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "2";
      iconContainer.classList.add("msg-background-x");
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.fourth:
      playerWonLost.classList.remove('not-show-element');
      playerWonLost.querySelector('.player-number').textContent = "2";
      iconContainer.classList.add('msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;

    case type.fifth:
      won.classList.remove('not-show-element');
      iconContainer.classList.add('msg-background-x');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.sixth:
      won.classList.remove('not-show-element');
      iconContainer.classList.add('msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
      break;

    case type.seventh:
      lost.classList.remove('not-show-element');
      iconContainer.classList.add('msg-background-x');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-blue");
      break;

    case type.eighth:
      lost.classList.remove('not-show-element');
      iconContainer.classList.add('msg-background-o');
      takesRound.classList.remove('not-show-element');
      takesRound.style.color = cssRootStyle.getPropertyValue("--light-yellow");
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
  localStorage.setItem("pageSave", inBody);
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
  iconContainer.classList.remove('not-show-element');
} // dialog initializing


var dialogBox = document.querySelector("#dialog-box"); // head

var playerWonLost = document.querySelector('#dialog-box #player-won-lost');
var won = document.querySelector('#dialog-box #won');
var lost = document.querySelector('#dialog-box #lost'); // main take a round

var iconContainer = document.querySelector("#msg-body .icon-container");
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
}; // ==========================================================================
// Initialize

var inBody = document.querySelector("body").innerHTML; // pages

var newGame = document.querySelector('#new-game');
var start = document.querySelector('#start'); // creating mark object

var mark = new Mark(); // creating player objects

var player1 = new Player();
var player2 = new Player(); // creating Turn OBJECT

var turn = new Turn(); // creating cellsGrid OBJECT to group and manage the cells all

var cellsGrid = new CellsGrid(); //adding event to choose the player1's mark

for (var _i2 = 0, _arr2 = [mark.btnX, mark.btnO]; _i2 < _arr2.length; _i2++) {
  var button = _arr2[_i2];
  button.addEventListener('click', function () {
    console.log("change");
    mark.switch();
    localStorage.setItem("pageSave", inBody);
  });
} // Computer constants


var COMBINATIONS_MATRIX = [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]];
var POSSIBLE_PLAYS = [5, 2, 4, 6, 8, 1, 3, 7, 9]; // CSS Variables

var cssRoot = document.querySelector(":root");
var cssRootStyle = getComputedStyle(cssRoot); // player vs player addEventListener

var playerVsPlayerButton = document.querySelector('#player1-vs-player2-button');
var cpuVsPlayerButton = document.querySelector("#cpu-vs-player-button");
var computer = new Computer();
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
  localStorage.setItem("pageSave", inBody);
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

  localStorage.setItem("pageSave", inBody);
}); // dialog events

quitCancelBtn.addEventListener("click", function (e) {
  if (e.target.textContent.toLowerCase() === "quit") {
    // reload the page without creating a history entry
    window.location.reload();
  } else {
    resetDialog();
    dialogBox.close();
    localStorage.setItem("pageSave", inBody);
  }
});
roundRestartBtn.addEventListener("click", function () {
  restartNewRound();
  resetDialog();
  dialogBox.close();
  localStorage.setItem("pageSave", inBody);
});
var restartBtn = document.getElementById("restart-button");

function restartNewRound() {
  cellsGrid.resetGrid();
  turn.reset();
  player1.reset();
  player2.reset();

  if (computer) {
    computer.initialize();
  }

  restartBtn.setAttribute("disabled", "");

  if (player2.mark === "x") {
    var computerMove = computer.chooseMove();
    player2.generateClick(computerMove);
  }
}

restartBtn.addEventListener("click", function () {
  configurePoppupDialog("restart");
  dialogBox.show();
  localStorage.setItem("pageSave", inBody);
}); // =======================================================================
// -------------------------WEB STORAGE-----------------------------------
// =======================================================================
// window.onload = function () {
// 	if ( localStorage.getItem( "pageSave" ) ) {
// 		inBody = localStorage.getItem( "pageSave" )
// 			.innerHTML;
// 		// make the browser to render the DOM
// 		var el = document.getElementById( "fixup" );
// 		var speed = 10,
// 			i = 0,
// 			limit = 1000;
// 		setTimeout( function loop() {
// 			el.innerHTML = i++;
// 			if ( i <= limit ) {
// 				setTimeout( loop, speed );
// 			}
// 		}, speed );
// 	}
// }
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53694" + '/');

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