"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"];

//?SLICE METHOD
//We can use the slice method to extract a part of the array
//slice method doesn't mutate the original array and returns a new array

//We can give it a start parameter to start slicing at that index
console.log(arr.slice(2));

//We can also give it an end parameter to stop extracting at that index notice that the end index is not included
console.log(arr.slice(2, 4));

//We can also give it negative arguments to start extracting from a negative index
//This will extract the last two elements from the array
console.log(arr.slice(-2));

//We can also specify a negative end argument
//This will start from the 4th element from the end and end at the second element from the end(end parameter is not inclusive)
//This will output  ["b","c"]
console.log(arr.slice(-4, -2));

//*We can also use the slice operator for creating a shallow copy
console.log(arr.slice());
//This is the same as using the spread operator
console.log([...arr]);
//Using the slice or the spread operator is a personal preference
//*But the only time the slice method is needed when you want to chain multiple methods

//?SPLICE METHOD
//Splice method is similar to the slice method
// The difference is this: splice method mutates the argument while the slice method doesn't NOT
//Splice returns a new array similar to the slice method but it mutates the original array so that it only has the elements before the specified parameter
//In the example below the returned array is ["c","d","e"] and the original array is mutated into ["a","b"]
console.log(arr.splice(2));
console.log(arr);
//In many cases we don't cara about the returned array
//We use it remove elements from the array

//One use case of splice is to remove the last element of an array
//First let's initialize the array to it's first state before mutating it
arr = ["a", "b", "c", "d", "e"];
arr.splice(-1);
console.log(arr);
//init
arr = ["a", "b", "c", "d", "e"];

//The second parameter of the splice function is not the end parameter but the delete count
//So with the first arguments we specify where we want to start deleting and with the second one how many elements we want to delete
//With this elements at index 1 and 2 are removed
arr.splice(1, 2);
console.log(arr);

//?REVERSE
//init
//Reverse method  reverses the order of an array and it mutates the original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

//?CONCAT METHOD
//This method concatenates the arrays into a new one
//This method does NOT mutate the original array
//First array is the array that the method is called on and the second array is the one passed as an argument
//This gives us the first 10 letters of the English alphabet
const letters = arr.concat(arr2);
console.log(letters);
//We can do same with a spear operator as well
//Once again it is a personal preference to use which one you want
console.log([...arr, ...arr2]);

//?JOIN METHOD
//Join method returns a new string that is made up of the elements in the array joined
//This method does NOT mutate the original array
console.log(letters.join("-"));

//?AT METHOD
//This method is a new method added in ES2022

const dummyArr = [23, 11, 64];
//If we wanted to take one of the elements from an array
//let's say the first one we would traditionally do this
console.log(dummyArr[0]);
//With the add method we can do the exact same thing using a method
console.log(dummyArr.at(0));
//This doesn't seem al too useful but there is a particular case where it matters

//Traditional way of getting the last elements from an array
console.log(dummyArr[dummyArr.length - 1]);
//or
console.log(dummyArr.slice(-1)[0]);
//The new at method makes this process easier
console.log(dummyArr.at(-1));

//Again it's a personal preference to use which
//But if you want to get the last element from an array
//or start counting from the end of an array you probably use the at method
//Also if you want to do method chaining(more on that later) at method is perfect for that
//On the other hand if you just want to get a value from an array like the first elements you can keep using the brackets notation
//*At method also works on strings
console.log("emre".at(-1));

//?LOOPING OVER ARRAYS: forEACH METHOD

//Positive values are deposits to a bank account and the negatives are withdrawals
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: You have deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You have withdrew ${Math.abs(movement)}`);
  }
}

//*Let' use a forEach method to do the same but in an easier way

//forEach is a higher order function that takes a callback function
//forEach method loops over the array and for each iteration call the callback function
//and as the forEach method calls the callback function it will pass in the current element of the array as an argument
//in each iteration the callback function receive the element as an argument(the parameter we specified as movement will get the element of that iteration as an argument )
console.warn("Start of the forEach loop");
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You have deposited ${movement}`);
  } else {
    console.log(`You have withdrew ${Math.abs(movement)}`);
  }
});

//*Actually forEach not only passes the current element
//*It also passes in the current element, current index, and the entire array we are looping over
//Therefore we can specify that in the parameter list
console.warn("Start of the forEach loop");
//the first parameters always need to be the current element, the second is the index, and the last parameter is the entire array we are looping over
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You have deposited ${Math.abs(mov)}`);
  } else {
    console.log(`Movement ${i + 1}: You have withdrew ${Math.abs(mov)} `);
  }
});

//!When to use a for of vs forEach loop
//One fundamental difference between them is that you can NOT break out of a froEach loop
//Continue and break statements do NOT work on a forEach loop
//!When you need to break out of a loop you  must use a for of loop but other than that it comes down to preference just like so many other thing is JavaScript

//?forEach with Maps and Sets

//*Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

//When we call forEach on maps the parameters vary slightly
//first parameter is the value, second is the key, and the  third is the entire map
console.warn("forEach loop with Map");
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
  // console.log(map);
});

//*Set
console.warn("forEach loop with Set");
const uniqueCurrencies = new Set(["USD", "GBP", "USD", "EUR", "EUR", "GBP"]);
console.log(uniqueCurrencies);
//first parameter is the value, second is the key, and the  third is the entire map
//But because a set doesn't have keys or indices value and key are equal to each other they are both values
//The reason this is the way it is because:the designers of this method wanted to maintain a consistency
//If they had omitted the key parameter, than it would have been a completely different method separate from the forEach method
//So this works this way because of consistency and it's not that hard to keep the syntax in mind
//And to avoid that confusion we can just write an underscore there
//The underscore in JavaScript means a throwaway variable which is a variable that is completely unnecessary
uniqueCurrencies.forEach(function (value, /*key*/ _, map) {
  console.log(`${value}: ${value}`);
});

//?Map Filter and Reduce Methods
//Check the lecture 149 and the pdf for more information

//*Map method
//Map method is similar to the forEach function that we can use it to loop over arrays
//but it returns a new array. This new array will contain in each position results of applying a callback function to the original array
//It is usually more useful than forEach
//Map method does NOT mutate the original array
console.warn("map Method");

const eurToTry = 16;
const eurToUsd = 1.1;

const movementsTRY = movements.map(function (value, index, arr) {
  return value * eurToTry;
});

console.log(movements);
console.log(movementsTRY);

//We can also use an arrow function as a callback function to simplify it as well
const movementsUSD = movements.map((mov) => mov * eurToUsd);
console.log(movementsUSD);

//Let's use the index in a map method

const movementsDescriptions = movements.map((mov, i) => {
  `Movement ${i + 1}: You have ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
    mov
  )}`;
});

console.log("movementDescriptions", movementsDescriptions);

//*Filter Method
//Filter returns a new array containing the elements that passed a specific condition
//This method also can have three parameters value, index, and the entire array but there are rarely used except the value
//to filter the array we return a boolean value
//if the mov>0 then the method adds that element to the new array
console.warn("filter Method");
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log("deposits", deposits);

//The same thing using a for of loop

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log("depositsFor", depositsFor);

//We can also use it with arrow functions
const withdrawals = movements.filter((mov) => mov < 0);
console.log("withdrawals", withdrawals);

//*Reduce method
//Reduce boils ("reduces") all array elements down to a single element(e.g. adding elements together)
//The first parameter of the reduce method is the accumulator second is the current element, third is the index, and the fourth is the entire array
//Accumulator is like a snowball that keeps accumulating the value we ultimately return
//In the case of adding all the numbers acc would be the sum
//Reduce method has an another parameter different from the callback function
//This second parameter sets the initial value of the accumulator
console.warn("reduce Method");
const balance = movements.reduce(function (acc, current, i, arr) {
  //We add the acc + current to the value of the acc so this is kinda like acc+=current
  //We need to return the accumulator because in each iteration accumulator is returned and updated
  //And in the next iteration the new value is added to the updated value
  //Like this:
  //0:acc=0;
  //acc+=5
  //1: acc=5
  //acc+10
  // 2:acc=15
  console.log(`Iteration number ${i}: ${acc}`);
  return acc + current;
}, 0);

console.log("balance", balance);

//The same thing using a for of loop
let balanceFor = 0;
for (const mov of movements) {
  balanceFor += mov;
}
console.log("balanceFor", balanceFor);

//We can use arrow functions with it too

const balanceArrow = movements.reduce((acc, cur) => acc + cur);
console.log("balanceArrow", balanceArrow);

//Maximum value using the reduce method

const max = movements.reduce(
  (acc, cur) => (cur > acc ? (acc = cur) : acc),
  movements[0]
);

console.log("max", max);

//?Chaining multiple methods
//When chaining multiple methods it can be hard to debug the code if something goes wrong
//For that we can use the array parameter
//Let's say that there is a mistake in the filter method instead of returning deposits it returns withdrawals
//If we want to check the result of the filter method we need to check the array at the next method
//So if there is a problem with the array returned from filter and we want to check it we need to check it in the map method
//Because the resulting array from the filter method is the input of the map method in this case
//This is one the great use cases for having access to the array parameter
console.warn("Chaining methods and debugging");
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    console.log("arr parameter:", arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov);
console.log("totalDepositsUSD", totalDepositsUSD);

//*Find Method
//Find method finds first occurrence of of an element that satisfies a specified condition
//Unlike the filter method find method only returns the first element it finds that satisfies the condition NOT all the elements
console.warn("find Method");
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log("firstWithdrawal", firstWithdrawal);

//With find we can find an object in an array based on a property of the object
//!This example is a few lines below around line 570 because of initialization reasons, beginning of it is marked with a green text

//*FindIndex method
//This method is similar to the indexOf method but with indexOf we can only check if an elements is inside the array
//With findIndex we can check if an element has a property we are looking for and get it's index
//findIndex method also gets the element and the entire arr as an argument
console.warn("findIndex Method");
const findIndex = movements.findIndex((acc) => acc === 3000);
console.log("findIndex", findIndex);

//*Some and Every Methods
//These methods are similar to the includes method but with includes we can only check for equality
//If we want to check for a condition then the some method comes into play

//*Some Method
console.warn("some Method");

//This method returns a boolean value
//Let's say that we want to check if there is a deposits in this array so any number that is above 0
const anyDeposits = movements.some((mov) => mov > 0);
console.log("anyDeposits", anyDeposits);

//*Every Method
//Every method is similar to the some method but it only returns true if all the elements in that array satisfy the specified condition
console.warn("every Method");
console.log(movements.every((mov) => mov > 0));

//*Separate Callbacks
//Until now we always wrote the callback functions inside the array methods but we can write the separately somewhere else and call them as well
//With this we can write the function once and reuse the same function for all kinds of different methods that require callbacks
//And if we wanted to change the function we can change it in one place and all the function would change as well
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));

//*Flat and FlatMap Methods
//These methods are introduced in ES2019
//Let's say that we have a nested array and we want them in a one big array
//We can use the flat method for that
//*Flat Method
console.warn("flat Method");
const nestedArr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log("flat:", nestedArr.flat());

// Flat Method goes only one level deep when flattening an array
//So if we have an array that is even deeper nested and we want to flatten it completely
//We need to modify the depth parameter
const deepNestedArr = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log("flat level 1:", deepNestedArr.flat());
console.log("flat level 2:", deepNestedArr.flat(2));

//*Example is continued below at line 583 because of initialization reasons

//*flatMap Method
//It turns out mapping an array and the flatting it is a fairly common operation
//flatMap essentially combines a map and flat method into a one method that is better for performance
//But flatMap only goes down one level and we can't change it
//If you want to go deeper you still need to use flat

//*Example is continued below at line 594 because of initialization reasons

//?Sorting Arrays
//Sorting is much discussed topic in computer science and there are countless algorithms and methods of sorting values
//This is an important topic that needs further attention
//This course might cover a bit more about it later
//!But it is important to learn data structures more deeply
//For now we are simply going to use the JavaScript's built in sort method

//*sort Method
//Do NOT use sort method with mixed arrays like an array with strings and numbers
//This method mutates the original array
//So be very careful with this method

console.warn("sort Method");
//Strings
const owners = ["Jonas", "Zack", "Adam", "Martha"];
console.log(owners.sort());

//Numbers
//If you take a look at the results of the operation below you'll see that the result are not what you are expecting
//The array is not in order at all
//And the reason for that the sort method does the sorting based on strings
//So basically it converts everything to string then it does the sorting itself
//And if you take a lok at the result as strings then it should make sense
console.log("sort numbers wrong output", movements.sort());
//To fix this we need to pass a compare callback function to the sort method
//This callback function is called with 2 arguments
//*Watch lecture 163 for a deeper understanding of how JavaScript sorts numbers

//callback function checks subtracts b from a ----=> a-b
//if a-b <0 then a will be put before b in the array
//if a-b>0 then b will be put before a in the array
//This works with strings as well

//Ascending Order
movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  a;
  if (a < b) {
    return -1;
  }
});

console.log("movements ascending order", movements);

//Descending Order
movements.sort((a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
});
console.log("movements descending order", movements);

//If we are sorting numbers we can simplify this greatly
//Because we are returning a positive number if a>b,
//and returning a negative number if a<b
//We can simply return the result

//Ascending Order
movements.sort((a, b) => a - b);

console.log("movements ascending order", movements);

//Descending Order
movements.sort((a, b) => b - a);
console.log("movements descending order", movements);

//?More Ways of Creating and Filling Arrays

//*Fill method
//you might expect this code to create an array with only one element number 7
//but it will create 7 "empty" elements
//This might cause some problems if not paid attention but use an array literal if you want to create an array containing only one number
console.warn("fill Method");
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5)); //This does NOT work

//But we can call the fill method on this array to fill it with that specific value
//This mutates the entire array
x.fill(1);
console.log("x", x);

//fill method is a bit similar to the slice method
//Beside the value we want to fill array with,
//we can also specify where we want it to start
const y = new Array(7);
y.fill(2, 3);
console.log("y", y);
//We can also specify an end parameter to stop

const z = new Array(7);
z.fill(3, 3, 5);
console.log("z", z);

//We can also use fill method on other arrays it doesn't NOT have to be an empty array

const arrFill = [1, 2, 3, 4, 5, 6, 7];
arrFill.fill(23, 2, 6);
//It mutates the original array
console.log("arrFill", arrFill);

//!Array.from
//Here we are not using the from as a method on an array
//Instead we are using it on the array constructor that is why, it is Array.from
//And the Array here is the same thing as the, Array in the const x = new Array
//So the Array is a function and on that function object we call the from method
//It will be covered later in detail in the OOP section

//First we write the length then a callback function
console.warn("Array.from");
const j = Array.from({ length: 7 }, () => 1);
console.log(j);

//The callback function's first argument is the current element but we can use a throw away variable here
const i = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(i);

const random = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log("100 random dice rolls", random);

//!PROJECT BANKIST APP
//The reason we are using arrays for this project is because we want to practice on arrays
//The reason we are using objects instead of maps is because  we are pretending we are getting the data from an API
//And whenever we get data from an API this data usually comes in the form of objects

// ?BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//*--------------------EXAMPLE CONTINUED FROM LINE 337 ------------------
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log("account", account);

//Same thing with for of loop

for (const acc of accounts) {
  if (acc.owner === "Jessica Davis") {
    console.log("find with for of loop:", acc.owner);
    break;
  }
}

//*--------------------EXAMPLE CONTINUED FROM LINE 387 ------------------
//We could of used method chaining here
const accountMovements = accounts.map((acc) => acc.movements);
console.log("accountMovements", accountMovements);
const allMovements = accountMovements.flat();
console.log("allMovements", allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log("allBalance", overallBalance);

//*--------------------EXAMPLE CONTINUED FROM LINE 395------------------
//We can sue the flatMap method to achieve the same result above
//But flatMap only goes one level deep, and we can not change it
//So if you need to go deeper than one level you still need to use the flat method

const flatMap = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log("flatMap", flatMap);

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

//!Important
//First we are going to display the account movements
//We could simply start writing our code in the global context however that is not a good practice
//So whenever we do something like this it is always best to create function
//We could of have had the function work on a global variable that would work as well
//But it is a lot better to pass that data directly into the function
//So we passed movements array into the function as an argument

const displayMovements = function (movements, sort = false) {
  //Sorting algorithm
  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;

  //We use this method to set the containerMovements to an empty element
  //This method is similar to the textContent
  //The difference is the textContext only returns the text
  //While the innerHTML returns everything including the html
  //So all the html tags will be included
  console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = "";
  mov.forEach(function (mov, i) {
    const type = `${mov > 0 ? `deposit` : `withdrawal`}`;

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    //Now we need to add this account movement to the page
    //We need to add it to the container as a row for that we use this
    //This method accepts 2 strings
    //First one is the position where we attach the element and te second one is the element
    //With "afterbegin" each new element added is added before the old one
    //We can change this behavior with "beforebegin", "afterend", "beforeend"
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;
  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .reduce((acc, int) => (int > 1 ? acc + int : acc));
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  //We could of done the same thing with a map method but we chose to do it with forEach
  //Because we don't care about it returning a new array we just want to mutate the account objects,
  //so that they have the userName property
  //We are not returning anything we are creating a side-effect(more on this later)
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserNames(accounts);
console.log(accounts);

const updateUI = function (currentAccount) {
  //Display Movement
  displayMovements(currentAccount.movements);
  //DisplaySummary
  calcDisplaySummary(currentAccount);
  //Display Balance
  calcDisplayBalance(currentAccount);
};

//Event Handlers
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  //In HTML default behavior for a submit button is to refresh the page
  //Because this is a button in a from element we need to prevent it from its default behavior
  e.preventDefault();
  // console.log("login");
  const inputUserName = inputLoginUsername.value;
  const inputPassword = Number(inputLoginPin.value);

  currentAccount = accounts.find((acc) => acc.userName === inputUserName);

  //if the account doesn't exist than this if statement gives an cannot read properties of undefine
  //because if the the account doesn't exist find method returns undefined
  //We can solve this with optional chaining
  if (currentAccount?.pin === inputPassword) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    //Clear input fields
    inputLoginPin.value = inputLoginUsername.value = "";
    //After we press the login button we want the focus on the pin field gone
    //For that we use:
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    console.log(currentAccount.movements);
    console.log(currentAccount);
  } else {
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const accountIndex = accounts.indexOf(currentAccount);
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //Delete Account
    accounts.splice(accountIndex, 1);

    //Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }
  console.log(accounts);
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

let sort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  if (!sort) sort = true;
  else sort = false;
  //!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!/!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!If yo want to add a special character like an arrow or a copyright symbol then you have to use the innerHTML
  //!textContent will NOT work
  btnSort.innerHTML = sort ? "&downarrow; SORT" : "SORT";
  displayMovements(movements, sort);
});

//Let' say that we didn't store the movements in our code but we need to get it from the DOM
//When we get it from the DOM we get a node list, not an array and we need an array to use methods on it
//We can NOT use array methods on a node list
//But luckily node list is an iterable and we can use Array.from to convert an iterable to an array

labelBalance.addEventListener("click", function () {
  const el = Array.from(document.querySelectorAll(".movements__value"), (el) =>
    el.textContent.replace("€", "")
  );
  console.log("el", el);

  //We can also use the spread operator
  //But then we would have to do the mapping separately
  // const el2 = [...document.querySelectorAll(".movements__value")];
});

//!Which Array to Use
//Check out lecture 165 and pdf for more information

//?Array Methods Practice

//*Let's get the sum of all the deposits that are deposited into the bank
console.warn("ARRAY METHODS PRACTICE");
//First we need to get all the movements from all the accounts than add them all
//To add them we need them all to be in a big array
//and we need this big array to be a new array
//So first we use the map method to map the movements from the accounts into a new array
//This gives us a big array with sub-arrays that contain the movements we need all of them in the same array so we flatten the array
//Then we need to filter for deposits
//And then we add them together with the reduce method

const bankDepositSum = accounts
  .map((acc) => acc.movements)
  .flat()
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log("bankDepositSum", bankDepositSum);

//We can do the same thing with flatMap which is the preferred way of doing this

const bankDepositSum2 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log("bankDepositSum2", bankDepositSum2);

//*Number of deposits that is $1000 or more

const numDeposits = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;
console.log("numDeposits", numDeposits);

//We can also do this with a reduce method is a bit more complex but it shows the power of the reduce method

const numDeposits2 = accounts
  .flatMap((acc) => acc.movements)
  //We can NOt use acc++ here reason is explained below
  // .reduce((acc, mov) => mov >= 1000 ? acc++ : acc, 0); this does NOT work
  .reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0);
console.log("numDeposits2", numDeposits2);

//++ operator doesn't increment the value but returns the old value
let a = 10;
console.log(a++); //this writes 10 to the console because a++ returns the old value
//But if we print it again it prints 11
console.log(a);

//So when we write count++
//acc is indeed incremented but the old value is returned
//so if the initial value is 0 and we count++ return value is 0 NOT 1

//Fortunately there is a fix for this

//?Prefixed ++ operator
//If we write the ++ before the operand like this ++a, it returns the new value
a = 10;
console.log(++a);

//We can use this for the reduce method

const numDeposits3 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);
console.log("numDeposits3", numDeposits3);

//*Creating an object with reduce
//Goal of this exercise is to create an object so wwe need to start with an object
//For this we set the initial value to an object
const { deposits: numDeposits4, withdrawals: numWithdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;

      //We can also write it like this
      //Using the brackets notation instead of the dot notation
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(numDeposits4);
console.log(numWithdrawals);

//*Convert a string into a title case

const convertTitleCase = function (title) {
  const exceptions = ["or", "with", "a", "an", "the", "but", "on", "in", "and"];
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const converted = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(converted);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

function find_average(array) {
  // your code here
  return array.length === 0
    ? 0
    : array.reduce((acc, cur) => acc + cur, 0) / array.length;
}

const avr = find_average([]);
console.log(avr);
