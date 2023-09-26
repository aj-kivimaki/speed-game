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
let current = 0;
let rounds = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

// display high score
highScoreDisplay.textContent = highScore;

/* - - - FUNCTIONS - - - */
const playGame = () => {
  if (rounds >= 3) return endGame();
  rounds++;

  enableEvents();
  switchButtons();

  const newActiveNumber = picNewNumber(current);

  generateRandomMushroom(newActiveNumber, current);

  current = newActiveNumber;
  timer = setTimeout(playGame, pace);

  pace -= 10;

  function picNewNumber(current) {
    const newActiveNumber = getRandomNumber(0, 3);
    return newActiveNumber === current
      ? picNewNumber(current)
      : newActiveNumber;
  }
};

const endGame = () => {
  clearTimeout(timer);
  gameResult(score);
  showModal();
};

const clickCircle = (index) => {
  if (index !== current) return endGame();
  rounds--;
  if (index === current && index === 3) score++;
  renderScore();
};

const enableEvents = () => {
  circleElems.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const showModal = () => modalDisplay.classList.remove("hide");
const resetGame = () => location.reload();
const renderScore = () => (scoreDisplay.textContent = score);
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const switchButtons = () => {
  startButtonElem.classList.add("hide");
  endButtonElem.classList.remove("hide");
};

const gameResult = (score) => {
  let result = "";
  if (score === 0) {
    result = "What's wrong with you? You didn't get any mushrooms!";
  } else if (score > 0 && score < 5) {
    result = `You are so slow! You got only ${score} mushrooms.`;
  } else if (score >= 5 && score < 10) {
    result = `Not bad, ${score} mushrooms.`;
  } else {
    result = `You are quite quick! You got ${score} mushrooms.`;
  }
  saveHighScore(score);
  gameResultElem.textContent = result;
};

const generateRandomMushroom = (newActiveNumber, current) => {
  circleElems[
    newActiveNumber
  ].innerHTML = `<img class="mushroom-img" src="pics/mushroom-${newActiveNumber}.png" alt="mushroom" />`;
  circleElems[current].innerHTML = "";
};

const saveHighScore = (score) => {
  if (score > highScore) localStorage.setItem("highScore", score);
};

/* - - - EVENT LISTENERS - - - */
startButtonElem.addEventListener("click", playGame);
endButtonElem.addEventListener("click", endGame);
closeModalElem.addEventListener("click", resetGame);
circleElems.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
});
