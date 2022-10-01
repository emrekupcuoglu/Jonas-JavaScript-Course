'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// const btnsOpenModal = document.querySelector(".show-modal");
//when we work with multiple elments that have the same class
//querySelector only slects the first one
//to adress this we use querySelectorAll

const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

const openModal = function () {
  //we remove the class "hidden" from modal to open it
  //class manipulation is really important for building webpages
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const closeModal = function () {
  //we remove the class "hidden" from modal to close it

  modal.classList.add("hidden");
  overlay.classList.add("hidden");

}

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!! IMPORTANT !!!!!!!!!!! IMPORTANT !!!!!!!!!!!!!!!! IMPORTANT !!!!!!!
// Adding "esc" key functionality
//keypresses are global levents because they don't happen on a one specific element
//there are 3 different types of event for the keyboard
//keypress continuously fire, keydown happends when the key is pressed, and the keyup happens when the key is let go
document.addEventListener("keydown", function (e) {
  //this function will be exucuted for any key press that happens
  //regardless of the key, it doesn't matter which key is pressed
  // information about which key is pressed is stored in
  // the event that is going to occur as soon as a key is pressed
  //as a key is pressed a keydown evet is generated
  //and out handle function is waiting for that event to happen
  //(handler function is the second parameter of the addEventListener)
  //anytime an event like this occurs JavaScript does generate an object
  //that objecet contains all the information about the event
  //and we can acces that object in the event handler function
  //to know the which key is pressed we need to look at the event object
  //for this we need to give this function a parameter in this key parameter is "e"
  //when JavaScript calls this function it passes the event objects as an argument
  //this only works because JavaScript calls the object not us
  //we only say:"hey JavaScript call this function when a key is pressed
  // and when you do so please pass in the event object as an argument "
  //when JavaScript call this function it passes key event Object as an argument
  //in this example e inside the paranthesis is the parameter of this funciton
  //a parameter is just a placeholder like a variable
  //argument is the real value
  //we can check the event Object using console.log(e);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    console.log("esc pressed");
  }
});