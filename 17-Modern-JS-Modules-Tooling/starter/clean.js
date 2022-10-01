"use strict";


console.log("%cClean.js", "color:red; background-color:yellow;,font-style:italic;");

//?Object.freeze()
//We can use this method to make an object or an array immutable
//*Object.freeze() only freezes the first level of the object
//So it is not a so called deep freeze, because we can still
//change objects that are inside the object that is freezed
//There are 3rd party libraries that implement a deep freeze
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//This works because the objects insdie the freezed objects 
//are still mutable
// budget[0].value = "dadawdad"

//We can use Object.freeze() to make objects and arrays immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});


const getLimit = (limits, user) => limits[user] || 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  return value <= getLimit(spendingLimits, cleanUser) ? [...budget, { value: -value, description, user: cleanUser }] : state;
  // budget.push({ value: -value, description, user: cleanUser });

};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = function (state, limits) {
  // for (const entry of budget) {
  // const limit= spendingLimits[entry.user]?spendingLimits[entry.user]:limit=0
  //or we can do this
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
  // }

  return state.map(entry => entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: "limit" } : entry)
};
const k = checkExpenses(newBudget3, spendingLimits);
console.log(k);


const logBigExpenses = function (state, bigLimit) {
  //   let output = '';
  //   for (const entry of budget) {
  //     output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : ""

  //   }
  //   output = output.slice(0, -2); // Remove last '/ '
  //   console.log(output);

  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(" / ")
  console.log(bigExpenses);


};

console.log(budget);

logBigExpenses(budget, 500)