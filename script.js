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
	let board = [['1','2','3'],
			 	 ['4','5','6'],
			 	 ['7','8','9']]
	const changeValue = (val, symbol) => {
		board[val[0]][val[1]] = symbol;
	}
	const checkGameOver = () => {
		
	}
	return { board, changeValue };
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

