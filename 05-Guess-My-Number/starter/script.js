'use strict';

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "🎉 Correct Number";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 23;
// console.log(document.querySelector(".guess").value;

//we use document.querySelector to select the htm element we want
//we specify the element we want to select inside the parenthesis
//we specify them with elements,id's, or with classes
//document.querySelector is not part of the javascript language
//it is part of the DOM web API
//there are many web API out there(something to keep in mind)

//addEventListener method is used for listening to events on the chosen element
//it is a special kind of method because it takes a function as its second argument
//first arguments specifies the type of event we are looking for
//second argument specifies what should be done once the event is triggered

//below we select the button with the class = ".check"
//after that we listen for a click then
//we store the value of the input field with the class=".guess" in a a variable


//we use .textContent method for selecting the content of an element
//but for selecting the content of an input field we use .value

let score = 20;
let highScore = 0;
let secretNumber = Math.trunc(Math.random() * 20 + 1);

const displayMessage = function (message) {
  document.querySelector(".message") = message;
}
const displayScore = function (score) {
  document.querySelector(".score") = score;
}
const displayNumber = function (number) {
  document.querySelector(".number") = number;
}


document.querySelector(".check").addEventListener(
  "click", function () {
    const guess = Number(document.querySelector(".guess").value);
    //whenever we get something from the user interface
    //like for example an input field
    //it is usually almost always a string
    // console.log(typeof guess);
    //we need to convert the string into a number if we want to compare it with a number;
    console.log(typeof guess, guess);
    // When there is no input
    if (!guess) {
      // document.querySelector(".message").textContent = "⛔ Not a number";
      displayMessage("⛔ Not a number");
    }
    // when the guess is correct
    else if (guess === secretNumber) {
      // document.querySelector(".message").textContent = "🎉 Correct Number!"
      displayMessage("🎉 Correct Number!");
      // document.querySelector(".score").textContent = score;
      displayScore(score);
      document.querySelector("body").style.backgroundColor = "#60b347";
      // document.querySelector(".number").textContent = secretNumber;
      displayNumber(secretNumber);
      document.querySelector(".number").style.width = "30rem";
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }

      // When the guess is wrong
    } else if (guess !== secretNumber) {
      if (score > 1) {
        // document.querySelector(".message").textContent = guess > secretNumber ? "📈 Too high" : "📉 Too low";
        displayMessage(guess > secretNumber ? "📈 Too high" : "📉 Too low");
        score--;
        // document.querySelector(".score").textContent = score;
        displayScore(score);
      }
      else {
        // document.querySelector(".message").textContent = "💥 You have lost the game";
        displayMessage("💥 You have lost the game");
        // document.querySelector(".score").textContent = 0;
        displayScore(0);
      }
    }

    // when the guess is too high
    // else if (guess > secretNumber) {
    //   if (score > 1) {
    //     document.querySelector(".message").textContent = "📈 Too high";
    //     score--;
    //     document.querySelector(".score").textContent = score;
    //   }
    //   else {
    //     document.querySelector(".message").textContent = "💥 You have lost the game";
    //     document.querySelector(".score").textContent = 0;
    //   }

    //   // when the guess is too low
    // } else if (guess < secretNumber) {
    //   if (score > 1) {
    //     document.querySelector(".message").textContent = "📉 Too low"
    //     score--;
    //     document.querySelector(".score").textContent = score;
    //   } else {
    //     document.querySelector(".message").textContent = "💥 You have lost the game";
    //     document.querySelector(".score").textContent = 0;
    //   }


    // }
  }


);

document.querySelector(".again").addEventListener(
  "click", function () {
    score = 20;
    document.querySelector("body").style.backgroundColor = "#222";
    // document.querySelector(".number").textContent = "?";
    displayNumber("?");
    document.querySelector(".number").style.width = "15rem";
    // document.querySelector(".message").textContent = "Start guessing...";
    displayMessage("Start guessing...");
    // document.querySelector(".score").textContent = score;
    displayScore(score);
    document.querySelector(".guess").value = "";
    secretNumber = Math.trunc(Math.random() * 20 + 1);



  });
