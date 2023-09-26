/* - - - ELEMENTS - - - */
const startButtonElem = document.querySelector("#start-button");
const endButtonElem = document.querySelector("#end-button");
const circleElems = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modalDisplay = document.querySelector("#overlay");
const closeModalElem = document.querySelector("#close-overlay");
const gameResultElem = document.querySelector("#game-result");
const highScoreDisplay = document.querySelector("#high-score");

/* - - - GLOBAL VARIABLES - - - */
let score = 0;
let timer = 0;
let pace = 1000;
let currentNumber = 0;
let rounds = 0;

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

  displayRandomMushroom(newNumber, currentNumber);

  // resets the current number
  currentNumber = newNumber;

  // sets the game loop on and the speed of the game
  timer = setTimeout(playGame, pace);
  pace -= 10;
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
  score++;
  scoreDisplay.textContent = score;
  rounds--; // balances the count of missed clicks
};

// generates new random number, which is different from the one before
const getNewNumber = (currentNumber) => {
  const newNumber = getRandomNumber(0, 3);
  return newNumber === currentNumber ? getNewNumber(currentNumber) : newNumber;
};

// generates a random number
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// displays the right mushroom picture (of 4) in the right circle
// shows only one mushroom at a time
const displayRandomMushroom = (newNumber, currentNumber) => {
  circleElems[newNumber].innerHTML = `
  <img class="mushroom-img" src="pics/mushroom-${newNumber}.png" alt="mushroom" />`;
  circleElems[currentNumber].innerHTML = "";
};

// generates the result text depending on the score
const getResultText = (score) => {
  if (score === 0)
    return "What's wrong with you? You didn't get any mushrooms!";
  if (score < 5) return `You are so slow! You got only ${score} mushrooms.`;
  if (score < 10) return `Not bad, ${score} mushrooms.`;
  return `You are quite quick! You got ${score} mushrooms.`;
};

// saves in case of high score
const setHighScore = (score) => {
  if (score > highScore) localStorage.setItem("highScore", score);
};

/* - - - EVENT LISTENERS - - - */
startButtonElem.addEventListener("click", playGame);
endButtonElem.addEventListener("click", endGame);
closeModalElem.addEventListener("click", resetGame);
circleElems.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
});
