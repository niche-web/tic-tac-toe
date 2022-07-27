// MARK OBJECT
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

// ==========================================================================
// PLAYER OBJECT
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
	//For CPU user
	generateClick( id ) {
		if ( player2.name === "CPU" ) {
			document.getElementById( `${id}` )
				.click();
		}
	},
	reset() {
		this.track = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
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

// ==============================================================================
// TURN OBJECT
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

// ============================================================================
// CELL OBJECT
const cellPrototype = {
	markAsWinner() {
		this.element.classList.add( `cell-background-win-${this.marked}` )
	},

	addClickEvent() {
		this.clickEventHandler = this.clickEventHandler.bind( this );
		this.element.addEventListener( "click", this.clickEventHandler, false );
	},
	removeClickEvent() {
		this.element.removeEventListener( "click", this.clickEventHandler, false );
	},
	resetCell() {
		this.addClickEvent();
		this.resetCellBackground();
		this.marked = "";
	},
	resetCellBackground() {
		this.element.removeAttribute( "class" );
	},
	showCellMark( mark ) {
		this.element.classList.add( `cell-background-${this.marked}` );

	},
};

function Cell( id, element ) {
	this.marked = "";
	this.id = id;
	this.element = element;
	this.clickEventHandler = function ( event ) {
		event.stopPropagation();
		event.preventDefault();
		// Using this if-statement to fix the clicking twice bug
		if ( !cellsGrid.allCellsId.includes( event.currentTarget.id ) ) {
			this.marked = turn.currentTurn;
			restartBtn.removeAttribute( "disabled" );
			this.showCellMark();
			cellsGrid.clickCentinel( this.marked, this.playerName, Number( this.id ) )
			this.removeClickEvent();
			if ( player2.name === "CPU" ) {
				computer.anotate();
			}
			turn.switch();
		}
		// managing computer move
		if ( player2.name === "CPU" ) {
			if ( computer.isItMyTurn() ) {
				let computerMove = computer.chooseMove();
				player2.generateClick( computerMove );
			}
		}
	}
}
Cell.prototype = cellPrototype;
Cell.prototype.constructor = Cell;

// ===========================================================================
// CELLSGRID OBJECT
const cellsGridPrototype = {
	init() {
		let cellArrayPosition;
		const cellElements = document.querySelectorAll( "#start #cells > div" );
		for ( [ key, cellElement ] of cellElements.entries() ) {
			const cell = new Cell( cellElement.id, cellElement );
			cell.addClickEvent();
			cellArrayPosition = Number( cellElement.id ) - 1;
			this.cells.splice( cellArrayPosition, 1, cell );
		}
	},
	clickCentinel( mark, name, cellId ) {
		this.totalClicks++
		this.allCellsId.push( cellId );

		// update players track arrays
		if ( mark === player1.mark ) {
			this.combinations.forEach( ( e, i ) => {
				if ( e.includes( cellId ) ) {
					player1.track[ i ]++;
				}
			} );
		} else if ( mark === player2.mark ) {
			this.combinations.forEach( ( e, i ) => {
				if ( e.includes( cellId ) ) {
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
		let player1TrackIndex = player1.track.includes( 3 ) ? player1.track.findIndex( ( x ) => x === 3 ) : false;
		let player2TrackIndex = player2.track.includes( 3 ) ? player2.track.findIndex( ( x ) => x === 3 ) : false;
		let tiedGame = !this.tiesTrack()
			.includes( 0 );
		if ( player1TrackIndex ) {
			this.won.playerName = player1.name;
			this.won.mark = player1.mark;
			this.won.cellsId = this.combinations[ player1TrackIndex ];
			player1.score++;
			this.summary( this.won )
			return;
		} else if ( player2TrackIndex ) {
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
		dialogBox.show();
		this.showDialog();
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
		if ( player === "none" ) {
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
		this.totalClicks = 0;
		this.allCellsId = [];
		this.tiesTrack = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
	},
	markWinnerCells( cellsIds ) {
		for ( cellId of cellsIds ) {
			let pos = cellId - 1;
			this.cells[ pos ].markAsWinner();
		}
	},

	removeCellsClick() {
		for ( cell of cellsGrid.cells ) {
			cell.removeClickEvent();
		}
	},
	updateRecord() {

	}
};

function CellsGrid() {
	this.won = {
		playerName: "",
		cellsId: [],
		mark: ""
	};
	this.cells = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
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

// =====================================================================
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

		// // keeping track of the combinations used for each player
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

		} else if ( playerHaveHalfEmptyCombs || playerHaveEmptyCombs === 0 ) {

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

		} else {
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
	}
};

function Computer() {
	this.possiblePlays = [];
}

Computer.prototype = computerPrototype;
Computer.prototype.constructor = Computer;
// ==========================================================================
// DIALOG
function configurePoppupDialog( kind ) {
	switch ( kind ) {
	case type.first:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "1";
		iconContainer.classList.add( "msg-background-x" )
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
		break;
	case type.second:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "1";
		iconContainer.classList.add( 'msg-background-o' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
		break;
		ye
	case type.third:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "2";
		iconContainer.classList.add( "msg-background-x" )
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
		break;
	case type.fourth:
		playerWonLost.classList.remove( 'not-show-element' );
		playerWonLost.querySelector( '.player-number' )
			.textContent = "2";
		iconContainer.classList.add( 'msg-background-o' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
		break;
	case type.fifth:
		won.classList.remove( 'not-show-element' );
		iconContainer.classList.add( 'msg-background-x' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
		break;
	case type.sixth:
		won.classList.remove( 'not-show-element' );
		iconContainer.classList.add( 'msg-background-o' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
		break;
	case type.seventh:
		lost.classList.remove( 'not-show-element' );
		iconContainer.classList.add( 'msg-background-x' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-blue" );
		break;
	case type.eighth:
		lost.classList.remove( 'not-show-element' );
		iconContainer.classList.add( 'msg-background-o' );
		takesRound.classList.remove( 'not-show-element' );
		takesRound.style.color = cssRootStyle.getPropertyValue( "--light-yellow" );
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
	localStorage.setItem( "pageSave", inBody );
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

// ==========================================================================
// Initialize
let inBody = document.querySelector( "body" )
	.innerHTML;
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
	button.addEventListener( 'click', () => {
		console.log( "change" );
		mark.switch();
		localStorage.setItem( "pageSave", inBody )
	} );
}

// Computer constants
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

// CSS Variables
let cssRoot = document.querySelector( ":root" );
let cssRootStyle = getComputedStyle( cssRoot );

// player vs player addEventListener
const playerVsPlayerButton = document.querySelector(
	'#player1-vs-player2-button'
);

const cpuVsPlayerButton = document.querySelector( "#cpu-vs-player-button" );

const computer = new Computer();

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
	localStorage.setItem( "pageSave", inBody );
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
	localStorage.setItem( "pageSave", inBody );
} );
// dialog events
quitCancelBtn.addEventListener( "click", ( e ) => {
	if ( e.target.textContent.toLowerCase() === "quit" ) {
		// reload the page without creating a history entry
		window.location.reload();
	} else {
		resetDialog();
		dialogBox.close();
		localStorage.setItem( "pageSave", inBody );
	}
} );
roundRestartBtn.addEventListener( "click", () => {
	restartNewRound();
	resetDialog();
	dialogBox.close();
	localStorage.setItem( "pageSave", inBody );
} )
const restartBtn = document.getElementById( "restart-button" );

function restartNewRound() {
	cellsGrid.resetGrid();
	turn.reset();
	player1.reset();
	player2.reset();
	if ( computer ) {
		computer.initialize();
	}
	restartBtn.setAttribute( "disabled", "" );
	if ( player2.mark === "x" ) {
		let computerMove = computer.chooseMove();
		player2.generateClick( computerMove );
	}
}
restartBtn.addEventListener( "click", () => {
	configurePoppupDialog( "restart" )
	dialogBox.show();
	localStorage.setItem( "pageSave", inBody );
} );

// =======================================================================
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