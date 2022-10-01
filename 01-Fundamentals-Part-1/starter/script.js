let js = "amazing";

console.log(40 + 56 + 10 - 96);
console.log("Emre");
console.log(64);
let firstName = "Emre";
console.log(firstName);



console.log(typeof true);
console.log(typeof 23);
console.log(typeof "jonas");

let javaScriptIsFun = true;
console.log(javaScriptIsFun);
console.log(typeof javaScriptIsFun);
javaScriptIsFun = "YES!";
console.log(javaScriptIsFun);
console.log(typeof javaScriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 2037;
console.log(year);
console.log(typeof year);

console.log(typeof null);

const now = 2037;
const ageEmre = now - 1998;
const ageSarah = now - 2018;
console.log(ageEmre, ageSarah);
console.log(ageEmre * 2, ageSarah / 10);

const userName = "Emre";
const lastName = "Küpçüoğlu";
const job = "student";
const birthYear = 1998;
console.log(userName + " " + lastName);

// Assignment Operators
let x = 15; //15
console.log(x);
x += 10; //25
console.log(x);
x -= 5; //20
console.log(x);
x *= 4; //80
console.log(x);
x /= 2; //40
console.log(x);
x++;
console.log(x);
x--;
console.log(x);



const emreNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`
console.log(emreNew);

console.log(`I'm just a regular string...`);

console.log("I'm a string with \n\ multiple \n\ lines");

console.log(`String 
multiple
lines`);

const age = 15;

if (age >= 18) {
  console.log("Sarah can get a driver's license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young wait another ${yearsLeft} years`);
}

// Truhty and Falsy Values

// 0, undefined, "", Null, and NaN are falsy values rest of the values are truthy values

// Truthy values are values that are not true at the time of declaration but are turned true imlicitly or expilicitly when required
// falsy values are the opposite

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({}));
console.log(Boolean(NaN));

const money = 100;

if (money) {
  console.log("Don't spend it all");

} else {
  console.log("Get a job!");
}

let height;
if (height) {
  console.log("yay height is defined");
} else {
  console.log("height is not defined");
}


// Comparision Operators

// === is strict equal and == is loose equal
// for strict equal to be true it needs to be exactly the same including the type
// but loose equal does type coercion(imlicit type conversion) so 23 can be equal to "23"

const favoriteNumber = "18";

if (favoriteNumber === 18) console.log("You just became an adult(Strict)");

if (favoriteNumber == 18) console.log("You just became an adult(loose)");

const favorite = Number(prompt("what is your favorite number?"));
console.log(favorite, typeof favorite);

// the value type we get from promt is a string but == operator does type coercion so the line below works
//for it to work with === operator we need to wrap the prompt in Number to manualy convert it from string to number type

if (favorite == 23) console.log("cool 23 is an amazing number");

if (favorite === 42) {
  console.log("cool we wrapped promt in a number for it to work and 42 is great btw");
}
else if (favorite === 8) {
  console.log("8 is cool");
} else {
  console.log("number is not 42 or 8");
}

// != is loose not equal !== is strict not equal

if (favorite !== 23) console.log("Why not 23?");

// Logical Operators
// && is the AND operator and || is the OR operator and ! is the NOT operator  

const hasDriversLicence = true
const hasGoodVision = true;

console.log(hasDriversLicence && hasGoodVision);
console.log(hasDriversLicence || hasGoodVision);
console.log(!hasDriversLicence);

const shouldDrive = hasDriversLicence && hasGoodVision;

if (hasDriversLicence && hasGoodVision) {
  console.log("Sarah is able to drive");
} else { console.log("sarah should not drive"); }

const isTired = false

console.log(hasDriversLicence || hasGoodVision && isTired);


const day = prompt("Which day's schedule you want to check?");

switch (day) {
  case "monday": // day === "monday"
    console.log("Prepare for the challenges of the week");
    break;
  case "tuesday":
    console.log("Coding all day long!");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("No rest for the wicked");
    break;
  case "saturday":
  case "sunday":
    console.log("Harder Faster Better Stronger");
  default:
    console.log("Not a valid date");
}

// same code above written with if statements

if (day === "monday") {
  console.log("Prepare for the challenges of the week");
} else if (day === "tuesday") {
  console.log("Coding all day long!");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
}
else if (day === "friday") {
  console.log("No rest for the wicked");

}
else if (day === "saturday" || day === "sunday") {
  console.log("Harder Faster Better Stronger");
} else {
  console.log("Not a valid date");
}

// Difference Between Expressions and Statements:
//Expressions always produce values statemens don't ahve to produce values

// 5+4 or aaage = true are expressions but
// if(age >21){
//    console.log("yu can have a drink") is a statement
// }

// we can use expressions in Template Literals but we can not use statements


// Ternary Operator: ternary operator is like an if else stament with only one line of code

const newAge = 29;

newAge > 18 ? console.log("I'd like to drink wine 🍷") :
  console.log("I'd like to drink water 💧");


// Because ternary operation is an operation it always prdocues a value
//and that means it is and expression not a statement
//we can use them to conditionally cdeclare variables

const drink = newAge >= 18 ? "🍷" : "💧";
console.log(drink);

// This is the same logicc as above only done in if statements
let drink2;
if (newAge >= 18) {
  drink2 = "wine 🍷";
} else {
  drink2 = "water 💧";
} console.log(drink2);

// Because ternary operator is an expression we can use them in Template Literals

console.log(`I'd like to drink 2${newAge >= 18 ? "🍷" : "💧"}`);