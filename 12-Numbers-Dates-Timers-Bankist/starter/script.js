"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-04-19T17:01:17.194Z",
    "2022-04-21T23:36:17.929Z",
    "2022-04-22T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
  //This function calculates the amount of time that has passed
  //We pass in the date values as arguments
  //Then subtract one date from the other this gives us the time stamp of the operation
  //And divide it by(1000*60*60*24) to get the amount of days that has passed
  //And that the absolute of that value
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const dayPassed = calcDaysPassed(new Date(), date);
  console.log("dayPassed", dayPassed);

  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`

  //We can use the Intl API to format the date
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    //We can use the i to get the index of the movementsDates because the movementsDates and the movements array must have the same number of elements and must correspond to each other
    //This is a common technique of looping over two arrays at the same time
    //We call the forEach method on one of them and then we also use the current index to get date from the other array
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMovement = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function (reset = false) {
  //Set the time to 5 minutes
  let time = 300;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}.${sec}`;

    //When the timer hits 0 log out user
    if (time === 0) {
      currentAccount = "";
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
      clearInterval(timer);
    }

    //Decrease the time by 1s
    time--;
  };

  //Call the timer every second
  //We exported the function we had normally wrote in the setInterval function
  //Reason for this is: the setInterval functions is called every 1 second
  //This includes its execution as well
  //so we would have to wait 1 second for it to execute if we hadn't done that
  //By doing this we call the tick function immediately for the first time
  //then call it every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

//FAKE ALWAYS LOGGED IN

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

document.body.addEventListener("click", () => {
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    // const timeNow = new Date();
    // const timeDay = `${timeNow.getDate()}`.padStart(2, 0);
    // const timeMonth = `${timeNow.getMonth() + 1}`.padStart(2, 0);
    // const timeYear = timeNow.getFullYear();
    // const timeHour = `${timeNow.getHours()}`.padStart(2, 0);
    // const timeMin = `${timeNow.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${timeDay}/${timeMonth}/${timeYear}, ${timeHour}:${timeMin}`;

    //Using the Intl API for formatting the date
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    //In many situations it is makes more sense to get the locale from the users browser
    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    clearInterval(timer);
    //Start the Logout Timer
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".loading").classList.remove("hidden");

  setTimeout(() => {
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      // Add movement
      currentAccount.movements.push(amount);
      //Add movement date
      const date = new Date();
      currentAccount.movementsDates.push(date.toISOString());

      // Update UI
      updateUI(currentAccount);
    }
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector(".loading").classList.add("hidden");
  }, 500);

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//In JavaScript all numbers are represented internally as floating point numbers
console.log(23 === 23.0);

//Numbers represented internally in a 64 bit base 2 format
//That means numbers are stored in a binary format
//In this binary form it is very hard to represent some fractions
//that are very easy to represent in the base 10 system that we are used to
//Base 10 --- 0 to 9
//Binary --- 0 to 1
//One of the the fractions that are hard to represent in binary is 0.1
//This is a classic way to show this
console.log(0.1 + 0.2); //This results in a wrong result
console.log(0.3 === 0.1 + 0.2);
//But JavaScript doesn't have a better way to represent this
//In base 10 1/10=0.1 so it is easy to represent
//But in base 10 10/3 is impossible to represent 10/3 = 3.3333333 to infinity
//In binary same thing happens with 0.1. Because we have an infinite fraction, result is weird number
//In some cases JavaScript does some rounding behind the scenes to try it's best to hide these problems
//But some operations such as 0.1+0.2 simply can't mask the fact that,
//behind the scenes JavaScript can NOT represent certain fractions
//!Be aware that you can NOT do really precise scientific or financial calculations in JavaScript(at least in vanilla JavaScript there may be libraries to fix this need further study)

//*Conversion
//Instead of converting strings to numbers like this:
Number("23");
//We can do this:
console.log(+"23", typeof +"23");

//*Parsing
//With parsing there can even be symbols in the string
//This can be useful in situations such as when we get a unit from css and we need to only the number
//parseInt accepts a second argument which is the so called Radix
//Radix is the base of the numeral system that we are using
//We should alway pass in the radix to avoid bugs
console.log(Number.parseInt("30px", 10));
//In order for this to work the string needs to start with a number
//This will not work and will give NaN
//But we can white space
console.log(Number.parseInt("px30", 10));

//There is also parseFloat
console.log(Number.parseFloat("   2.5rem   "));
//This only reads the integer part and returns 2
console.log(Number.parseInt("   2.5rem "));

//parseInt and parseFloat are global functions so we don't actually need to call them on the Number object
console.log(parseFloat("2.5rem"));
//*But this is the old school way of doing things and
//in modern JavaScript it is encouraged to use the Number object
//Number object provides a namespace for all these different functions

//*Checking if a value is a number

//This gets confusing
//If the value is NaN it returns true
//If the value is a number, string or any value other than NaN it returns false
//So this is NOT a good way to check if a value is a number
console.warn("isNaN");
console.log(Number.isNaN("number", 20));
console.log("string", Number.isNaN("20"));
console.log("trying to convert invalid string", Number.isNaN(+"20ad"));
console.log("infinity", Number.isNaN(20 / 0));

//This is a better way to check if a value is a number
//This works if the value is really a number not string or infinity
console.warn("isFinite");
console.log(Number.isFinite("number", 20));
console.log("string", Number.isFinite("20"));
console.log("trying to convert invalid string", Number.isFinite(+"20ad"));
console.log("infinity", Number.isFinite(20 / 0));

//If you are checking for integers us this:
console.warn("isInteger");
console.log("integer", Number.isInteger(20));
console.log("float", Number.isInteger(20.2));
console.log("string", Number.isInteger("20"));
console.log("trying to convert invalid string", Number.isInteger(+"20ad"));
console.log("infinity", Number.isInteger(20 / 0));

//?Math and Rounding

//*Square Root
//Just like many other options sqrt is a part of the Math namespace
console.warn("Square Root");
console.log("square root", Math.sqrt(25));
//Same can be done using the exponentiation operator as well
console.log("square root", 25 ** (1 / 2));
//this can be used with cubic roots as well
console.log("cubic root", 8 ** (1 / 3));

//*Maximum value
console.warn("Maximum Value");
console.log("max value", Math.max(5, 6, 1, 9, 1));
//Max function does type coercion but not parsing
console.log("max value type coercion", Math.max(5, 6, 4, 1, "23", 5, 6));
console.log("max value type coercion", Math.max(5, 6, 4, 1, "23px", 5, 6));

//*Minimum value
console.warn("Minimum Value");
console.log("min value", Math.min(5, 6, 2, 4, 45, 5));

//*Constants
//There are also constants on the Math object or the Math namespace
//For example if we wanted to calculate the of a circle with the of 10 pixels we can do that
console.warn("Constants");
console.log(Math.PI * Number.parseFloat("10px") ** 2);

//*Random
//We can generalize the equation we used for generating random numbers
console.warn("Random Numbers");
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

//*Rounding integers
//All of the rounding methods do type coercion
//Math.trunc removes any decimal part
console.warn("Rounding Integers");
console.log("trunc", Math.trunc(23.3));
console.log("trunc", Math.trunc("23.3"));

//Math.round will always round to the nearest integer
console.log("round", Math.round(23.9));
console.log("round", Math.round("23.9"));

//Math.ceil will round up
console.log("ceil", Math.ceil(23.9));
console.log("ceil", Math.ceil("23.9"));

//Math.floor will round down
console.log("floor", Math.floor(23.9));
console.log("floor", Math.floor("23.9"));

//trunc and the floor works similar for positive numbers
//but not for negative numbers
console.log("trunc", Math.trunc(-23.9));
console.log("floor", Math.floor(-23.9));

//*Rounding decimals
//toFixed will always return a string
//Parameter determines how many decimals places will be after the dot
console.warn("Rounding Decimals");
console.log("toFixed", (2.7).toFixed(0));
console.log("toFixed", (2.7).toFixed(3));
console.log("toFixed", (2.345).toFixed(2));

//If we want to convert this to a number we can do this
console.log("toFixed", +(2.345).toFixed(2));
//Or
console.log("toFixed", Number((2.345).toFixed(2)));

//?Remainder Operator
//Remainder operator simply returns the remainder of a division

console.warn("Remainder operator");
console.log("remainder", 5 % 2);

//We can sue the remainder operator to check if a number is even or odd
//If the numbers is divisible by 2 it is even if it is not then it is odd
console.log("even", 4 % 2);
console.log("odd", 5 % 2);

const isEven = (n) => n % 2 === 0;
console.log("isEven", isEven(8));
console.log("isEven", isEven(51));

//We can use the remainder operator to color the very second or third or nth row if we wanted to

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "blue";
    if (i % 3 === 0) row.style.backgroundColor = "orangered";
  });
});

//?Numeric Separators
//Starting from ES2021 we can use a feature called numeric separators
//to format numbers in a way that is easier for us, and other developers to read and understand
//It is really difficult to read large number without formatting
//Let's say we wanted to represent a really large number like the diameter of our solar system
const diameter = 287460000000;

//We can format this using underscores
const diameterFormatted = 287_460_000_000;
console.log(diameterFormatted);
const priceCents = 345_99;
console.log(priceCents);
//Engine ignores the underscores, that means we can put the underscores anywhere we want, except two or more in a row,
//and we can't place them at the beginning or end of a number
//And we can only place them between numbers

// const pi = 3._1415; //This gives an error
// const number = 37_; //This also gives an error
// const number = _451; //This gives an error as well

//*When we try to convert strings that contain underscores into numbers that will not work as expected
console.log(Number("230_000")); //This returns NaN

//You should only use numeric separators when writing numbers in the code
//If you need to store a number in a string like in an API or if you get a number as a string from an API
//You should NOT use underscores because JavaScript will not be able to parse the number out of the string

//The same is true for parseInt function as well
//Here we don't get NaN but we only get 230 instead of 230000
console.log(parseInt("230_000"));

//?BıgInt is a special type of integer that is introduced in ES2020
console.warn("BigInt");
//Numbers are represented internally as 64 bits
//Of these 64 bits only 53 are used to store the digits
//The rest are for storing the position of the decimal point and the sign
//If there are only 53 bits to store the numbers that means there is a limit how big numbers can be
//And we can calculate that number:
console.log("largest number possible to represent with 53 bits", 2 ** 53 - 1);
//This is the biggest number that JavaScript can safely represent
//This numbers is so important that it is even stored in the Number namespace
console.log(Number.MAX_SAFE_INTEGER);
//Any integers that is larger than this is NOT safe
console.log("wrong representation because of the bit limit", 2 ** 53 + 1); //This is wrong by one number

//*This can became a problem for database id's or when interacting with 60 bit numbers
//60 bits numbers are used in other languages
//For example we might get a number that is larger than JavaScript safely represent from some API
//Then we have no way of storing that number in JavaScript
//*At least not until BigInt
//With ES 2020 a new primitive called BigInt was added
//And we can use it to store any number no matter how big

//If we didn't used BigInt here we would NOT get precision
//We add "n" to the end of the integer to turn it into a big int
console.log(4843523984572309847238904723980423894n);

//We can also use the  Big Int constructor but to turn the number into a BigInt JavaScript first represent the number as regular
//So don't use it unless necessary and don't use with big ints(lol)
console.log(BigInt(4843523984572309847238904723980423894)); //This number and the one above gives different results use the above

//*Operations
console.log(1000n * 1000n);
console.log(431078943287904329087234n * 31248901342980n);
//Math. operations will not work with BigInt
// console.log(Math.sqrt(16n)); this line throws an error

//It is Not possible to mix BigInt with regular numbers
const huge = 53278905342783254n;
const num = 23;

// console.log(huge * num); This line gives an error

//To mix BigInt and regular numbers we need to convert that number to BigInt
//This where the constructor function comes into play
console.log("mixed", huge * BigInt(num));

//However there are tow  exceptions to this which are the comparison operators
//and the plus operator when working with strings

//This works and we get true
console.log("comparing BigInt vs num", 20n > 15);

//*Exceptions
//However this does NOT work and we get false
console.log(20n === 20);
//But that makes sense because when we use the === JavaScript doesn't do the type coercion
console.log(typeof 20n);
//However if we use == for checking equality than the JavaScript will do the type coercion and it will return true
console.log(20n == 20);
//It would even work like this
console.log(20n == "20");

//Another expecting is with strings
console.log(huge + "is REALLY big");

//*Division with BigInt
console.log("10/3", 10 / 3); //result:3.3333335
//But with BigInt it cuts the decimal part
console.log("10n/3n", 10n / 3n); //result:3n

console.log("11/3", 11 / 3); //Result:3.666665
console.log("11n/3n", 11n / 3n); //result:3n

//?Dates and Time
console.warn("Dates and Time");
///*Create a Date
//There are exactly 4 ways of creating dates
//They all use the new Date constructor but they can accept different parameters

//First Way
//This creates a variable with the current date and time
const now = new Date();
console.log("now:", now);

//Second way is to parse the date from a date string
console.log(
  "parsing a date string created by JavaScript:",
  new Date("Fri Apr 22 2022 06:44:59 GMT+0300 (GMT+03:00)")
); //We got this string from the console

//It is generally not a good idea to do this
//Because it can be unreliable
//However if the string was actually created by JavaScript itself then it is pretty safe
console.log("February 2, 1998:", new Date("February 2, 1998"));

//Let's try to parse the date strings inside the accounts
console.log(
  "account1 movementsDates[0]:",
  new Date(account1.movementsDates[0])
);

//Third Way
//We can also do this
//year/month/day/hour/minute/second
console.log(new Date(2037, 1, 2, 4, 32, 17)); //This gives february 2 because the month in JavaScript is 0 based

//JavaScript auto corrects the date
//If we enter february 29 it returns march 1 because there is no february 29 in 2037
//This can be useful sometimes
console.log(new Date(2037, 1, 29, 4, 32, 17));

//Fourth Way
//We can also pass into the date constructor function the amount of miliseconds passed since the beginning of the unix time which is january 1st 1970
//This is actually is pretty useful even though it looks strange
console.log("beginning of unix time", new Date(0));
console.log("3 days after unix time", new Date(3 * 24 * 60 * 60 * 1000));
//the number of the resulting calculation 3*24*60*60*1000 is the time stamp of the day number 3. We'll see why this is useful later

//The dates we have created are here are just another special type of objects
//Therefore they have their own methods just like arrays, maps or strings
//We can use this methods to get or set the components of a date

//?Date Methods
console.warn("Date Methods");
const future = new Date(2037, 10, 19, 15, 23);
console.log("future", future);

console.log("getFullYear", future.getFullYear());
//!There is also get year but never use that
//!Always use getFullYear

//*Remember month is zero based so 10 is not september but november
console.log("getMonth", future.getMonth());

//This gives the day this has a weird name for getting the day
//But that is because getDay doesn't get the day of the month but gets the day of the week
console.log("getDate", future.getDate());

//getDay is used for getting the day of the week
//Zero is the sunday so 4 is the thursday
console.log("getDay", future.getDay()); //result:4

console.log("getHours", future.getHours());
console.log("getMinutes", future.getMinutes());
console.log("getSeconds", future.getSeconds());

//We can also use this to get a nicely formatted string
console.log(future.toISOString());

//We can also get the timestamp of the date
//Timestamp is the miliseconds that has passed since january 1st 1970
console.log("getTime", future.getTime());

//And we can take the number above and reverse it
//Creating a date only with that number
console.log(new Date(2142246180000));

//Timestamps are so important that there is a method to get the timestamp of the current time
console.log("Timestamp", Date.now());

//*There are also set versions for all the methods above

future.setFullYear(2040);
console.log("setFullyear", future);

//?Operations with Dates
console.warn("operations with dates");

//When we convert dates to numbers we get the timestamp
console.log(Number(future));
//We can also do this
console.log(+future);

//?Internationalization
//We can use the Intl API to internationalize dates currencies and much more

//*Dates
console.warn("Internationalization of Dates");

//First we call the Intl namespace then we pass in the country code to the DateTimeFormat function and we call the format method and pass in the date we want to format
//This only gives us the day month and year but not the time
//We can change that by providing an options object to the DateTimeFormat function

Intl.DateTimeFormat("en-US").format(now);

const optionsDate = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};

//In many situations it is makes more sense to get the locale from the users browser
const locale = navigator.language;
console.log(locale);
console.log("date format locale", Intl.DateTimeFormat(locale).format(now));

labelDate.textContent = Intl.DateTimeFormat("tr-TR", optionsDate).format(now);

//*Numbers

console.warn("Internationalization of Numbers");
const number = 3424435.23;

console.log("US:      ", Intl.NumberFormat("en-US").format(number));
console.log("Germany: ", Intl.NumberFormat("de-DE").format(number));
console.log(
  navigator.language,
  Intl.NumberFormat(navigator.language).format(number)
);

//We can also pass in a options object

const optionsNumber = {
  // style: "unit",
  // unit: "mile-per-hour",
  // style: "unit",
  // unit: "celsius",

  //We can also use the percent then the unit is ignored and we get a percentage sign
  // style: "percent",
  // unit: "kilometer-per-hour",

  //We can also specify a currency
  //We have to specify the currency,
  //Currency is NOT defined by the locale
  style: "currency",
  currency: "EUR",

  //We can also turn of the grouping if we want
  //That will cause the number separators to disappear
  // useGrouping: false,
};

console.log(
  "US:     ",
  Intl.NumberFormat("en-US", optionsNumber).format(number)
);
console.log(
  "Germany ",
  Intl.NumberFormat("de-DE", optionsNumber).format(number)
);
console.log(
  navigator.language,
  Intl.NumberFormat(navigator.language, optionsNumber).format(number)
);

//?setTimeout and setInterval

//*setTimeout
//First argument is a callback function and the,
//second argument is the amount of time in miliseconds waited before the callback function is executed
//!What is important to understand is that the execution of the code does NOT stop
//When the execution of the code reaches the setTimeout it will simply call the setTimeout function
//Then it will register the callback function to be called later and the code execution continues
//This mechanism is called asynchronous JavaScript(this will be expanded upon in a later section)
//We can prove that by doing something after the setTimeout
setTimeout(() => console.log("Here is your pizza"), 3000);
console.log("Waiting...");

//!This is a bit complicated and i haven't completely understand it so check the mdn again but
//We might use a wrapper function or the bind function to do the same thing below

//*If we want to pass in arguments to the callback function, we pass those arguments to the setTimeout function as additional arguments

setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1}, and ${ing2}`),
  3000,
  "olives",
  "garlic"
);

//*We can actually cancel the function before the function is triggered

const ingredients = ["olives", "spinach"];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1}, and ${ing2}`),
  3000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

//*setInterval
//When we want a certain function to execute ever x second we can use setInterval

setInterval(
  () =>
    console.log(
      Intl.DateTimeFormat(navigator.language, { timeStyle: "medium" }).format(
        new Date()
      )
    ),
  1000
);
