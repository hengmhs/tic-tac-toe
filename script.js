// Player factories

const Player = (name, symbol) => {
	return { name, symbol}
}

let p1 = Player('John', 'X');
let p2 = Player('Jane', 'O');

// gameController Module with IIFE -> Immediately Invoked Function Expression
const gameController = (() => {
	let currentPlayer = p1;
	const nextTurn = () => {
		if(currentPlayer === p1){
			currentPlayer = p2;
		} else {
			currentPlayer = p1;
		}
	}
	// IIFE variables have to be accessed via methods to see changes
	// After nextTurn() is called, cannot directly access gameController.currentPlayer
	// use gameController.getCurrent()
	const getCurrent = () => {
		return currentPlayer;
	}
	return { currentPlayer , nextTurn, getCurrent};
})();

// Gameboard Module

const gameBoard = (() => {
	let board = [[' ',' ',' '],
			 	 [' ',' ',' '],
			 	 [' ',' ',' ']]
	const changeValue = (val, symbol) => {
		board[val[0]][val[1]] = symbol;
	}
	const isGameOver = () => {
		let empty = ' ';
		for(let i = 0; i < 3; i++){
			// check horizontal
			// if every element of the row is equal to the first item in the row
			if(board[i].every((elem) => (elem === board[i][0]) && elem != empty)){
				return true;
			}

			// check vertical
			let column = [];
			// keep 2nd index constant, change 1st index
			// e.g. 00, 10, 20 -> column
			for(let j = 0; j < 3; j++){
				column.push(board[j][i]);
			}
			if(column.every((elem) => (elem === column[0]) && elem != empty)){
				return true;
			}

			// check diagonals
			if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != empty){
				return true;
			}

			if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != empty){
				return true;
			}
		}
			return false;
	}
	return { board, changeValue, isGameOver };
})();



// displayController Module

const displayController = (() => {
	// gets each td in displayBoard
	let displayBoard = document.getElementById('displayBoard')
	let tdList = displayBoard.querySelectorAll('td');
	const clickSquare = (event) => {
		// id of td element
		const position = event.target.id;
		gameBoard.changeValue(position, gameController.getCurrent().symbol);
		gameController.nextTurn();
		renderBoard();
		console.log(gameBoard.isGameOver());
	}
	const renderBoard = () => {
		let counter = 0;
		for(let row of gameBoard.board) {
			for(let td of row){
				tdList[counter].innerHTML = td;
				tdList[counter].addEventListener('click', clickSquare);
				counter++;
			}
		} 
	}
	return { displayBoard, renderBoard};
})();

displayController.renderBoard();

