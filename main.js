/* - - - ELEMENTS - - - */
const startButtonElem = document.querySelector("#start-button");
const endButtonElem = document.querySelector("#end-button");
const circleElems = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modalDisplay = document.querySelector("#overlay");
const closeModalElem = document.querySelector("#close-overlay");
const gameResultElem = document.querySelector("#game-result");
const highScoreDisplay = document.querySelector("#high-score");
const alertMessageElem = document.querySelector("#alert-message");

/* - - - GLOBAL VARIABLES - - - */
let score = 0;
let timer = 0;
let pace = 1000;
let currentNumber = 0;
let rounds = 0;
let mushroomId = 0;

// get the high score value from the local storage and display it
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
highScoreDisplay.textContent = highScore;

/* - - - FUNCTIONS - - - */
const playGame = () => {
  // ends the game after three missed clicks
  if (rounds >= 3) return endGame();
  rounds++;

  enableEvents();
  switchButtons();

  const newNumber = getNewNumber(currentNumber);

  mushroomId = displayRandomMushroom(newNumber, currentNumber);

  // in case of poisonous mushroom
  // balances the unclicked poisonous mushroom
  if (mushroomId === 3) rounds--;

  // resets the current number
  currentNumber = newNumber;

  // sets the game loop on and the speed of the game
  timer = setTimeout(playGame, pace);
  pace -= 8;
};

// stops the game loop, displays the result and sets the high score
const endGame = () => {
  clearTimeout(timer);
  gameResultElem.textContent = getResultText(score);
  modalDisplay.classList.remove("hide");
  setHighScore(score);
};

// reloads the game (refreshes the game)
const resetGame = () => location.reload();

// enables clicking the circles when the game starts
const enableEvents = () => {
  circleElems.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

// switches the display between the start and end button
const switchButtons = () => {
  startButtonElem.classList.add("hide");
  endButtonElem.classList.remove("hide");
};

// counts and displays the score when clicking the circle with the image
const clickCircle = (index) => {
  if (index !== currentNumber) return endGame();
  if (mushroomId === 3) {
    score -= 5;
    displayScore();
    badFx.play();
    displayAlertMessage();
    setTimeout(removeAlertMessage, 1500);
    rounds--; // balances the count of missed clicks
    return;
  }
  score += 2;
  getRandomSound();
  displayScore();
  rounds--; // balances the count of missed clicks
};

const displayAlertMessage = () =>
  (alertMessageElem.textContent = "Don't pick poisonous mushrooms! -5p");

const removeAlertMessage = () => (alertMessageElem.textContent = "");

const displayScore = () => (scoreDisplay.textContent = score);

// generates new random number, which is different from the one before
const getNewNumber = (currentNumber) => {
  const newNumber = getRandomNumber(0, 3);
  return newNumber === currentNumber ? getNewNumber(currentNumber) : newNumber;
};

// generates a random number
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// displays the random mushroom picture (from 4) in the random circle
// shows only one mushroom at a time
// returns id number of the mushroom
const displayRandomMushroom = (newNumber, currentNumber) => {
  mushroomId = getRandomNumber(0, 3);
  circleElems[newNumber].innerHTML = `
  <img class="mushroom-img" src="pics/mushroom-${mushroomId}.png" alt="mushroom" draggable="false" />`;
  circleElems[currentNumber].innerHTML = "";
  return mushroomId;
};

// generates the result text depending on the score
const getResultText = (score) => {
  if (score === 0)
    return "What's wrong with you? Have you even seen a mushroom before?!";
  if (score < 10) return `You are so slow! You got only ${score} points.`;
  if (score < 20) return `Not bad, ${score} points.`;
  return `You are quite quick! You got ${score} points.`;
};

// saves in case of high score
const setHighScore = (score) => {
  if (score > highScore) localStorage.setItem("highScore", score);
};

// generate random sound between 3 sounds
const getRandomSound = () => {
  const arrIndex = getRandomNumber(0, 2);
  goodFxArr[arrIndex].play();
};

/* - - - EVENT LISTENERS - - - */
startButtonElem.addEventListener("click", playGame);
endButtonElem.addEventListener("click", endGame);
closeModalElem.addEventListener("click", resetGame);
circleElems.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
});

/* - - - SOUNDS - - - */
const goodFx1 = new Audio("./sound-effects/pick1.wav");
const goodFx2 = new Audio("./sound-effects/pick2.wav");
const goodFx3 = new Audio("./sound-effects/pick3.wav");

const goodFxArr = [goodFx1, goodFx2, goodFx3];

const badFx = new Audio("./sound-effects/oh-no.wav");
