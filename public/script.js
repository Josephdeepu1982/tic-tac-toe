const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function checkWinner() {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(Boolean)) {
    return "draw";
  }

  return null;
}

function updateStatus(result) {
  if (result === "draw") {
    statusElement.textContent = "It's a draw!";
    return;
  }

  if (result) {
    statusElement.textContent = `Player ${result} wins!`;
    return;
  }

  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function renderBoard() {
  boardElement.innerHTML = "";

  board.forEach((value, index) => {
    const button = document.createElement("button");
    button.className = "cell";
    button.type = "button";
    button.textContent = value;
    button.setAttribute("aria-label", `Cell ${index + 1}`);
    button.disabled = gameOver || Boolean(value);
    button.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(button);
  });
}

function handleMove(index) {
  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  const result = checkWinner();

  if (result) {
    gameOver = true;
    updateStatus(result);
    renderBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(null);
  renderBoard();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  updateStatus(null);
  renderBoard();
}

resetButton.addEventListener("click", resetGame);

updateStatus(null);
renderBoard();
