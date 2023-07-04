// Choices
const choices = ["rock", "paper", "scissors"];
const choicesMap = {
  rock: '<i class="fa-solid fa-hand-back-fist" style="color: #00203fff;"></i>',
  paper: '<i class="fa-solid fa-hand" style="color: #00203fff;"></i>',
  scissors: '<i class="fa-solid fa-hand-scissors" style="color: #00203fff;"></i>'
};

// Get Dom Elements
const playerPick = document.getElementById("player-choice");
const computerPick = document.getElementById("cpu-choice");
const yourScore = document.getElementById("player-score");
const cpuScore = document.getElementById("cpu-score");
const restartGame = document.getElementById("restart-button");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const message = document.getElementById("message");
const choose = document.getElementById("choose");

const WIN_MESSAGES = [
  "Congratulations! You won!",
  "You win! What a hero!",
  "WooHoo",
  "Wow so Impressive!",
  "The Computer Never Stood a Chance!",
  "Winner Winner Winner"
];

const LOSE_MESSAGES = [
  "The Computer Cheated",
  "So unlucky",
  "Better luck next time",
  "Try again, you'll win this time",
  "Oh No, You Lost 😞"
];

const MAX_MOVES = 5;
let playerScore = 0;
let computerScore = 0;

// Function to render the player or computer choice
function renderChoice(isPlayer, choice) {
  const element = isPlayer ? playerPick : computerPick;
  element.innerHTML = choicesMap[choice];
  console.log(choice);
}

// Function to handle computer choice
function computerTurn() {
  let cTurn = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[cTurn];
  computerPick.innerHTML = choicesMap[computerChoice];
  return computerChoice;
}

// Function to handle gameplay

function gamePlay(event) {
  const playerChoice = this.dataset.choice;
  const computerChoice = computerTurn();
  renderChoice(true, playerChoice);
  renderChoice(false, computerChoice);
  const moveResult = checkMoveResult(playerChoice, computerChoice);
  renderMoveResult(moveResult);
  checkIfGameEnd();
}


// Function to pick a message to display
function pickMessage(win) {
  const messageList = win ? WIN_MESSAGES : LOSE_MESSAGES;
  const index = Math.floor(Math.random() * messageList.length);
  return messageList[index];
}

// Function to check the result of the move

function checkMoveResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

// Function to render the move result

function renderMoveResult(moveResult) {
  if (moveResult === "win") {
    handleWin();
  } else if (moveResult === "lose") {
    handleLoss();
  } else {
    handleDraw();
  }
}

// Function to handle the player winning the round

function handleWin() {
  const winMessage = pickMessage(true);
  message.textContent = winMessage;
  playerScore++;
  yourScore.textContent = "Player Score: " + playerScore;
  playerPick.style.borderColor = "green";
  computerPick.style.borderColor = "red";
  checkIfGameEnd();
}

// Function to handle the player losing the round

function handleLoss() {
  const loseMessage = pickMessage(false);
  message.textContent = loseMessage;
  computerScore++;
  cpuScore.textContent = "Computer Score: " + computerScore;
  playerPick.style.borderColor = "red";
  computerPick.style.borderColor = "green";
  checkIfGameEnd();
}

// Function to handle a draw

function handleDraw() {
  message.textContent = "A Draw! Everybody Loses!";
  playerPick.style.borderColor = "black";
  computerPick.style.borderColor = "black";
  checkIfGameEnd();
}

// Function to check if the game has ended

function checkIfGameEnd() {
  if (playerScore === MAX_MOVES || computerScore === MAX_MOVES) {
    endGame();
  }
}

// Function to end the game

function endGame() {
  restartGame.style.display = "block";
  disableButtons();
  let gameResultMessage;
  if (playerScore === MAX_MOVES) {
    gameResultMessage = "Congratulations! You won the game!";
  } else {
    gameResultMessage = "The computer won the game!";
  }
  message.textContent = gameResultMessage;
  choose.innerHTML = "<p>Game Over!</p>";
}

// Function to disable the choice buttons

function disableButtons() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
}

// Function to reset the game

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerPick.style.borderColor = "#adefd1ff";
  playerPick.innerHTML = "<p>Your Pick</p>";
  computerPick.style.borderColor = "#adefd1ff";
  computerPick.innerHTML = "<p>Computer Pick</p>";
  yourScore.textContent = "Player Score: " + playerScore;
  cpuScore.textContent = "Computer Score: " + computerScore;
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
  restartGame.style.display = "none";
  message.textContent = "Rock Beats Scissors, Scissors Beats Paper, Paper Beats Rock";
  choose.innerHTML = "<p>Choose Rock, Paper, or Scissors</p>";
}

// Event listeners for choice buttons

document.querySelectorAll(".hand").forEach((element) => {
  element.addEventListener("click", gamePlay);
});

// Event listener for the button to play again

restartGame.addEventListener("click", resetGame);