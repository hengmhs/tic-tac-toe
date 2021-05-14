// Player factories

const Player = (name, symbol) => {
	return { name, symbol}
}

// gameController Module with IIFE -> Immediately Invoked Function Expression
const gameController = (() => {
	let p1 = Player(document.getElementById('p1').value, 'X');
	//let p2 = Player(document.getElementById('p2').value, 'O');
	console.log(p1);
	let currentPlayer = p1;

	const nextTurn = () => {
		console.log(p1);
		if(currentPlayer === p1){
			console.log(p2);
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

	const resetGame = () => {
		document.getElementById('startbtn').innerHTML = 'Reset';
		p1 = Player(document.getElementById('p1').value, 'X');
		p2 = Player(document.getElementById('p2').value, 'O');
		currentPlayer = p1;
		console.log(p1);
		console.log(p2);
		gameBoard.resetBoard();
		displayController.renderBoard();
		displayController.updateGameStatus();
	}

	const checkGameStatus = () => {
		if(gameBoard.isGameOver()){
			return currentPlayer.name + ' wins!';
		}
		else if(gameBoard.isTie()){
			return 'Tie';
		}
		else{
			return '';
		}
	}

	return { currentPlayer , nextTurn, getCurrent, resetGame, checkGameStatus};
})();

// Gameboard Module

const gameBoard = (() => {
	let empty = ' ';
	let board = [[' ',' ',' '],
				 [' ',' ',' '],
				 [' ',' ',' ']];
	const getBoard = () => {
		return board;
	}
	const resetBoard = () => {
		// assigning board to empty board will cause both variables to point at the same array
		board = [[' ',' ',' '],
				 [' ',' ',' '],
				 [' ',' ',' ']];
	}
	const changeValue = (val, symbol) => {
		board[val[0]][val[1]] = symbol;
	}
	const isGameOver = () => {
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
	const isTie = () => {
		for(let row of board){
			for(let element of row){
				if(element === gameBoard.empty){
					return false;
				};
			}
		}
		// is a tie if every element is empty and the game is not yet over
		if(!isGameOver()){
			return true;
		}
	}
		
	return { getBoard, changeValue, isGameOver, empty, resetBoard, isTie };
})();



// displayController Module

const displayController = (() => {
	// gets each td in displayBoard
	let displayBoard = document.getElementById('displayBoard')
	let tdList = displayBoard.querySelectorAll('td');
	const updateGameStatus = () => {
		let msg = document.getElementById('msg');
		msg.innerHTML = (gameController.checkGameStatus());
	}
	const clickSquare = (event) => {
		// id of td element
		const position = event.target.id;
		gameBoard.changeValue(position, gameController.getCurrent().symbol);
		renderBoard();
		updateGameStatus();
		gameController.nextTurn();
	}
	const renderBoard = () => {
		let counter = 0;
		for(let row of gameBoard.getBoard()) {
			for(let td of row){
				tdList[counter].innerHTML = td;
				tdList[counter].addEventListener('click', clickSquare);
				// if the square is already filled or game over
				if(td !== gameBoard.empty || gameBoard.isGameOver()){
					tdList[counter].removeEventListener('click', clickSquare);
				}
				counter++;
			}
		} 
	}
	return { displayBoard, renderBoard, updateGameStatus};
})();


