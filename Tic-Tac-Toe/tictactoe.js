const cells = document.querySelectorAll('.js-game-cell');
const notifications = document.querySelector('.js-game-notification');
const restartButton = document.querySelector('.js-game-restart');
const backgroundMusic = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-button');

let isAudioPlaying = false;
let currentPlayer = 'X';
let gameBoard = ["","","","","","","","",""];
let gameActive = true;
notifications.textContent =`Turno de ${currentPlayer}`;
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

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event){
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameBoard[cellIndex] === "" && gameActive){
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("cell-filled");
    
    if (checkWin(currentPlayer)){
      gameActive=false;
      notifications.textContent = `El ganador es ${currentPlayer}!`;
    } else if (isBoardFull()){
      gameActive=false;
      notifications.textContent = "Es un empate!"
    }else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      notifications.textContent = `Turno de ${currentPlayer}!`;
    }
  }
}

function checkWin(player){
  return winCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === player);
  });
}
function isBoardFull(){
  return gameBoard.every(cell => cell!=="");
}

restartButton.addEventListener("click", restartGame);

function restartGame(){
  gameBoard = ["","","","","","","","",""];
  gameActive = true;
  currentPlayer="X";
  notifications.textContent = `Turno de ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("cell-filled");
  });
}

toggleButton.addEventListener('click', ()=> {
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