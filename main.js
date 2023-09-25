let score = 0;

/* - - - ELEMENTS - - - */
const cirleOneEl = document.querySelector("#circle1");
const cirleTwoEl = document.querySelector("#circle2");
const cirleThreeEl = document.querySelector("#circle3");
const cirleFourEl = document.querySelector("#circle4");
const startButtonEl = document.querySelector("#start-button");
const scoreEl = document.querySelector("#score");

/* - - - FUNCTIONS - - - */
const startGame = () => {
  score = 0;
  renderScore();
};

const updateScore = () => {
  score++;
  renderScore();
};

const renderScore = () => {
  scoreEl.innerHTML = `Score: ${score}`;
};

/* - - - EVENT LISTENERS - - - */
cirleOneEl.addEventListener("click", updateScore);
cirleTwoEl.addEventListener("click", updateScore);
cirleThreeEl.addEventListener("click", updateScore);
cirleFourEl.addEventListener("click", updateScore);
startButtonEl.addEventListener("click", startGame);
