// mark OBJECT
const markPrototype = {
	updateMark() {
		if ( this.btnX.classList.contains( 'active-mark-button' ) ) {
			this.p1Mark = 'x';
			this.p2Mark = 'o';
		} else {
			this.p2Mark = 'x';
			this.p1Mark = 'o';
		}
	},
	switch () {
		this.btnX.classList.toggle( 'active-mark-button' );
		this.btnO.classList.toggle( 'active-mark-button' );
		this.updateMark();
	},
};
// Mark constructor function
function Mark() {
	this.p1Mark = 'x';
	this.p2Mark = 'o';
	this.btnX = document.querySelector( '#x-choice-button' );
	this.btnO = document.querySelector( '#o-choice-button' );
}
Mark.prototype = markPrototype;
Mark.prototype.constructor = Mark;

// Player OBJECT
const playerPrototype = {
	updateScore() {
		let scoreString = this.score.toString();
		if ( this.score < 10 ) {
			scoreString = '0' + scoreString;
		}
		this.scoreCell.querySelector( '.score' )
			.textContent = scoreString;
	},
	initializeScore() {
		if ( this.mark === 'x' ) {
			this.scoreCell = document.querySelector( '#x-score' );
		} else {
			this.scoreCell = document.querySelector( '#o-score' );
		}
		this.scoreCell.querySelector( 'p span' )
			.textContent = this.name;
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
	switch () {
		let thirdRecipe;
		thirdRecipe = this.currentTurn;
		this.currentTurn = this.previousTurn;
		this.previousTurn = thirdRecipe;
		this.show();
	},
	show() {
		let markPrevious = this.previousTurn.toUpperCase();
		let markCurrent = this.currentTurn.toUpperCase();
		this[ 'icon' + markCurrent ].classList.remove( 'not-show-element' );
		this[ 'icon' + markPrevious ].classList.add( 'not-show-element' );
	},
	reset() {
		this.currentTurn = 'x';
		this.previousTurn = 'o';
		this.show();
	},
};

function Turn() {
	this.currentTurn = 'x';
	this.previousTurn = 'o';
	this.iconX = document.querySelector( '.turn .icon-x' );
	this.iconO = document.querySelector( '.turn .icon-o' );
}
Turn.prototype = turnPrototype;
Turn.prototype.constructor = Turn;
// CELL OBJECT
const cellPrototype = {
	markAsWinner() {
		let shownIcon = this.element.querySelector( `.icon-${this.marked}` );
		this.element.style.backgroundColor = shownIcon.querySelector( "path" )
			.getAttribute( "fill" );
		shownIcon.querySelector( "path" )
			.setAttribute( "fill", "rgba(31, 54, 65)" );
	},

	addClickEvent() {
		this.clickEventHandler = this.clickEventHandler.bind( this );
		this.element.addEventListener( "click", this.clickEventHandler, false );
	},
	removeClickEvent() {
		this.element.removeEventListener( "click", this.clickEventHandler, false );
	},
	activateHoverEvent() {
		// checking if the device has pointer
		if ( matchMedia( '(pointer:fine)' )
			.matches || matchMedia( '(pointer:coarse)' )
			.matches ) {
			this.hoverEventHandler = this.hoverEventHandler.bind( this );
			this.element.addEventListener( "mouseenter", this.hoverEventHandler, false );
			this.element.addEventListener( "mouseleave", this.hoverEventHandler, false );
		}

	},
	deactivateHoverEvent() {
		// console.log( this.hoverEvent.mouseenterFunction );
		this.element.removeEventListener( "mouseenter", this.hoverEventHandler, false );
		this.element.removeEventListener( "mouseleave", this.hoverEventHandler, false );
	},
	resetCell() {
		this.deactivateHoverEvent();
		this.showCellMark();
		this.addClickEvent();
		this.resetCellBackgroundAndSvgsFill();

	},
	resetCellBackgroundAndSvgsFill() {
		let listOfIcons = this.element.querySelectorAll( "svg" );
		for ( [ key, value ] of listOfIcons.entries() ) {
			if ( value.classList.contains( "icon-x" ) ) {
				value.querySelector( "path" )
					.setAttribute( "fill", "#31C3BD" );
			} else if ( value.classList.contains( "icon-o" ) ) {
				value.querySelector( "path" )
					.setAttribute( "fill", "#F2B137" );
			}
		}
		this.element.removeAttribute( "style" );
	},
	showCellMark( mark ) {
		// reset: hiding all icons in this cell
		let listOfIcons = this.element.querySelectorAll( "svg" );
		for ( [ key, value ] of listOfIcons.entries() ) {
			value.classList.add( "not-show-element" );
		}
		if ( mark ) {
			//making visible only the correspondent icon
			let icon = event.currentTarget.querySelector( `.icon-${mark}` );
			icon.classList.remove( "not-show-element" )
		}

	},
};

function Cell( id ) {
	this.marked = "";
	this.id = id;
	// \\3 must precede the id or var if you start it with a number
	this.element = document.querySelector( `#\\3${this.id}` );
	this.hoverEventHandler = function ( event ) {
		event.stopPropagation();
		event.preventDefault();
		let markToShow
		switch ( event.type ) {
		case "mouseenter":
			markToShow = `outline-${this.marked}`
			break;
		case "mouseleave":
			markToShow = this.marked;
			break;
		}
		this.showCellMark( markToShow );
	};
	this.clickEventHandler = function ( event ) {
		event.stopPropagation();
		event.preventDefault();
		// Using this if-statement to fix the clicking twice bug
		if ( !cellsGrid.allCellsId.includes( event.currentTarget.id ) ) {
			restartBtn.removeAttribute( "disabled" );
			this.showCellMark( turn.currentTurn );
			this.marked = turn.currentTurn;
			cellsGrid.clickCentinel( this.marked, this.playerName, this.id )
			turn.switch();
			this.activateHoverEvent();
			this.removeClickEvent();
		}
	}
}
Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell;

// CellsGrid Object
const cellsGridPrototype = {
	init() {
		let cellArrayPosition;
		const cellElements = document.querySelectorAll( "#start #cells > div" );
		for ( [ key, cellElement ] of cellElements.entries() ) {
			const cell = new Cell( cellElement.id );
			cell.element = cellElement;
			cell.addClickEvent();
			cellArrayPosition = Number( cellElement.id ) - 1;
			this.cells.splice( cellArrayPosition, 1, cell );
		}
		this.xCells.playerName = player1.mark === "x" ? player1.name : player2.name;
		this.oCells.playerName = player1.mark === "o" ? player1.name : player2.name;
	},
	clickCentinel( mark, name, cellId ) {
		this.totalClicks++
		this.allCellsId.push( cellId );
		switch ( mark ) {
		case "x":
			this.xCells.ids.push( Number( cellId ) );
			break;
		case "o":
			this.oCells.ids.push( Number( cellId ) );
			break;
		}
		this.winnerCentinel( mark );
	},
	winnerCentinel( markToCheck ) {
		initialArray = this[ `${markToCheck}Cells` ].ids.map( ( x ) => x );
		let finalArray = [];
		let length = initialArray.length;
		let sum = initialArray.reduce( ( previous, current ) => previous + current );
		if ( ( length === 3 ) && ( sum === 15 ) ) {
			finalArray = initialArray.map( x => x );
			this.summary( markToCheck, finalArray );
			return;
		}
		if ( length > 3 ) {
			if ( length === 4 ) {
				var matriz = [ [ 0, 1, 3 ], [ 0, 2, 3 ], [ 1, 2, 3 ] ];
			} else {
				matriz = [ [ 0, 1, 4 ], [ 0, 2, 4 ], [ 0, 3, 4 ], [ 1, 2, 4 ], [ 1, 3, 4 ], [ 2, 3, 4 ] ];
			}
			for ( let matrizElem of matriz ) {
				for ( let value of matrizElem ) {
					finalArray.push( this[ `${markToCheck}Cells` ].ids[ value ] );
				}
				console.log( `finalArray: ${finalArray}` );
				sum = finalArray.reduce( ( previous, current ) => previous + current );
				console.log( `sum: ${sum}` );
				if ( sum === 15 ) {
					this.summary( markToCheck, finalArray );
					return;
				} else {
					finalArray = [];

				}
			}
			if ( this.totalClicks === 9 ) {
				this.summary();
				return;
			}

		}
	},
	summary( markWon = "", winnerCells = [] ) {
		switch ( markWon ) {
		case "x":
			this.won.mark = "x";
			this.won.playerName = this.xCells.playerName;
			this.won.cellsId = winnerCells.map( ( x ) => x );
			break;
		case "o":
			this.won.mark = "o";
			this.won.playerName = this.oCells.playerName;
			this.won.cellsId = winnerCells.map( ( x ) => x );
			break;
		default:
			this.tiesScore++;
		}
		this.markWinnerCells( this.won.cellsId );
		dialogBox.show();
		this.showDialog();
		this.manageUpdateScore();
	},
	manageUpdateScore() {
		let player = this.won.playerName;
		switch ( player ) {
		case player1.name:
			player1.score++
			player1.updateScore();
			break;
		case player2.name:
			player2.score++
			player2.updateScore();
			break;
		default:
			console.log( "default" );
			const tieScoreSlot = document.querySelector( "#start #ties" )
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
		if ( mark === "" ) {
			configurePoppupDialog( "tied" );
		}
		switch ( player ) {
		case "P1":
			if ( mark === "x" ) {
				if ( player2.name === "CPU" ) {
					configurePoppupDialog( "won-X" );
				} else {
					configurePoppupDialog( "player1-X" );
				}
			} else if ( mark === "o" ) {
				if ( player2.name === "CPU" ) {
					configurePoppupDialog( "won-O" );
				} else {
					configurePoppupDialog( "player1-O" );
				}
			}
			break;
		case "P2":
			if ( mark === "x" ) {
				configurePoppupDialog( "player2-X" );
			} else if ( mark === "o" ) {
				configurePoppupDialog( "player2-O" );
			}
			break;
		case "CPU":
			if ( mark === "x" ) {
				configurePoppupDialog( "lost-X" );
			} else if ( mark === "o" ) {
				configurePoppupDialog( "lost-O" );
			}
			break;
		}
	},

	resetGrid() {
		for ( cellElement of this.cells ) {
			cellElement.resetCell();
		}
		this.won.cellsId = [];
		this.won.playerName = "";
		this.won.mark = "";
		this.xCells.ids = [];
		this.oCells.ids = [];
		this.totalClicks = 0;
		this.allCellsId = [];
	},
	markWinnerCells( cellsIds ) {
		for ( cellId of cellsIds ) {
			let pos = cellId - 1;
			this.cells[ pos ].markAsWinner();
		}

	},

	deactivateCellsClick() {}
};

function CellsGrid() {
	this.xCells = {
		playerName: "",
		ids: []
	};
	this.oCells = {
		playerName: "",
		ids: []
	};
	this.won = {
		playerName: "",
		cellsId: [],
		mark: ""
	};
	this.cells = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	this.totalClicks = 0;
	this.tiesScore = 0;
	this.allCellsId = [];
}

CellsGrid.prototype = cellsGridPrototype;
CellsGrid.prototype.constructor = CellsGrid;
// DIALOG
function configurePoppupDialog( kind ) {
	switch ( kind ) {
	case type.first:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "1";
		iconX.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = iconX.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.second:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "1";
		iconO.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconO.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.third:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "2";
		iconX.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconX.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.fourth:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "2";
		iconO.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconO.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.fifth:
		won.classList.remove( 'not-show-element' );
		iconX.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconX.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.sixth:
		console.log( won );
		won.classList.remove( 'not-show-element' );
		console.log( won );
		iconO.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconO.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.seventh:
		lost.classList.remove( 'not-show-element' );
		iconX.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconX.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.eighth:
		lost.classList.remove( 'not-show-element' );
		iconO.classList.remove( 'not-show-element' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color =
			iconO.querySelector( 'path' )
			.getAttribute( "fill" );
		break;
	case type.nineth:
		iconContainer.classList.add( 'not-show-element' );
		restart.classList.remove( 'not-show-element' );
		break;
	case type.tenth:
		iconContainer.classList.add( 'not-show-element' );
		tied.classList.remove( 'not-show-element' );
		break;
	}
	if ( kind === type.nineth ) {
		quitCancelBtn.classList.replace( 'quit-btn', 'quit-resize' );
		roundRestartBtn.classList.replace(
			'nextround-restart-btn',
			'next-round-resize'
		);
		quitCancelBtn.querySelector( 'h5' )
			.textContent = 'no, cancel';
		roundRestartBtn.querySelector( 'h5' )
			.textContent =
			'yes, restart';
	} else {
		quitCancelBtn.classList.replace( 'quit-resize', 'quit-btn' );
		roundRestartBtn.classList.replace(
			'next-round-resize',
			'nextround-restart-btn'
		);
		quitCancelBtn.querySelector( 'h5' )
			.textContent = 'quit';
		roundRestartBtn.querySelector( 'h5' )
			.textContent = 'next round';
	};
}

function resetDialog() {
	const dialogElemList = document.querySelectorAll( "#dialog-box p, #dialog-box h3, #dialog-box svg" );
	for ( let [ key, entrie ] of dialogElemList.entries() ) {
		entrie.classList.add( 'not-show-element' );
	};
	iconContainer.classList.remove( 'not-show-element' );
}
// dialog initializing
const dialogBox = document.querySelector( "#dialog-box" );
// head
const playerWonLost = document.querySelector( '#dialog-box #player-won-lost' );
const won = document.querySelector( '#dialog-box #won' );
const lost = document.querySelector( '#dialog-box #lost' );
// main take a round
const iconContainer = document.querySelector( "#msg-body .icon-container" );
const iconX = document.querySelector( '#dialog-box #icon-x' );
const iconO = document.querySelector( '#dialog-box #icon-o' );
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
// Initialize
// pages
const newGame = document.querySelector( '#new-game' );
const start = document.querySelector( '#start' );
// creating mark object
const mark = new Mark();
// creating player objects
const player1 = new Player();
const player2 = new Player();
// creating Turn OBJECT
const turn = new Turn();
// creating cellsGrid OBJECT to group and manage the cells all
const cellsGrid = new CellsGrid();
//adding event to choose the player1's mark
for ( let button of [ mark.btnX, mark.btnO ] ) {
	button.addEventListener( 'click', () => mark.switch() );
}

// player vs player addEventListener
const playerVsPlayerButton = document.querySelector(
	'#player1-vs-player2-button'
);

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
} );
// dialog events
quitCancelBtn.addEventListener( "click", ( e ) => {
	if ( e.target.textContent.toLowerCase() === "quit" ) {
		// reload the page without creating a history entry
		window.location.replace( window.location.pathname + window.location.search + window.location.hash )
	} else {
		dialogBox.close();
	}
} );
roundRestartBtn.addEventListener( "click", () => {
	restartNewRound();
	dialogBox.close();
} )
dialogBox.addEventListener( "close", () => {
	resetDialog();
} );
//reset
const restartBtn = document.getElementById( "restart-button" );

function restartNewRound() {
	cellsGrid.resetGrid();
	turn.reset();
	restartBtn.setAttribute( "disabled", "" );
}
restartBtn.addEventListener( "click", () => {
	dialogBox.show();
	configurePoppupDialog( "restart" )
} );