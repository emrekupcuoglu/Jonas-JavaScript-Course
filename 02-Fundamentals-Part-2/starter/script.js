// "use string" keyword is used for going into strict mode
//it needs to be the first line of code in the file or it won't work except for comments of course
//with strict mode we can eliminate accidental errors that would be headache inducing to solve
//because javascript would see no problem without strict mode
// with strict mode java script gives us helpful errors on what is wrong
//strict mode changes many things and it will be covered later when the time comes
//but it will be standard to use strict mode from now on
//NOT using the strict mode is the exception rather than the norm
//USE STRICT MODE

"use strict";

//below is such an example if we don't use strict mode we won't get an error message
//about the wrong variable name hasDriversLicense is set to false initially
//and after a logic check that check if the passedTest is true it should be set to true
//and if true it should be written to the console
//but because of a misspelling of hasDriversLicense !== hasDriverLicense (s is missing from Drivers)
//a new variable created at the spot and set to true instead of setting the original variable to true
//with strict mode we can avoid mistakes like these
// let hasDriversLicense = false;
// const passedTest = true;

// if (passedTest) hasDriverLicense = true;
// if (hasDriversLicense) console.log("You can drive YAY!");

// functions are like variables but for blocks of code

// we declare a function with the "function" keyword
//after the declaration we name the function
//code  between the parenthesis are called parameters
//parameters are specific to the function and are defined when the function is called
//code between the curly braces are called function body and is run when the function is called
function logger() {
  console.log("My name is Emre");
}

// calling / invoking // running the function

logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

//function above returned the value of juice
//and we captured that value in appleJuice variable
//and than we wrote it to the console
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
//but we could of wrote it directly to the console too
console.log(fruitProcessor(9, 0));

const appleOrangeJuice = fruitProcessor(6, 4);
console.log(appleOrangeJuice);

// Function Declarations vs Function Expressions

//Function Declaration
//we can call function declarations before defining it
//even though it might not be such a good idea in many cases
//this happens because of a process called hoisting
//
//we can't do this with function expressions

// const age1 = calcAge1(1998); we can call the function before declaring it

function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1998);

// Function Expression

const calcAge2 = function (birthYear) {
  // this is an anonymous function because it doesn't have a name
  return 2037 - birthYear;
};

//in JavaScript functions are values
const age2 = calcAge2(1998);
console.log(age1, age2);

// Arrow Function
//this is a special form of function expression
//we don't need to use curly braces
//and the return happens implicitly
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1998);
console.log(age3);

//we need to use parenthesis if there is more than one parameter
//and we need to use curly braces
//and explicitly call return if there is more than one line of code

const yearsUntilRetirement = (birthYear, firstName) => {
  const age4 = 2037 - birthYear;
  const retirement = 65 - age4;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1998, "Emre"));
console.log(yearsUntilRetirement(1987, "Buğra"));

// Calling Other Functions

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function cutFruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const fruitPieceJuice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
  return fruitPieceJuice;
}

const applePieceJuice = cutFruitProcessor(6, 0);
console.log(applePieceJuice);
console.log(cutFruitProcessor(0, 9));

const calcAge = (birthYear) => 2037 - birthYear;

const yearsUntilRetirement2 = function (birthYear, firstName) {
  const age = calcAge();
  const retirement2 = 65 - age;

  if (retirement2 > 0) {
    return retirement2;
  } else {
    return -1;
  }
};

// Arrays
//arrays are a type of data structure

const friends = ["Emre", "Burak", "Ceren"];
console.log(friends);
// we can use [] to call an element of an array
//arrays index elements starting at element zero
//so for calling the first element we need to use [0] and so on
console.log(friends[0]);

// we can create arrays in another way
//but this notation is usually NOT used

const years = new Array(2091, 1982, 9923);

// we can use properties with arrays for some important operations such as:
console.log(friends.length); //this property returns the number of elements in the array

// we can use this to get to the last element in an array without knowing how many elements there are in that array
console.log(friends[friends.length - 1]); //we need to subtract 1 because arrays start indexing at 0
//but length property returns the amount of items in the array which in this case is 3

// we can add items to the array as well
friends[2] = "Arslan";
console.log(friends);
//we should't have been able to mutate(change) the friends array because we used a const keyword
//but because of the way JavaScript stores thing in memory
//only primitive values are immutable arrays are NOT primitive
//because of this  we can change them anytime
//but we can't change the whole array
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// friends = ["selami","selena","ali atay"]; this code would'n work

//we can use different types in an array such as numbers and strings
//we can even add an entire array inside another array!
const firstName = "Emre";
const emreArray = [firstName, "Küpçüoğlu", 2037 - 1998, "student", friends];
console.log(emreArray);

const year = [2010, 1998, 1978, 1925];

const calcAge4 = (birthYear) => 2037 - birthYear;

// we can't do operations directly on arrays
//if we'd tried to we'd either get NaN
//or JavaScript turns the whole array into a string and concatenates it
const ageArray1 = calcAge4(year[0]);
const ageArray2 = calcAge4(year[1]);
const ageArray3 = calcAge4(year[year.length - 1]);

console.log(ageArray1, ageArray2, ageArray3);

// because we started with an array it's a good idea to end it with one too
//so we can do this operation like this

const ages = [
  calcAge4(year[0]),
  calcAge4(year[1]),
  calcAge4(year[year.length - 1]),
];
console.log(ages);

//Methods
//methods are technically functions but we called them on arrays
//this will be better explained later

// push method adds an element to the end of an array
const newLength = friends.push("Ceren");
// push method returns the length of the element
//we can store it in a variable

console.log(friends);
console.log(newLength);

// unshift method adds an element to the beginning of an array
//it returns the new length of the array as well
friends.unshift("Aziz");
console.log(friends);

//pop method is the opposite of push method
//pop method doesn't return the new length of the array
//instead it returns the removed element
const popped = friends.pop();
console.log(popped);
console.log(friends);

// shift is the opposite of unshift
// it returns the element that is removed as well
friends.shift();
console.log(friends);

console.log(friends.indexOf("Emre"));
// if we try to get the index of an element that doesn't exist
//then we get -1
console.log(friends.indexOf("tommy"));

// includes is similar to indexOf but is more modern
//includes is an ES& method
//includes instead of returning the index of the element
//simply returns true or false depending if the element is in the array or not

console.log(friends.includes("Emre"));
console.log(friends.includes("tommy"));

//this method uses strict equality it doesn't do type coercion
//if we pushed number 23 and checked for string "23" it would ont work

friends.push(23);
console.log(friends.includes("23"));

//we can use includes method to write conditionals

if (friends.includes("Arslan")) {
  console.log("You have a friend called Ceren");
}

//Objects
//we can' use key value pairs with arrays
//we can only access the data they hold with the index number
//with objects we can access the data they hold with names
//there are more than one way to create objects
//but using the curly braces are the easiest way to create objects
//this is called Object Literal syntax

const emre = {
  firstName: "Emre", //this is a key-value pair
  lastName: "Küpçüoğlu", //each of these keys are also called a property
  age: 2037 - 1998, // so this object called has 5 properties: property firstName with value "Emre",
  job: "student", //property lastName with value "Küpçüoğlu" ans so on
  friends: ["Ceren", "Yavuz", "İlter"],
};

console.log(emre);

//because we can access data in arrays with only index numbers
//we should use arrays with more structured data
//and objects with unstructured data
//this is the only consideration to use arrays or object though
//it will be expanded in the future or will come with experience
//or better yet learn it yourself

//How To Get The Property From An Object

console.log(emre.lastName); // the dot(.) is actually an operator that goes the object(emre)
//and retrieves the value we wanted using the keyword

//we can use the square brackets instead of the dot but we need to write the keyword as a string
console.log(emre["lastName"]);
//biggest difference between dot and bracket notation is:
//we can put any expression we want
//we don't have to explicitly write the keyword there instead we can compute it from another operation

const nameKey = "Name";

console.log(emre["first" + nameKey]);
console.log(emre[`last${nameKey}`]);

const interestedIn = prompt(
  "What do you want to know about Emre? Choose between firstName, lastName, job, age, and friends"
);

console.log(emre.interestedIn); // this will not work and give undefined as a value
//reason this gives undefined is because when JavaScript tries to access a property that doesn't exist it gives undefined

//we can use bracket notation for this

if (emre[interestedIn]) {
  console.log(emre[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, job, age, and friends"
  );
}

//How To Add Properties To An Object

emre.location = "Turkey";
emre["instagram"] = "@bkupcuoglu";
console.log(emre);

//Challenge

console.log(
  `${emre.firstName} has ${emre.friends.length} friends and his best friend is ${emre.friends[0]}`
);

//Object Methods

const emreObjectMethod = {
  firstName: "Emre",
  lastName: "Küpçüoğlu",
  birthYear: 1998,
  job: "student",
  friends: ["Ceren", "Arslan", "İlter"],
  hasDriversLicence: true,

  //this function is a method
  //any function that is attached to an object is a method
  //we can not use a function declaration
  //we need a function expression for this

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }

  //we can use this keyword for using the variables that are in the object
  //this keyword is equal to object on which the method is called
  //or in other words is it equal to the object calling the method
  //so this.birthYear === emre.birthYear but only inside of the object

  //
  // calcAge: function () {
  //   console.log("this", this);
  //   return 2037 - this.birthYear;
  // }

  //we can also us this keyword to create a new property on the object
  //let's say that the computation we are doing is an intensive computation
  //and we don't want to compute that value every time the method is called
  //we can store the value inside the object in a new variable using the this keyword
  //and then we can access that value later saving us computation time!

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    if (this.hasDriversLicense) {
    }
    return `${emreObjectMethod.firstName} is ${emre.age} years old ${
      emreObjectMethod.job
    } and ${
      this.hasDriversLicense
        ? "has a drivers license"
        : "doesn't have a drivers license"
    }`;
  },
};

console.log(emreObjectMethod.calcAge());
//we can access this with bracket notation as well
console.log(emreObjectMethod["calcAge"]());

console.log("this.age", emreObjectMethod.age);
console.log("this.age", emreObjectMethod.age);
console.log("this.age", emreObjectMethod.age);

//Challenge
//Emre is a 39 years old student(lol), and he has a drivers license
console.log(emreObjectMethod.getSummary());
console.log(emreObjectMethod);

//FOR LOOP
// for loop keeps running while the condition is true
//first we define a variable and then we create a condition such as rep<=10
//we need to use let keyword because with evert iteration of the loop the variable updates
//if the condition is true then for loop continuos to run the code inside the loop body
//if not it exits the loop
for (let rep = 1; rep <= 10; rep++) {
  console.log("Lifting weights repetition " + rep);
}

const ceren = [
  "Ceren",
  "Arslan",
  2037 - 2000,
  "student",
  ["Emre", "Eda", "Pelin"],
  true,
];
const types = [];

for (let i = 0; i < ceren.length; i++) {
  //reading from array
  console.log(ceren[i]);
  //filling types array
  // types[i] = typeof ceren[i];
  types.push(typeof [ceren[i]]);
}

console.log(types);

const birthYears = [1954, 2000, 1987, 1960];
const ages2 = [];
for (let i = 0; i < birthYears.length; i++) {
  // ages2[i] = calcAge(birthYears[i]);
  ages2.push(calcAge(birthYears[i]));
}
console.log("ages", ages2);

//Continue and Break
//continue is used for exiting the current iteration of the loop
//and continue to the next one
//break is used for completely terminate the loop

console.log("--- ONLY STRINGS ---");
for (let i = 0; i < ceren.length; i++) {
  if (typeof ceren[i] !== "string") continue;
  console.log(ceren[i], typeof ceren[i]);
}

console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < ceren.length; i++) {
  if (typeof ceren[i] === "number") break;
  console.log(ceren[i], typeof ceren[i]);
}

// Looping Backwards
console.log("--- BACKWARDS LOOP ---");
for (let i = ceren.length - 1; i >= 0; i--) {
  console.log(i, ceren[i]);
}

//LOOP INSIDE ANOTHER LOOP

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`----- Starting Exercise  ----- ${exercise}`);
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Repetition ${rep}`);
  }
}

// WHILE LOOP
let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights rep ${rep}`);
  rep++;
}

let dice = 4;

while (dice !== 6) {
  dice = Math.trunc(Math.random() * 6) + 1;
  console.log(`You rolled a ${dice}`);
}
