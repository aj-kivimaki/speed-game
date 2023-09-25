let score = 0;
let bestScore = JSON.parse(localStorage.getItem("bestScore")) || 0;

/* - - - ELEMENTS - - - */
const cirleOneEl = document.querySelector("#circle1");
const cirleTwoEl = document.querySelector("#circle2");
const cirleThreeEl = document.querySelector("#circle3");
const cirleFourEl = document.querySelector("#circle4");
const startButtonEl = document.querySelector("#start-button");
const closeOverlayEl = document.querySelector("#close-overlay");
const overlayEl = document.querySelector("#overlay");
const scoreEl = document.querySelector("#score");
const gameResultEl = document.querySelector("#game-result");

/* - - - FUNCTIONS - - - */
const startGame = () => {
  resetGame();
  generateRandomMushroom();
};

const resetGame = () => {
  cirleOneEl.innerHTML = "";
  cirleTwoEl.innerHTML = "";
  cirleThreeEl.innerHTML = "";
  cirleFourEl.innerHTML = "";
  score = 0;
  renderScore();
};

const updateScore = () => {
  score++;
  renderScore();
};

const renderScore = () => {
  scoreEl.innerHTML = `Mushrooms picked: ${score}`;
  score > 1
    ? (gameResultEl.innerHTML = `You have only ${score} mushrooms.
    Don't eat the red ones!`)
    : (gameResultEl.innerHTML = `You have only ${score} mushroom.`);
};

const closeOverlay = () => {
  overlayEl.classList.add("hide");
  resetGame();
};

const openOverlay = () => {
  overlayEl.classList.remove("hide");
};

const randomNumber = () => {
  return Math.floor(Math.random() * 4) + 1;
};

const generateRandomMushroom = () => {
  const randomCircle = document.querySelector(`#circle${randomNumber()}`);
  randomCircle.innerHTML = `<img class="mushroom-img" src="pics/mushroom-${randomNumber()}.png" alt="mushroom" />`;
};

const saveBestScore = () => {
  if (score > bestScore) {
    localStorage.setItem("bestScore", JSON.stringify({ bestScore: score }));
  }
};

/* - - - EVENT LISTENERS - - - */
cirleOneEl.addEventListener("click", updateScore);
cirleTwoEl.addEventListener("click", updateScore);
cirleThreeEl.addEventListener("click", updateScore);
cirleFourEl.addEventListener("click", updateScore);
startButtonEl.addEventListener("click", startGame);
closeOverlayEl.addEventListener("click", closeOverlay);
