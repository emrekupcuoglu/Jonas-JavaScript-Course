"use strict";

const bookings = [];
//to set default parameters in ES6 we can write the inside the parenthesis
//We can use expressions fro setting default values and even use the values of the other parameters that were set before it
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = numPassengers * 199
) {
  //ES5 way of setting default parameters
  // numPassengers = numPassengers || 1
  // price = price || 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH213");
createBooking("LH213", 2, 800);
createBooking("LH213", 2);

//we can't skip parameters when calling functions let's say we want to skip the numPassengers parameter
createBooking("LH123", 1000); //this doesn't work

//but we can be clever and do this though
//this works because setting the parameter to undefined is the same thing as not setting it
createBooking("LH432", undefined, 1000);

//! How Passing Arguments Work Passing by Value vs Reference
//JavaScript doesn't have pass by reference it only has pass by value
//even though objects look like they pass by reference they actually pass by value
//object's memory address is passed and that reference is still a value
//basically we pass a reference to the function BUT we do NOT pass by a reference, this is an important distinction

const flight = "LH234";
const emre = {
  name: "Emre Küpçüoğlu",
  passport: 1231231312,
};

const checkIn = function (flightNum, passenger) {
  //chancing the value of an arguments is usually a bad practice, this for learning purposes
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 1231231312) {
    console.log("Checked In");
  } else {
    console.log("Wrong passport");
  }
};

checkIn(flight, emre);
//flight is a primitive type so it doesn't change but emre is an object and passenger.name= "Mr. " + passenger.name changes the object
console.log(flight, emre);

//we need to be careful with this behavior and always keep it in mind
//because of the way objects behave when passed in to functions, this can have unforeseeable consequences in large code bases
//let's write another function to show what can happen

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(emre);
checkIn(flight, emre);
//here two functions manipulate the same object and that is creating a problem
//when we call the checkIn for the first time in line 55 functions logs "Checked In"
//but when we call the checkIn for the second time it says that we have the "Wrong passport"
//reason for this confusion is because we are calling newPassport before the second checkIn call
//and this changes the passport number of the object we passed in to a different value
//because of this we get conflicting results

//?First Class and Higher-Order Functions
//Check the lecture 130 and its associated part in the pdf for more information

//Functions are first class citizens that means function are simply values
//Functions are just another "type" of object,
//and since objects are values functions are values too,
//and since functions are values there is a bunch of interesting things we can do with them,
//like storing them in functions or in object properties.
//we can also pass functions as arguments to other functions and we already did that before when adding event listeners
//We can also return a function from another function
//Finally because functions are objects, and objects have methods, functions have methods as well

//The fact that JavaScript has functions as first class citizens makes it possible to write higher-order functions
//*Higher-Order Functions are:
//A function that receives another function as an argument or returns a new function, or both
// btnClose.addEventListener("click", greet) is a higher order function because it receives a function as its second argument
//and we usually say that the functions that is passed in is a //?callback function
//that it is because the callback function will be called later by the higher order function
//in this case addEventListener will call the greet function later as soon as the "click" event happens
//we can also have functions that return a new function //*check the lecture 130 and the pdf

//first class functions != higher order functions
//firs class functions is a feature that programming languages can have all it means is that all functions are values
//there are no first class functions in practice its all concept
//there are higher order functions in practice however, because the language supports the first class functions
//it is a subtle difference but a difference nonetheless

//?Functions Accepting Callback Functions as an Input

//this function takes a string and returns it without spaces
const oneWord = function (str) {
  //we could of done this with replaceAll too
  return str.replace(/ /g, "").toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//Higher Order Function
const transformer = function (str, fn) {
  console.log(`original: ${str}`);
  //here the parameter fn is a function so we can use it as a normal function
  //we say fn(str) which is in this case equal to the callback function(function the higher order function is called with)
  console.log(`transformed: ${fn(str)}`);
  //functions also have properties and we can read the name of the fn function with .name
  console.log(`transformed by ${fn.name}`);
};

//we call the functions in the arguments callback functions, because we don't call them but JavaScript does
transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

const high5 = function () {
  console.log("High five!");
};

//Another example
//Just like the transformer function we pass in a callback function to the addEventListener,
// (this callback function in this case is also called the event handler or the event listener)
//addEventListener is the higher order function and the high5 is the callback function
document.body.addEventListener("click", high5);

//there are many many other examples in the JavaScript language
//This concept of callback functions is used all the time in build JavaScript functions
//For example the for each function we will learn in the next section

//forEach method is called for each element in the array (shocking i know)
//and it calls the callback function high5 and it prints "High five!" to the console for 4 times in this case
["Emre", "Buğra", "Yaşar", "Ummahan"].forEach(high5);

//*The Advantages of Callback Functions
//First big advantage is it makes it easy to split our code into more usable and interconnected parts
//thats what we did with oneWord and UpperFirstWord functions we split up the functionality between two different functions
//Second and way more important advantage is that callback functions allow us to create abstraction
//we created a level of abstraction with our code above(with the transformer functions)
//Abstraction basically means that we hide the detail of some code implementation because we don't really care about all that detail
//and this allow us to think about problems in a higher more abstract level thats why it is called abstraction
//The transformer function doesn't care t all how the string is transformed, it doesn't care about that detail
//All it does want to do is to transform a string but it doesn't care how it does it
//We could of write the oneWord or the upperFirstWord function directly in the transformer that would of worked the same
//but instead we abstracted this code away into other functions.
//So we created a new level of abstraction and y doing this
//the transformer function is only concerned with transforming the input string itself but no matter how the actual transforming itself actually works
//it is basically delegating the string transformation to other lower level functions

//?Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//the greet function returns a new function and we store that function in a new variable called greeterHey
//this makes greeterHey a function
const greeterHey = greet("Hey");

greeterHey("Emre");
greeterHey("Burak");

//greet("Hello") is now a function. All of it is a function with the parenthesis and the "Hello" included
//and we can call this function with a name
greet("Hello")("Emre");

//With arrow functions
const a = (greeting) => (name) => console.log(`${greeting} ${name}`);

const b = a("Hi");
b("Arrow");

a("Arrow")("Function");

//?Call and Apply Methods

const bookFunction = function (flightNum, name) {
  console.log(
    `${name} booked a seat on  ${this.airline} flight ${this.iataCode}${flightNum}`
  );
  this.bookings.push({ flight: this.iataCode + flightNum, name });
};

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: this.iataCode + flightNum, name });
  },
};

lufthansa.book(133, "Emre Küpçüoğlu");
lufthansa.book(682, "Yaşar Küpçüoğlu");
console.log(lufthansa.bookings);

//let's say that lufthansa opened another airline
//and of course we want to be able to take bookings with eurowing as well
//but taking the method in the lufthansa objects and pasting it here is a bad practice
//*we can create a function outside of the lufthansa objects and set it equal to book method continued below=>
//so how do we fix the problem in other words how do we tell the JavaScript we want to create a booking on the new eurowings airline
//basically we need to tell the JavaScript explicitly what the .this keyword should be like so if we want to book a lufthansa flight this keyword point to lufthansa
//if we want to book a eurowings flight this keyword should point to eurowings

const book = lufthansa.book;

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
  bookFunction,
};
//Does NOT work
// book(23, "Ahmet");
//*but this throws an error because we are trying to access the .this object with a normal function call and in a normal function call .this points to the window object and this throws an error. So we need another way to handle this.

//?Call Method
//In the call method the first argument is what we want the .this keyword to point to and the rest of the arguments are the original arguments of the function that the call method was called on
book.call(eurowings, 23, "Buğra");
console.log(eurowings);
//we didn't actually called the book function. We called the call method and it called the book function with the .this keyword set to the eurowings object

book.call(lufthansa, 431, "Ceren");
console.log(lufthansa);

//?Apply Method
//Apply essentially does the same thing, the only difference is that apply does NOT receive a list of arguments after the .this keyword,
//but instead it takes an array of arguments
const flightData = [561, "Ummahan Küpçüoğlu"];
book.apply(eurowings, flightData);
console.log(eurowings);
//Apply method is not that used anymore in modern JavaScript
//because we have a better way of doing the same exact thing
book.call(lufthansa, ...flightData);
console.log(lufthansa);

//?Bind Method
//Just like the call and the apply method bind also allow us to manually set the .this keyword for any function call
//The difference is that bind does NOT immediately call the function instead it returns a new function where the .this keyword is bound
//So it is set to whatever value we passed to the bind

//bind returns a new function where the .this keyword is bound to the value we pass as an argument to the bind method
//bookEW is an entirely new function that is equal to the book method but has its .this keyword set as eurowings
const bookEW = book.bind(eurowings);
bookEW(231, "John Cena");
console.log(eurowings);

//we can pass in more than one argument to the bind method
//this arguments will also be set in stone so they will be defined and will always be called with the same arguments

//*Partial Application
//Partial application is basically a common pattern that is specifying the parts of the argument before hand
//so essentially partial application means that part of the arguments of the original function are already applied (which means already set)
//let's say we want to book for a specific airline and specific flight number
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Burhan Altıntop");
console.log(eurowings);

//?One example of where we can use the bind method is when we use objects with event listeners
//With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log("this", this);
  this.planes++;
  console.log("this.planes", this.planes);
};

//this doesn't work because in an event handler .this keyword is always points to the element on which the handler is attached.
//In this case the handler function is attached to the ".buy" button
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
//we can use the bind method to bind the .this keyword to lufthansa
//we can't use call or apply because they call the function immediately
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//Partial Application

//this is general function for adding tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//but let's say there is one tax that we use all the time.
//This time we don't care about the .this keyword it is not even in the function.
//So we write null it can be any other value because nothing will happen with it but it's kind of a standard to write null
const addVAT = addTax.bind(null, 0.18);
//so this is essentially the same as writing:
// const addVAT = value => value + value * 0.18;
console.log(addVAT(100));
console.log(addVAT(23));

//Challenge

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addTax15 = addTaxRate(0.15);
console.log(addTax15(100));

//?Immediately Invoked Function Expressions(IIFE)
//Sometimes in JavaScript we need a function that is only executed once.
//Basically a function that disappears right after it is called for once.
//This might not be immediately useful but it will be in the future especially with async await
//We can create a function and only called it once like this:
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();
//However we can actually run this function in the future if want
//there is nothing stopping us from later doing this
runOnce();
//This is NOT we want we want to execute a function immediately and not even having to save it somewhere
//This is how we do it
//JavaScript expects a name, because JavaScript expects a function statement, because we simply started with a function keyword
//However we can trick JavaScript into thinking this is just an expression to do that:
//We just wrap the function in parenthesis
//And don't forget to call it with adding parenthesis at the end!
(function () {
  console.log("This will never run again. For sure!");
})();

//IIFE Arrow Function
(() => console.log("I will ALSO never run again. For sure!"))();

//IIFE are not used that much anymore in ES6+
//The reason IIFE were used before was because of privacy
//but in ES6+ we have let and const and block scoping so we don't need IIFE for privacy

//!CLOSURES
//!Check lecture 137 and it's associated pdf
//A closure is not a feature we explicitly use.
//So we don't create closures manually like we create a new array or a new function.
//A closure simply happens automatically in certain situations we just need to recognize those situations.
//We will create one of those situations so then we can take a look at a closure .
const secureBooking = function () {
  //This function is called secureBooking because the passengerCount can NOT be manipulated or accessed from the outside
  let passengerCount = 0;

  //What is special about this function is that this function returns a new function
  return function () {
    passengerCount++;
    console.log(` ${passengerCount} passengers`);
  };
};

//secureBooking will return a function and that function will be stored in the new variable booker
//Now because secureBooking returns a function, booker is a function as well
const booker = secureBooking();

booker(); //passengerCount=1
booker(); //passengerCount=2
booker(); //passengerCount=3
//Booker function has increased the passengerCount variable from the outside.
//If we think about this how is this even possible.
//How can the booker function update the passengerCount that is inside the secureBooking function that is actually already has finished executing.
//SecureBooking function has already finished it's execution so it's execution context is no longer on the stack but still the inner booker function is still able to access the passengerCount variable that is inside the booker function that no longer should exist.
//This is made possible with a closure(This is really weird btw)

//Closure makes a function remember all the variables that existed at the functions birthplace essentially and this can NOT be simply explained with the scope chain alone
//We also need to understand closures

//Thanks to closures a function has access to the variable environment(VE) of the execution context in which it was created
//*Closure: VE attached to the function, exactly as it was at the time and place the function was created
//Closure has a priority over the score chain: For example: if there was a global passengerCount variable that was set to 10 it would still first use the one in the closure

//We can take a look at the closure using the console.dir()
//when this  logs to the console take a look at the Scopes property
//!Scopes property is basically the variable environment(VE) of the booker function
//!Whenever you see double brackets around a property, like the ones the Scope property is in, that means it is an internal property that we can NOT access from our code
console.warn("Log below is the console.dir(booker)");
console.dir(booker);

//?Let's create 2 more situations where we can example closures
//?In these examples we won't return functions so we can get closures without returning functions as well

let f;

const g = function () {
  console.log("g");
  const a = 23;
  f = function () {
    console.log("f", a * 2);
  };
};

//Result of this function is a=23 and f variable that we declared in the global scope will we equal to a function
//So after we call g we can called f
g();
f();
console.dir(f);
//*This proves that the f function does really close over any variables of the execution context (EC) in which it was defined
//*And that is true even when the variable itself was technically NOT even defined inside that variable environment(VE) f was created in the global scope but because it was assigned in the g function it still closed over the variable environment of the g function, because of that even though the execution of the g function ended it can still able to access the a variable

//?Let's take it to the next level

const h = function () {
  console.log("h");
  const b = 5;
  f = function () {
    console.log("f", b * 2);
  };
};
//f was reassigned when we called the h function
h();
f();
console.dir(f);

//?Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //We will learn more about timers later
  //First parameter is a function, a callback function, and the second is a time
  //after a set time passed(set by the timer parameter) the function will be executed
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);

  //
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(21, 3);
//After the boardPassengers function is called perGroup is assigned
//then setTimeout function is called and is set to execute after some time specified when the boardPassengers function was called
//and immediately console.log(`Will start boarding in ${wait} seconds`); this line of code is executed
//after a set amount of time, 3 seconds in this case, the callback function of the setTimeout functions is called
//The callback functions is executed completely independent of the boardingPassengers function
//but still the callback function was able to use all the variables that were in the variable environment in which it was created
//This is a clear sign of a closure being created
//Only way for the callback function to have access to the variables of the boardingPAssengers function after it's execution is ended is with a closure

//*Let's prove that the closure has priority over the scope chain

//If the closure didn't have priority over the scope chain it would have used the perGroup variable in the global scope
//and the perGroup would be equal to 1000 instead of n/3 (60 in this case)
const perGroup = 1000;
boardPassengers(180, 3);
