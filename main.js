/* - - - ELEMENTS - - - */
const startButtonElem = document.querySelector("#start-button");
const endButtonElem = document.querySelector("#end-button");
const circleElems = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modalDisplay = document.querySelector("#overlay");
const closeModalElem = document.querySelector("#close-overlay");
const gameResultElem = document.querySelector("#game-result");

/* - - - GLOBAL VARIABLES - - - */
let score = 0;
let timer = 0;
let pace = 800;
let current = 0;
let rounds = 0;

// let highScore = JSON.parse(localStorage.getItem("highScore")) || 0;

/* - - - FUNCTIONS - - - */
const playGame = () => {
  startButtonElem.classList.add("hide");
  endButtonElem.classList.remove("hide");

  if (rounds >= 3) return endGame();
  enableEvents();

  const newActiveNumber = picNewNumber(current);

  circleElems[newActiveNumber].classList.toggle("active");
  circleElems[current].classList.remove("active");
  // generateRandomMushroom(newActiveNumber);

  current = newActiveNumber;
  timer = setTimeout(playGame, pace);
  rounds++;
  pace -= 10;

  function picNewNumber(current) {
    const newActiveNumber = getRandomNumber(0, 3);
    return newActiveNumber !== current
      ? newActiveNumber
      : picNewNumber(current);
  }
};

const endGame = () => {
  clearTimeout(timer);
  gameResult(score);
  modalDisplay.classList.remove("hide");
};

const clickCircle = (index) => {
  if (index !== current) return endGame();
  rounds--;
  updateScore();
  renderScore();
};

const enableEvents = () => {
  circleElems.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const resetGame = () => location.reload();
const updateScore = () => score++;
const renderScore = () => (scoreDisplay.textContent = score);
const gameResult = (score) => {
  let result = "";
  if (score < 5) {
    result = `You are slow! You have only ${score} mushrooms.`;
  } else if (score > 10) {
    result = `You are quite quick! You have ${score} mushrooms.`;
  } else {
    result = `Not bad, ${score} mushrooms.`;
  }
  gameResultElem.textContent = result;
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* - - - EVENT LISTENERS - - - */
startButtonElem.addEventListener("click", playGame);
endButtonElem.addEventListener("click", endGame);
closeModalElem.addEventListener("click", resetGame);
circleElems.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
}); // pass the index of each circle into the clickCircle function

/* const savehighScore = () => {
  if (score > highScore) {
    localStorage.setItem("highScore", JSON.stringify({ highScore: score }));
  }
}; */

/* const generateRandomMushroom = (newActiveNumber) => {
  const randomCircle = document.querySelector(`#circle${newActiveNumber}`);
  randomCircle.innerHTML = `<img class="mushroom-img" src="pics/mushroom-${newActiveNumber}.png" alt="mushroom" />`;
}; */
