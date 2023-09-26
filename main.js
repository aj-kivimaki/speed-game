/* - - - ELEMENTS - - - */
const startButtonElem = document.querySelector("#start-button");
const endButtonElem = document.querySelector("#end-button");
const circleElems = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modalDisplay = document.querySelector("#overlay");
const closeModalElem = document.querySelector("#close-overlay");

/* - - - GLOBAL VARIABLES - - - */
let score = 0;
let timer = 0;
let pace = 800;
let current = 0;
let rounds = 0;
let highScore = JSON.parse(localStorage.getItem("highScore")) || 0;

// const gameResultElem = document.querySelector("#game-result");

/* - - - FUNCTIONS - - - */
const playGame = () => {
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
  resetGame();
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
const resultsOverlay = () => overlayElem.classList.remove("hide");

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* const generateRandomMushroom = (newActiveNumber) => {
  const randomCircle = document.querySelector(`#circle${newActiveNumber}`);
  randomCircle.innerHTML = `<img class="mushroom-img" src="pics/mushroom-${newActiveNumber}.png" alt="mushroom" />`;
}; */

//   score > 1
//     ? (gameResultElem.innerHTML = `You have only ${score} mushrooms.
//     Don't eat the red ones!`)
//     : (gameResultElem.innerHTML = `You have only ${score} mushroom.`);
// };

/* - - - EVENT LISTENERS - - - */
startButtonElem.addEventListener("click", playGame);
endButtonElem.addEventListener("click", endGame);
closeModalElem.addEventListener("click", endGame);
circleElems.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
}); // pass the index of each circle in to the clickCircle function

/* const savehighScore = () => {
  if (score > highScore) {
    localStorage.setItem("highScore", JSON.stringify({ highScore: score }));
  }
}; */
