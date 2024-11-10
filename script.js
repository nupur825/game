const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  if (checkWin()) {
    statusText.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.innerText = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameState = Array(9).fill("");
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerText = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
