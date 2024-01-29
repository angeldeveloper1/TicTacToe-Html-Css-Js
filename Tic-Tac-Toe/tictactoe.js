// Selecting all the game cells, notification area, restart button, background music, and toggle button
const cells = document.querySelectorAll('.js-game-cell');
const notifications = document.querySelector('.js-game-notification');
const restartButton = document.querySelector('.js-game-restart');
const backgroundMusic = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-button');

// Variable to track whether audio is playing
let isAudioPlaying = false;
// Variable to track the current player (initially 'X')
let currentPlayer = 'X';
// Array to represent the game board state
let gameBoard = ["","","","","","","","",""];
// Variable to track whether the game is active
let gameActive = true;
// Setting initial notification message
notifications.textContent =`Turno de ${currentPlayer}`;
// Array of winning combinations
const winCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
// Adding a click event listener to each game cell
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});
// Function to handle the click on a game cell
function handleCellClick(event){
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);
  // Checking if the clicked cell is empty and the game is active
  if (gameBoard[cellIndex] === "" && gameActive){
    // Updating the game state and cell content
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("cell-filled");
    // Checking for a win or a draw
    if (checkWin(currentPlayer)){
      gameActive=false;
      notifications.textContent = `El ganador es ${currentPlayer}!`;
    } else if (isBoardFull()){
      gameActive=false;
      notifications.textContent = "Es un empate!"
    }else {
      // Switching to the next player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      notifications.textContent = `Turno de ${currentPlayer}!`;
    }
  }
}
// Function to check if a player has won
function checkWin(player){
  return winCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === player);
  });
}
// Function to check if the game board is full (draw)
function isBoardFull(){
  return gameBoard.every(cell => cell!=="");
}
// Adding a click event listener to the restart button
restartButton.addEventListener("click", restartGame);
// Function to restart the game
function restartGame(){
  // Resetting game variables and board state
  gameBoard = ["","","","","","","","",""];
  gameActive = true;
  currentPlayer="X";
  notifications.textContent = `Turno de ${currentPlayer}`;
  // Resetting cell content and styles
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("cell-filled");
  });
}
// Adding a click event listener to the toggle button
toggleButton.addEventListener('click', ()=> {
  // Toggling background music on/off
  if (isAudioPlaying){
    backgroundMusic.pause();
    toggleButton.textContent = 'OFF';
    toggleButton.classList.add('red-button');
    toggleButton.classList.remove('green-button');
  } else {
    backgroundMusic.play();
    toggleButton.textContent = 'ON';
    toggleButton.classList.add('green-button');
    toggleButton.classList.remove('red-button');
  }
  isAudioPlaying = !isAudioPlaying;
});