'use strict';

// selecting buttons
const btnNewGame = document.querySelector(`.btn--new`);
const btnRollDice = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// selecting info elements
const playerSection0 = document.querySelector(`.player--0`);
const playerSection1 = document.querySelector(`.player--1`);
const totalScorePlayer0Element = document.getElementById(`score--0`);
const totalScorePlayer1Element = document.getElementById(`score--1`);
const currentScorePlayer0 = document.getElementById(`current--0`);
const currentScorePlayer1 = document.getElementById(`current--1`);
const diceImage = document.querySelector(`.dice`);

// creating global variables
const scores = [0, 0];
let playingGame, currentPlayer, currentScore;

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerSection0.classList.toggle(`player--active`);
  playerSection1.classList.toggle(`player--active`);
};

const initGame = function () {
  currentScore = 0;
  currentPlayer = 0;
  playingGame = true;
  scores[0] = 0;
  scores[1] = 0;
  totalScorePlayer0Element.textContent = 0;
  totalScorePlayer1Element.textContent = 0;
  diceImage.classList.add(`hidden`);
  playerSection0.classList.remove(`player--winner`);
  playerSection1.classList.remove(`player--winner`);
  playerSection0.classList.add(`player--active`);
  playerSection1.classList.remove(`player--active`);
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
};

initGame();

// rolling dice
btnRollDice.addEventListener(`click`, function () {
  if (playingGame) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${dice}.png`;
    diceImage.classList.remove(`hidden`);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playingGame) {
    scores[currentPlayer] += currentScore;
    console.log(scores);
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove(`player--active`);
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add(`player--winner`);
      diceImage.classList.add(`hidden`);
      document.getElementById(`current--${currentPlayer}`).textContent = 0;
      playingGame = false;
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener(`click`, initGame);
