// ============================================================================
// ---------------------------------CONSTS-------------------------------------
// ============================================================================
const COMBINATIONS_MATRIX = [
	[ 1, 5, 9 ],
	[ 1, 6, 8 ],
	[ 2, 4, 9 ],
	[ 2, 5, 8 ],
	[ 2, 6, 7 ],
	[ 3, 4, 8 ],
	[ 3, 5, 7 ],
	[ 4, 5, 6 ]
];
const POSSIBLE_PLAYS = [ 5, 2, 4, 6, 8, 1, 3, 7, 9 ];

// DOM INTIALIZING
// page new game
const newGame = document.querySelector( '#new-game' );

// choice buttons
const markBtnO = document.querySelector( '#o-choice-button' );
const markBtnX = document.querySelector( '#x-choice-button' );
// page start
const start = document.querySelector( '#start' );
const cellElements = document.querySelectorAll( "#start #cells > div" );
const turnIconX = document.querySelector( '.turn .icon-x' );
const turnIconO = document.querySelector( '.turn .icon-o' );
const xScore = document.getElementById( "x-score" );
const oScore = document.getElementById( "o-score" );
const tie = document.getElementById( "ties" );

// dialog page
const dialogBox = document.querySelector( "#dialog-box" );

// CSS Variables
const cssRoot = document.querySelector( ":root" );
const cssRootStyle = getComputedStyle( cssRoot );

// BUTTONS
let playerVsPlayerButton = document.querySelector(
	'#player1-vs-player2-button'
);
const cpuVsPlayerButton = document.querySelector( "#cpu-vs-player-button" );
const restartBtn = document.getElementById( "restart-button" );

// dialog initializing
// head
const playerWonLost = document.querySelector( '#dialog-box #player-won-lost' );
const won = document.querySelector( '#dialog-box #won' );
const lost = document.querySelector( '#dialog-box #lost' );
// main take a round
const iconContainer = document.querySelector( "#msg-body #msg-icon-container" );
const takesRound = document.querySelector( '#dialog-box #takes-round' );
// main Restart and Tied
const restart = document.querySelector( '#dialog-box #restart' );
const tied = document.querySelector( '#dialog-box #tied' );
// foot
const quitCancelBtn = document.querySelector( '#dialog-box footer #quit-cancel' );
const roundRestartBtn = document.querySelector(
	'#dialog-box footer #round-restart' );

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
// to sessionStorage use
let markObj, turnObj, player1Obj, player2Obj, cellsGridObj, computerObj, xScoreContent, oScoreContent;
let newGameClass, xChoiceButtonClass, oChoiceButtonClass, startClass, turnIconXClass, turnIconOClass, restartBtnClass, cellsClass, tieContent;
let cellObjs = [];
// =============================================================================
// -------------------------------------OBJECTS---------------------------------
// =============================================================================
// MARK OBJECT
let markPrototype = {
	updateMark() {
		if ( markBtnX.classList.contains( 'active-mark-button' ) ) {
			this.p1Mark = 'x';
			this.p2Mark = 'o';
		} else {
			this.p2Mark = 'x';
			this.p1Mark = 'o';
		}
	},
	switch () {
		markBtnX.classList.toggle( 'active-mark-button' );
		markBtnO.classList.toggle( 'active-mark-button' );
		this.updateMark();
	},
	get getProperties() {
		let obj = {
			p1Mark: this.p1Mark,
			p2Mark: this.p2Mark
		}
		return obj;
	},
	set setProperties( obj ) {
		this.p1Mark = obj.p1Mark;
		this.p2Mark = obj.p2Mark;
	}
};
// Mark constructor function
function Mark() {
	this.p1Mark = 'x';
	this.p2Mark = 'o';
}
Mark.prototype = markPrototype;
Mark.prototype.constructor = Mark;
// PLAYER OBJECT
let playerPrototype = {
	updateScore() {
		let scoreString = this.score.toString();
		if ( this.score < 10 ) {
			scoreString = '0' + scoreString;
		}
		if ( this.mark === "x" ) {
			xScore.querySelector( '.score' )
				.textContent = scoreString;
		} else {
			oScore.querySelector( '.score' )
				.textContent = scoreString;
		}

	},
	initializeScore() {
		if ( this.mark === 'x' ) {
			this.scoreCell = xScore;
		} else {
			this.scoreCell = oScore;
		}
		this.scoreCell.querySelector( 'p span' )
			.textContent = this.name;
	},
	//For CPU user
	generateClick( id ) {
		if ( player2.name === "CPU" && cellsGrid.totalClicks < 9 ) {
			document.getElementById( `${id}` )
				.click();
		}
	},
	reset() {
		this.track = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
	},
	get getProperties() {
		let obj = {
			mark: this.mark,
			name: this.name,
			score: this.score,
			track: this.track
		}
		return obj;
	},
	set setProperties( obj ) {
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
	this.track = [ 0, 0, 0, 0, 0, 0, 0, 0 ]
}

Player.prototype = playerPrototype;
Player.prototype.constructor = Player;

// TURN OBJECT
let turnPrototype = {
	switch () {
		let thirdRecipe;
		thirdRecipe = this.currentTurn;
		this.currentTurn = this.previousTurn;
		this.previousTurn = thirdRecipe;
		this.show();
	},
	show() {
		let markPrevious = this.previousTurn;
		let markCurrent = this.currentTurn;
		turnIconO.classList.remove( 'not-show-element' );
		turnIconX.classList.add( 'not-show-element' );
		if ( markCurrent === "x" ) {
			turnIconX.classList.remove( 'not-show-element' );
			turnIconO.classList.add( 'not-show-element' );
		}

	},
	reset() {
		this.currentTurn = 'x';
		this.previousTurn = 'o';
		this.show();
	},
	get getProperties() {
		let obj = {
			currentTurn: this.currentTurn,
			previousTurn: this.previousTurn
		}
		return obj;
	},
	set setProperties( obj ) {
		this.currentTurn = obj.currentTurn;
		this.previousTurn = obj.previousTurn;
	}
};

function Turn() {
	this.currentTurn = 'x';
	this.previousTurn = 'o';
}
Turn.prototype = turnPrototype;
Turn.prototype.constructor = Turn;

// CELL OBJECT
const cellPrototype = {
	markAsWinner() {
		document.getElementById( this.id )
			.classList.add( `cell-background-win-${this.marked}` )
	},

	addClickEvent() {
		this.clickEventHandler = this.clickEventHandler.bind( this );
		if ( !this.marked ) {
			document.getElementById( this.id )
				.addEventListener( "click", this.clickEventHandler, false );
		}

	},
	removeClickEvent() {
		document.getElementById( this.id )
			.removeEventListener( "click", this.clickEventHandler, false );
	},
	resetCell() {
		this.marked = "";
		this.addClickEvent();
		this.resetCellBackground();
	},
	resetCellBackground() {
		document.getElementById( this.id )
			.removeAttribute( "class" );
	},
	showCellMark( mark ) {
		document.getElementById( this.id )
			.classList.add( `cell-background-${this.marked}` );

	},
	get getProperties() {
		let obj = {
			marked: this.marked,
			id: this.id
		}
		return obj;
	},
	set setProperties( obj ) {
		this.marked = obj.marked;
		this.id = obj.id;
	}
};

function Cell( id ) {
	this.marked = "";
	this.id = id;
	this.clickEventHandler = function ( event ) {
		event.stopPropagation();
		event.preventDefault();
		// Using this if-statement to fix the clicking twice bug
		if ( !cellsGrid.allCellsId.includes( event.currentTarget.id ) ) {
			this.marked = turn.currentTurn;
			restartBtn.removeAttribute( "disabled" );
			this.showCellMark();
			cellsGrid.clickCentinel( this.marked, this.playerName, this.id )
			this.removeClickEvent();
			if ( player2.name === "CPU" ) {
				computer.anotate();
			}
			turn.switch();
			populateStorage();
			// managing computer move
			if ( player2.name === "CPU" ) {
				if ( computer.isItMyTurn() ) {
					let computerMove = computer.chooseMove();
					player2.generateClick( computerMove );
				}
			}
		}
	}
}
Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell;

// CELLSGRID OBJECT
const cellsGridPrototype = {

	addAllCellsClickEvent() {
		for ( cell of cells ) {
			cell.addClickEvent();
		}
	},

	removeCellsClick() {
		for ( cell of cells ) {
			cell.removeClickEvent();
		}
	},

	init() {
		this.addAllCellsClickEvent();
	},

	clickCentinel( mark, name, cellId ) {
		this.totalClicks++
		this.allCellsId.push( cellId );
		var cellIdNumber = Number( cellId );
		// update players track arrays
		if ( mark === player1.mark ) {
			this.combinations.forEach( ( e, i ) => {
				if ( e.includes( cellIdNumber ) ) {
					player1.track[ i ]++;
				}
			} );
		} else if ( mark === player2.mark ) {
			this.combinations.forEach( ( e, i ) => {
				if ( e.includes( cellIdNumber ) ) {
					player2.track[ i ]++;
				}
			} );
		}
		this.tiesTrack = () => {
			let result = [];
			for ( let i = 0; i < 8; i++ ) {
				result.push( player1.track[ i ] * player2.track[ i ] )
			}
			return result;
		}
		this.winnerCentinel();
	},

	winnerCentinel() {
		let player1TrackIndex = player1.track.includes( 3 ) ?
			player1.track.findIndex( ( x ) => x === 3 ) : false;

		let player2TrackIndex = player2.track.includes( 3 ) ?
			player2.track.findIndex( ( x ) => x === 3 ) : false;

		let tiedGame = !this.tiesTrack()
			.includes( 0 );

		if ( player1TrackIndex || player1TrackIndex === 0 ) {
			this.won.playerName = player1.name;
			this.won.mark = player1.mark;
			this.won.cellsId = this.combinations[ player1TrackIndex ];
			player1.score++;
			this.summary( this.won )
			return;
		} else if ( player2TrackIndex || player2TrackIndex === 0 ) {
			this.won.playerName = player2.name;
			this.won.mark = player2.mark;
			this.won.cellsId = this.combinations[ player2TrackIndex ];
			player2.score++;
			this.summary( this.won );
			return;
		} else if ( tiedGame ) {
			this.tiesScore++
			this.won.playerName = "none";
			this.summary( this.won );
			return;
		}
	},

	summary( winnerData ) {
		this.markWinnerCells( this.won.cellsId );
		this.UpdateScore();
		this.removeCellsClick();
		dialog.show();
		this.showDialog();
		populateDialogStorage();
	},

	UpdateScore() {
		let player = this.won.playerName;
		switch ( player ) {
		case player1.name:
			player1.updateScore();
			break;
		case player2.name:
			player2.updateScore();
			break;
		case "none":
			let tieScoreSlot = document.querySelector( "#start #ties" )
			let scoreString = this.tiesScore.toString();
			if ( this.tiesScore < 10 ) {
				scoreString = '0' + scoreString;
			}
			tieScoreSlot.querySelector( '.score' )
				.textContent = scoreString;
			break;
		}
	},

	showDialog() {
		let mark = this.won.mark;
		let player = this.won.playerName;
		if ( player === "none" ) {
			dialog.configure( "tied" );
		}
		switch ( player ) {
		case "P1":
			if ( mark === "x" ) {
				if ( player2.name === "CPU" ) {
					dialog.configure( "won-X" );
				} else {
					dialog.configure( "player1-X" );
				}
			} else if ( mark === "o" ) {
				if ( player2.name === "CPU" ) {
					dialog.configure( "won-O" );
				} else {
					dialog.configure( "player1-O" );
				}
			}
			break;
		case "P2":
			if ( mark === "x" ) {
				dialog.configure( "player2-X" );
			} else if ( mark === "o" ) {
				dialog.configure( "player2-O" );
			}
			break;
		case "CPU":
			if ( mark === "x" ) {
				dialog.configure( "lost-X" );
			} else if ( mark === "o" ) {
				dialog.configure( "lost-O" );
			}
			break;
		}
	},

	resetGrid() {
		for ( cellElement of cells ) {
			cellElement.resetCell();
		}
		this.won.cellsId = [];
		this.won.playerName = "";
		this.won.mark = "";
		this.totalClicks = 0;
		this.allCellsId = [];
		this.tiesTrack = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
	},

	markWinnerCells( cellsIds ) {
		for ( cellId of cellsIds ) {
			let pos = cellId - 1;
			cells[ pos ].markAsWinner();
		}
	},

	get getProperties() {
		let obj = {
			won: this.won,
			totalClicks: this.totalClicks,
			tiesScore: this.tiesScore,
			allCellsId: this.allCellsId,
			tiesTrack: this.tiesTrack,
		}
		return obj;
	},

	set setProperties( obj ) {
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
	this.combinations = [
		[ 1, 5, 9 ],
		[ 1, 6, 8 ],
		[ 2, 4, 9 ],
		[ 2, 5, 8 ],
		[ 2, 6, 7 ],
		[ 3, 4, 8 ],
		[ 3, 5, 7 ],
		[ 4, 5, 6 ]
	];
	this.tiesTrack = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
}

CellsGrid.prototype = cellsGridPrototype;
CellsGrid.prototype.constructor = CellsGrid;

// COMPUTER OBJECT
computerPrototype = {
	initialize() {
		this.possiblePlays = JSON.parse( JSON.stringify( POSSIBLE_PLAYS ) );
	},
	anotate() {
		// pop out the number clicked from the possible future moves
		let cellClicked = Number( cellsGrid.allCellsId[ cellsGrid.allCellsId.length - 1 ] );
		var index = this.possiblePlays.findIndex( ( x ) => x === cellClicked );
		this.possiblePlays.splice( index, 1 );
	},
	// Analize the options and return the chosen move
	chooseMove() {
		var iHaveWinningMove = this.haveIWinningMove();
		var playerHaveWinningMove = this.havePWinningMove();
		var playerHaveHalfEmptyCombs = this.havePHalfEmptyCombs();
		var playerHaveEmptyCombs = this.havePEmptyCombs();

		if ( iHaveWinningMove || iHaveWinningMove === 0 ) {

			for ( let element of this.possiblePlays ) {
				if ( cellsGrid.combinations[ iHaveWinningMove ].includes( element ) ) {
					return element;
				}
			}

		} else if ( playerHaveWinningMove || playerHaveWinningMove === 0 ) {

			for ( let element of this.possiblePlays ) {
				if ( cellsGrid.combinations[ playerHaveWinningMove ].includes( element ) ) {
					return element;
				}
			}

		} else if ( playerHaveHalfEmptyCombs || playerHaveHalfEmptyCombs === 0 ) {

			for ( let element of this.possiblePlays ) {
				if ( cellsGrid.combinations[ playerHaveHalfEmptyCombs ].includes( element ) ) {
					return element;
				}
			}

		} else if ( playerHaveEmptyCombs || playerHaveEmptyCombs === 0 ) {

			for ( let element of this.possiblePlays ) {
				if ( cellsGrid.combinations[ playerHaveEmptyCombs ].includes( element ) ) {
					return element;
				}
			}

		} else if ( this.possiblePlays.length ) {
			return computer.takeFirstOpt();
		}
	},
	// small tasks
	isItMyTurn() {
		if ( turn.currentTurn === player2.mark ) {
			return true;
		}
		return false;
	},
	haveIWinningMove() {
		var indexToReturn = null;
		player2.track.forEach( ( element, index ) => {
			if ( element === 2 && player1.track[ index ] == 0 ) {
				indexToReturn = index;
			}
		} );
		return indexToReturn;
	},
	havePWinningMove() {
		var indexToReturn = null;
		player1.track.forEach( ( element, index ) => {
			if ( element === 2 && player2.track[ index ] === 0 ) {
				indexToReturn = index;
			}
		} );
		return indexToReturn;
	},
	havePEmptyCombs() {
		var indexToReturn = null;
		player1.track.forEach( ( element, index ) => {
			if ( element === 0 && player2.track[ index ] === 0 ) {
				indexToReturn = index;
			}
		} );
		return indexToReturn;
	},
	havePHalfEmptyCombs() {
		var indexToReturn = null;
		player1.track.forEach( ( element, index ) => {
			if ( element === 0 && player2.track[ index ] === 1 ) {
				indexToReturn = index;
			}
		} );
		return indexToReturn;
	},
	takeFirstOpt() {
		return this.possiblePlays[ 0 ];
	},
	get getProperties() {
		return this.possiblePlays;
	},
	set setProperties( arr ) {
		this.possiblePlays = arr;
	}
};

function Computer() {
	this.possiblePlays = [];
}

Computer.prototype = computerPrototype;
Computer.prototype.constructor = Computer;

// DIALOG OBJECT
dialogPrototype = {
	close() {
		dialogBox.removeAttribute( "open" )
	},
	show() {
		dialogBox.setAttribute( "open", "" )
	},
	reset() {
		let dialogElemList = document.querySelectorAll( "#dialog-box p, #dialog-box h3, #dialog-box svg" );
		for ( let [ key, entrie ] of dialogElemList.entries() ) {
			entrie.classList.add( 'not-show-element' );
		};
		iconContainer.setAttribute( "class", "" );
	},
	configure( kind ) {
		switch ( kind ) {
		case type.first:
			playerWonLost.classList.remove( 'not-show-element' );
			playerWonLost.querySelector( '.player-number' )
				.textContent = "1";
			iconContainer.setAttribute( "class", "msg-background-x" );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
			break;
		case type.second:
			playerWonLost.classList.remove( 'not-show-element' );
			playerWonLost.querySelector( '.player-number' )
				.textContent = "1";
			iconContainer.setAttribute( 'class', 'msg-background-o' );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
			break;
			ye
		case type.third:
			playerWonLost.classList.remove( 'not-show-element' );
			playerWonLost.querySelector( '.player-number' )
				.textContent = "2";
			iconContainer.setAttribute( "class", "msg-background-x" );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
			break;
		case type.fourth:
			playerWonLost.classList.remove( 'not-show-element' );
			playerWonLost.querySelector( '.player-number' )
				.textContent = "2";
			iconContainer.setAttribute( 'class', 'msg-background-o' );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
			break;
		case type.fifth:
			won.classList.remove( 'not-show-element' );
			iconContainer.setAttribute( "class", "msg-background-x" );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
			break;
		case type.sixth:
			won.classList.remove( 'not-show-element' );
			iconContainer.setAttribute( 'class', 'msg-background-o' );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
			break;
		case type.seventh:
			lost.classList.remove( 'not-show-element' );
			iconContainer.setAttribute( "class", "msg-background-x" );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
			break;
		case type.eighth:
			lost.classList.remove( 'not-show-element' );
			iconContainer.setAttribute( 'class', 'msg-background-o' );
			takesRound.classList.remove( 'not-show-element' );
			takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
			break;
		case type.nineth:
			iconContainer.setAttribute( "class", 'not-show-element' );
			restart.classList.remove( 'not-show-element' );
			break;
		case type.tenth:
			iconContainer.setAttribute( "class", 'not-show-element' );
			tied.classList.remove( 'not-show-element' );
			break;
		}
		if ( kind === type.nineth ) {
			quitCancelBtn.classList.replace( 'quit-btn', 'quit-resize' );
			roundRestartBtn.classList.replace(
				'nextround-restart-btn',
				'next-round-resize'
			);
			quitCancelBtn.querySelector( 'span' )
				.textContent = 'no, cancel';
			roundRestartBtn.querySelector( 'span' )
				.textContent =
				'yes, restart';
		} else {
			quitCancelBtn.classList.replace( 'quit-resize', 'quit-btn' );
			roundRestartBtn.classList.replace(
				'next-round-resize',
				'nextround-restart-btn'
			);
			quitCancelBtn.querySelector( 'span' )
				.textContent = 'quit';
			roundRestartBtn.querySelector( 'span' )
				.textContent = 'next round';
		};
		dialogBox.setAttribute( "data-type", kind );
	}
}

function Dialog() {};

Dialog.prototype = dialogPrototype;
Dialog.prototype.constructor = Dialog;

// ============================================================================
// --------------------------------FUNCTIONS-----------------------------------
// ============================================================================

function restartNewRound() {
	cellsGrid.resetGrid();
	turn.reset();
	player1.reset();
	player2.reset();
	if ( player2.name === "CPU" ) {
		computer.initialize();
	}
	restartBtn.setAttribute( "disabled", "" );
	populateStorage();
	if ( player2.mark === "x" && player2.name === 'CPU' ) {
		let computerMove = computer.chooseMove();
		player2.generateClick( computerMove );
	}
}

function cellsCreator() {
	let cellsArray = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	let cellPosition;
	for ( [ cellElementKey, cellElement ] of cellElements.entries() ) {
		var cell = new Cell( cellElement.id, cellElement );
		cellPosition = Number( cellElement.id ) - 1;
		cellsArray.splice( cellPosition, 1, cell );
	}
	return cellsArray
};

// ------------------------------session storage functions----------------------
function populateStorage() {

	// HTML
	// new Game
	newGameClass = newGame.getAttribute( "class" );
	sessionStorage.setItem( "new-game", newGameClass );
	xChoiceButtonClass = markBtnX.getAttribute( "class" );
	oChoiceButtonClass = markBtnO.getAttribute( "class" );
	sessionStorage.setItem( "x-choice-button", xChoiceButtonClass );
	sessionStorage.setItem( "o-choice-button", oChoiceButtonClass );

	// start
	startClass = start.getAttribute( "class" );
	sessionStorage.setItem( "start", startClass );
	turnIconXClass = turnIconX.getAttribute( "class" );
	turnIconOClass = turnIconO.getAttribute( "class" );
	sessionStorage.setItem( "turnIconX", turnIconXClass );
	sessionStorage.setItem( "turnIconO", turnIconOClass );
	restartBtnClass = restartBtn.getAttribute( "class" );
	sessionStorage.setItem( "restart-btn", restartBtnClass );
	cellsClass = {};
	for ( cell of cells ) {
		if ( cell ) {
			cellsClass[ cell.id ] = document.getElementById( cell.id )
				.getAttribute( "class" );
		}
	}
	sessionStorage.setItem( "cellsClassObj", JSON.stringify( cellsClass ) );

	xScoreContent = {
		xScorePlayer: xScore.querySelector( "p" )
			.innerHTML,
		xScoreScore: xScore.querySelector( "h4" )
			.innerHTML
	};
	oScoreContent = {
		oScorePlayer: oScore.querySelector( "p" )
			.innerHTML,
		oScoreScore: oScore.querySelector( "h4" )
			.innerHTML
	};
	tieContent = tie.querySelector( "h4" )
		.textContent;
	sessionStorage.setItem( "xScoreContentObj", JSON.stringify( xScoreContent ) );
	sessionStorage.setItem( "oScoreContentObj", JSON.stringify( oScoreContent ) );
	sessionStorage.setItem( "tieContent", tieContent );

	// GETTING JAVASCRIPT OBJECTS
	markObj = mark.getProperties;
	turnObj = turn.getProperties;
	player1Obj = player1.getProperties;
	player2Obj = player2.getProperties;
	cellObjs.length = 0;
	for ( cell of cells ) {
		cellObjs.push( cell.getProperties )
	}
	cellsGridObj = cellsGrid.getProperties;
	computerObj = computer.getProperties;

	sessionStorage.setItem( "mark", JSON.stringify( markObj ) );
	sessionStorage.setItem( "turn", JSON.stringify( turnObj ) );
	sessionStorage.setItem( "player1", JSON.stringify( player1Obj ) );
	sessionStorage.setItem( "player2", JSON.stringify( player2Obj ) );
	sessionStorage.setItem( "cells", JSON.stringify( cellObjs ) );
	sessionStorage.setItem( "cellsGrid", JSON.stringify( cellsGridObj ) );
	sessionStorage.setItem( "computer", JSON.stringify( computerObj ) );
}

function populateDialogStorage() {
	var dialogBoxObj = {
		dialogBoxOpen: dialogBox.hasAttribute( "open" ),
		type: dialogBox.dataset.type
	};
	sessionStorage.setItem( "dialogBoxStyle", JSON.stringify( dialogBoxObj ) );
}

function setStyle() {
	// new game
	newGameClass = sessionStorage.getItem( "new-game" );
	newGame.setAttribute( "class", newGameClass );
	xChoiceButtonClass = sessionStorage.getItem( "x-choice-button" );
	markBtnX.setAttribute( "class", xChoiceButtonClass );
	oChoiceButtonClass = sessionStorage.getItem( "o-choice-button" );
	markBtnO.setAttribute( "class", oChoiceButtonClass );

	// start
	startClass = sessionStorage.getItem( "start" );
	start.setAttribute( "class", startClass );
	turnIconXClass = sessionStorage.getItem( "turnIconX" );
	turnIconX.setAttribute( "class", turnIconXClass );
	turnIconOClass = sessionStorage.getItem( "turnIconO" );
	turnIconO.setAttribute( "class", turnIconOClass );
	restartBtnClass = sessionStorage.getItem( "restart-btn" );
	restartBtn.setAttribute( "class", restartBtnClass );
	cellsClass = JSON.parse( sessionStorage.getItem( "cellsClassObj" ) );
	if ( cellsClass ) {
		for ( [ key, value ] of Object.entries( cellsClass ) ) {
			document.getElementById( key )
				.setAttribute( 'class', value );
		}
	}
	xScoreContent = JSON.parse( sessionStorage.getItem( "xScoreContentObj" ) );
	oScoreContent = JSON.parse( sessionStorage.getItem( "oScoreContentObj" ) );
	tieContent = sessionStorage.getItem( "tieContent" );
	xScore.querySelector( "p" )
		.innerHTML = xScoreContent.xScorePlayer;
	xScore.querySelector( "h4" )
		.innerHTML = xScoreContent.xScoreScore;

	oScore.querySelector( "p" )
		.innerHTML = oScoreContent.oScorePlayer;
	oScore.querySelector( "h4" )
		.innerHTML = oScoreContent.oScoreScore;

	tie.querySelector( "h4" )
		.textContent = tieContent;

	// DIALOG
	if ( sessionStorage.getItem( "dialogBoxStyle" ) ) {
		var dialogBoxObj = JSON.parse( sessionStorage.getItem( "dialogBoxStyle" ) );
		if ( dialogBoxObj.dialogBoxOpen ) {
			dialog.show();
			dialog.configure( dialogBoxObj.type );
		}
	}
	// JAVASCRIPT
	markObj = JSON.parse( sessionStorage.getItem( "mark" ) );
	turnObj = JSON.parse( sessionStorage.getItem( "turn" ) );
	player1Obj = JSON.parse( sessionStorage.getItem( "player1" ) );
	player2Obj = JSON.parse( sessionStorage.getItem( "player2" ) );
	cellObjs = JSON.parse( sessionStorage.getItem( 'cells' ) );
	cellsGridObj = JSON.parse( sessionStorage.getItem( "cellsGrid" ) );
	computerObj = JSON.parse( sessionStorage.getItem( "computer" ) );

	mark.setProperties = markObj;
	turn.setProperties = turnObj;
	player1.setProperties = player1Obj;
	player2.setProperties = player2Obj;
	cells.forEach( ( cell, index ) => {
		cell.setProperties = cellObjs[ index ];
	} );
	cellsGrid.setProperties = cellsGridObj
	cellsGrid.addAllCellsClickEvent();
	computer.setProperties = computerObj;
}

// ============================================================================
//---------------------------CREATING OBJECTS ---------------------------------
// ============================================================================
// creating mark object
const mark = new Mark();
// creating player objects
const player1 = new Player();
const player2 = new Player();
const computer = new Computer();
// creating Turn OBJECT
const turn = new Turn();
//Arrays of cell
const cells = cellsCreator();
// creating cellsGrid OBJECT to group and manage the cells all
const cellsGrid = new CellsGrid();
// creating dialog Object
const dialog = new Dialog();
// ============================================================================
// --------------------------------------EVENTS--------------------------------
// ============================================================================
// Buttons
//adding event to choose the player1's mark
for ( let button of [ markBtnX, markBtnO ] ) {
	button.addEventListener( 'click', () => {
		mark.switch();
		populateStorage();
	} );
}
playerVsPlayerButton.addEventListener( 'click', function () {
	// initializing player objects
	player1.mark = mark.p1Mark;
	player1.name = 'P1';
	player2.mark = mark.p2Mark;
	player2.name = 'P2';
	player1.initializeScore();
	player2.initializeScore();
	newGame.classList.add( 'not-show-element' );
	start.classList.remove( 'not-show-element' );
	cellsGrid.init();
	populateStorage();
} );
cpuVsPlayerButton.addEventListener( "click", function () {
	player1.mark = mark.p1Mark;
	player1.name = "P1";
	player2.mark = mark.p2Mark;
	player2.name = "CPU";
	player1.initializeScore();
	player2.initializeScore();
	newGame.classList.add( 'not-show-element' );
	start.classList.remove( 'not-show-element' );
	cellsGrid.init();
	computer.initialize();
	if ( player2.mark === "x" ) {
		let computerMove = computer.chooseMove();
		player2.generateClick( computerMove );
	}
	populateStorage();
} );

// dialog events
quitCancelBtn.addEventListener( "click", ( e ) => {
	if ( e.target.textContent.toLowerCase() === "quit" ) {
		// reload the page without creating a history entry
		sessionStorage.clear();
		window.location.reload();
	} else {
		dialog.reset();
		dialog.close();
		populateDialogStorage();
	}
} );
roundRestartBtn.addEventListener( "click", () => {
	restartNewRound();
	dialog.reset();
	dialog.close();
	populateDialogStorage();
} );
restartBtn.addEventListener( "click", () => {
	dialog.configure( "restart" )
	dialog.show();
	populateDialogStorage();
} );

dialogBox.addEventListener( "submit", ( e ) => {
	e.preventDefault();
} );

//session storage events
window.addEventListener( "load", () => {
	if ( sessionStorage.length ) {
		setStyle();
	}
} );