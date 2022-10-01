'use strict';

//Selecting Elements
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
//there are important difference between querySelector and getElementById
//but for our purpouses they are the same
//getElementByID returns a live HTML collection
//querySelector returns static node element
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


let scores, currentScore, activePlayer, playing;

const init = function () {
  //Starting Conditions

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");

}

//Rolling Dice Functionality

btnRoll.addEventListener("click", function () {
  if (playing) {//1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1 if true Swtich to the next player

    if (dice !== 1) {
      //add the dice to the score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;


    } else {
      //switch to the next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      //this would work but there is another metdot we can use
      // document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      activePlayer = activePlayer === 0 ? 1 : 0;
      //this would work but there is another metdot we can use
      // document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
      //togle method adds if the mathinbg class doesn't exist
      //and removes it if it does exist
      //!!!!!!!!!!!!we would normally use the function we created above!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!but for learning purpouses we only use that function below!!!!!!!!!!
      playerEl0.classList.toggle("player--active");
      playerEl1.classList.toggle("player--active");
    }



  }

})

btnHold.addEventListener("click", function () {

  if (playing) { //1. Add current score to the active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2 Check if the player score is >=100
    if (scores[activePlayer] >= 10) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      //Swtich player
      switchPlayer();


    }
  }
})

btnNew.addEventListener("click", init);