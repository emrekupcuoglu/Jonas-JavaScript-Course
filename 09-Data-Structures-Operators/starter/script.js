"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section

//?Data Destructuring
//Destructuring is an ES6 feature and
//it is basically a way of unpacking values from
// an array or an object into separate variables
//in other words destructuring is
//a way to break up a complex data structure down into smaller data structures like variables
//for arrays we use destructuring to retrieve elements from an array
//and store them in variables in an easy way

//Without Destructuring

const arr1 = [2, 3, 4];
const a = arr1[0];
const b = arr1[1];
const s = arr1[2];
console.log("without destructuring", a, b, s);

//With Destructuring
const [x, y, z] = arr1;
console.log("with destructuring", x, y, z);
//Original array is unaffected
console.log(arr1);

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    address,
    time = 20.0,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and, ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//We do NOT need top take all the elements from the array
//we only got the first two elements from the array
const [first, second] = restaurant.categories;
console.log(first, second);
//if we want to only get the first and the third element from the array
//we simply leave a blank space between the first and the third
//like this:
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
//second element is skipped

//let's say the owner of the restaurant decide to change the main and the secondary category
//Right now primary is "Italian" and, secondary is "Vegetarian"

//switching variables without destructuring
const temp = main;
main = secondary;
secondary = temp;
console.log("without destructuring", main, secondary);

//with destructuring we can make it a lot easier

//Mutating Variables
[secondary, main] = [main, secondary];
console.log("with destructuring", main, secondary);

// !!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!
//With destructuring we can have an function return an array
//and immediately destruct the result into different variables
//this allows us to return multiple values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested Arrays
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);
//this returns the first value "2" as number and the third value [5,6] as an array

//to get all of the values we would have to do destructuring inside of destructuring

const [k, , [l, m]] = nested;
console.log(k, l, m);

//Default Values
//we can also set default values for variables when we are extracting them
//that is going to be very useful when we don't know the length of the array
//if we have an array that is shorter than we think
//then we might try to unpack the array in positions that don't even exist

const [p, q, r] = [8, 9];
console.log(p, q, r);
//this gives us undefined for the r because this is basically
//trying to read the elements at index 2 which doesn't exist
//we can use the "=" for setting default values for the variables

const [w = 1, v = 1, u = 1] = [8, 9];
console.log(w, v, u);

//?Destructuring Objects

//with objects order doesn't matter
//we can take any property in any order we want
//but the variable names must match the properties of the object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//if we wanted the variable names to be different than property names

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Default Values
//It can be useful to have default values for the case we are trying to read a property that doesn't exist on the object
//in that case we usually get undefined

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
//menu is not defined in the object so we get the default value which is an empty array

//Mutating Variables

let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };
// {d,e}=obj; this line throws an error because
//when a line starts with curly braces {} JavaScript expects a code block
//to solve this we wrap the code in parenthesis
({ d, e } = obj);
console.log(d, e);

//*Nested Objects

//we have already stored openingHours inside a variable
//so we will use that

const { fri } = openingHours;
console.log(fri);
//we get the object "fri" but we want 2 variables opening hours and closing hours
//so we need to further Destructure it
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//we can give the variables different names to
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//Using Destructuring to Create Named Parameters
//JavaScript doesn't have name arguments(which is really dumb and sucks)
//but this is a work around kinda...

restaurant.orderDelivery({
  address: "5th Avenue",
  mainIndex: 1,
  starterIndex: 2,
  time: "22.00",
});

//?Spread Operator ...

const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

const goodNewArr = [1, 2, ...arr2];
console.log(goodNewArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

//Spread operator ... is similar to destructuring big difference is:
//spread operator takes all the elements from an array and it doesn't create any new variables
//with spread operator we don't need default values because there is always a value
//and as a consequence we can only use them in places where we would use values separated by commas
//with destructuring we can specify which values we want from the array and default values if they don't exist
//and we assign them to variables

//Spread operator works on all iterables
//iterables will be cover later when it is needed but for now:
//iterables are things like:arrays, strings, maps, or sets
//but NOT objects

// Copying arrays with spread operator
//copying arrays using the spread operator creates shallow copies
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//Join 2 Arrays
const combinedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(combinedMenu);

const str = "Emre";
const letters = [...str, "", "K."];
console.log(letters);
console.log(...str);
//spread operator gives values separated by commas
//and values separated by commas are usually expected when we pass arguments into a function
//or when we build a new array

//*Real World Example
// const ingredients = [prompt("Let's make a pasta ingredient 1?"), prompt("Let's make a pasta ingredient 2?"), prompt("Let's make a pasta ingredient 3?")];
// console.log(ingredients);

//Old way
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//New Way
// restaurant.orderPasta(...ingredients);

//Objects
//Starting in 2018 we can use the spread operator with objects

const newRestaurant = { foundedIn: 1995, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

//*Shallow Copy

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Dayının yeri";
console.log(restaurant.name);
console.log(restaurantCopy.name);

//*REST pattern and parameters
//rest and spread has the same syntax
//if the ... is on the right side then it is the spread operator
//if it is on the right side then it is the rest operator
//rest is the opposite of spread
//it groups elements into an array

//*SPREAD
const arr3 = [1, 2, ...[3, 4]];

//*REST
const [aa, bb, ...others] = [1, 2, 3, 4, 5];
console.log(aa, bb, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
//Rest operator doesn't include any skipped elements, pasta was skipped and it is not in the array created by the rest operator
//and the rest element must be the last element in the example above it can't be before pizza or risotto
//and there can only be one rest in any destructuring assignment

//? Objects

const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat);

//Making a proper add() Function using the rest operator
//JavaScript doesn't have a proper add function WTF?!

//we are using the rest operator to store the numbers into an array
//....numbers is an array that is made up of the arguments that is passed on to it when the function is called
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};

//we are passing regular numbers as parameters but the add function converts these numbers separated by commas, to an array using the rest operator
console.log(add(2, 3));
console.log(add(2, 3, 4));
console.log(add(2, 3, 4, 9, 1, 25));

//we can also pass an array using the spread operator
const addArray = [23, 5, 7];
// because the function parameter we are passing the argument into has a rest operator we need to first take the elements out of the array we are passing
//spread and rest are opposites of each other
//we unpack the addArray first with spread then pack it back in the function parameter
//we can use the spread operator for this
console.log(add(...addArray));

restaurant.orderPizza("mushrooms", "onion", "chicken", "olives");
restaurant.orderPizza("salami");

//?SHORT CIRCUITING
//3 properties of logical operators that weren't covered before
//they can use Any data type, they can return ANY data type, and they can do short circuiting or short circuit evaluation
//if the first value is truthy than the first value will be returned second value will not be even evaluated
//JavaScript will not even look at it this is called short-circuiting
console.log("--------OR--------");
console.log(3 || "Emre");
console.log("" || "Emre");
console.log(true || 0);
console.log(undefined || null);
console.log(null || undefined);
console.log(undefined || 0 || "" || "hello" || 23 || null); //result of this operation is "hello" because undefined, 0 and, empty string are falsy values but "hello" is a truthy value and it is returned
//23 is also a truthy value but "hello" is the first one so "hello" is returned and the values after that aren't even assessed
//because "hello" is truthy it short-circuits the whole operation

//let's say we want to access the numGuest property on the restaurant object and assign it to a variable
//if there is no numGuests property we want a default value we can do this in two ways
//first using a if statement or a ternary operator
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
//or we can use short-circuiting
const guests2 = restaurant.numGuests || 10;
console.log(guests2);
//both of the solutions above won't work if number of guest equals to =0

//AND operator works the exact opposite to the OR operator
//it short-circuits to the first falsy value
console.log("--------AND--------");
console.log(0 && "Emre");
console.log(7 && "Emre");
console.log("hello" && 23 && null && "true" && undefined); //first falsy value is null && operator so it short-circuits the whole operation and returns the first falsy value undefined is also a falsy value but it is not even evaluated because of the short-circuiting

//we can use the AND operator to avoid an if statement like this one where all we want to do is to check if a certain value or a property exist
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "salami");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "salami");
//first we evaluate if the orderPizza method exist, if it doesn't exist then we return nothing.
//If it does exist then we call the function.

//we can use the OR || operator to set default values
//we can use the AND operator to execute code on the second operand if the first operand is truthy

//?NULLISH COALESCING OPERATOR ??
//this is a new operator that is introduced in ES2020
//nullish coalescing operator works with nullish operators instead of truthy or falsy values
//Nullish Values:null and undefined
//only nullish value swill short-circuit the operation
//so with this "" or 0 will not short-circuit the operation
//with this we can solve the problem we faced when the numGuests=0 was returning a falsy value and with that the value of the guests were assigned to the default value of the guests
//we can sue nullish coalescing operator to fix this issue

const guests3 = restaurant.numGuests2 ?? 10;
//because 0 is not a nullish value the second operand executed
//if we comment out the restaurant.numGuests than we would get undefined as a value
//and it would short-circuit the operation and nothing would of happened
console.log(guests3);

//?LOGICAL ASSIGNMENT OPERATORS
//these operators were introduced in ES2021

const restaurant1 = {
  name: "Capri",
  numGuests: 0,
};
const restaurant2 = {
  name: "Piazza",
  owner: "Giovanni",
};
const restaurant3 = {
  name: "Çaycı",
  numGuests: 0,
};
const restaurant4 = {
  name: "Uncle's Place",
};

//*OR assignment operator
restaurant1.numGuests = restaurant1.numGuests || 10;
restaurant2.numGuests = restaurant2.numGuests || 10;

//*With Logical Operators
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10;
//we have the same problem as before if the  numGuests =0 it would return a false value
//because 0 is a falsy value OR operator assigns a default value of 10 to numGuests even though numGuests has a valid value of 0
console.log(restaurant1);
console.log(restaurant2);

//*Logical Nullish Assignment Operator

restaurant3.numGuests ??= 10;
restaurant4.numGuests ??= 10;
console.log(restaurant3);
console.log(restaurant4);

//*AND Assignment Operator
// restaurant1.owner = restaurant1.owner && "Anonymous";
// restaurant2.owner = restaurant2.owner && "Anonymous";
//if we use the code above and there is not a owner property then it returns undefined
// but the code below doesn't return undefined
//instead of the above we can do this:
restaurant1.owner &&= "Anonymous";
restaurant2.owner &&= "Anonymous";
console.log(restaurant1);
console.log(restaurant2);

//?For Of Loop
console.warn("------FOR OF LOOP------");
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for of loop gives you the current element
for (const item of menu1) {
  console.log(item);
}
console.log("end of the for of loop");
//to get the current index also is bit of a pain
for (const item of menu1.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log("for of loop with destructuring");
//but we are smarter than this so let's do it in a better way
//we can destructure the item array right inside the for loop
for (const [i, el] of menu1.entries()) {
  console.log(`${i + 1}: ${el}`);
}

//this is an alternative
console.log("for of loop with keys");
for (const i of menu1.keys()) {
  console.log(`${i + 1}: ${menu1[i]}`);
}

console.log("for of loop with indexOf");
//this is an alternative also
for (const item of menu1) {
  console.log(`${menu1.indexOf(item) + 1}: ${item}`);
}

//to take a look at menu1.entries we need to create a new array with the elements of menu1.entries

// console.log([...menu1.entries()]);
//it it basically a array which in each position contains a new array
//which contains the index number of the element and the element

//?ES6 ENHANCED OBJECT LITERALS

const color = ["red", "blue", "green"];

const colors = {
  [color[0]]: {
    tint: "light",
    shade: "dark",
  },
  [color[1]]: {
    tint: "light blue",
    shade: "dark blue",
  },
  [`color ${2 + 3}`]: {
    tint: "peaceful",
    shade: "military",
  },
};

const car = {
  carModel: "Toyota",
  year: 1988,
  owner: "Faruk Dayi",
  //if we want to add a separate object to this object
  //we can add the color object to this object
  //old way of doing:
  // colors: colors,

  //there is not a problem with this approach but it can be annoying because
  //the property names is exactly the same as the variable name from which we are getting this new object
  //with enhanced literal objects we can use this:
  colors,
  //this will take the colors object and put it into the car object and create a property name with exactly that variable name

  //with ES6 we no longer have to create a property and set it to a function expression
  //old way of writing methods:
  oldMethod: function () {},

  //ES6 way of doing:
  newMethod() {},
};
console.log(car.colors);

//?Optional Chaining Operator ?.

//let's say we are trying to read a property that doesn't exist
//this can happen when we get the data from an API call
//if the property exist we want to do stuff
//we can use if or logical operators for that
if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
//we are checking if the mon is a valid property
//if the openingHours was an optional property then we would need to check the restaurant object if opening hours exist than if monday exist
//this would be like this

if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

//*WITH OPTIONAL CHAINING

//only if the property before the question mark (?) (mon in this case) exist then open will be read
//if it doesn't exist then undefined will be returned
//this is similar to the nullish concept, a property exist if it's not null and not undefined
console.log(restaurant.openingHours.mon?.open);
//we can have multiple optional chainings

//here we are testing for openingHours and mon these are the two optional properties that we don't know beforehand that if they exist
console.log(restaurant.openingHours?.mon?.open);
//if the openingHours doesn't exist then we won't get an error with this

const days = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(
    `On ${day} we are${open === "closed" ? "" : " open at"} ${open} `
  );
}

//Methods
//we can also check if a method exist before we call it
//we should use the nullish coalescing operator together
console.log(restaurant.order?.(0, 1) ?? "method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "method does not exist");

//Arrays
//we can use it to check if an array is empty
const users = [{ name: "Emre", email: "emrekupcuoglu@gmail.com" }];

console.log(users[0]?.name ?? "User array is empty");

//WITHOUT OPTIONAL CHAINING

if (users.length > 0) console.log(users[0].name);
else console.log("User array is empty");

//?LOOPING OBJECTS: KEYS, VALUES, ENTRIES

//?PROPERTY NAMES
console.log("Property names");
console.log(Object.keys(openingHours));
//we can use this to compute how may properties are in the object
let openStr = `we are open on ${Object.keys(openingHours).length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

//?PROPERTY VALUES
console.log("property values");
const values = Object.values(openingHours);
console.log(values);

for (const value of values) {
  console.log(value);
}

//?ENTIRE OBJECT
console.log("entire object");
const entries = Object.entries(openingHours);
// console.log(Object.entries(fri));
console.log("entries", entries);
console.log("fri", Object.entries(fri));

//first we loop through entries, entries is an array that is made up of arrays
//and in each array there is a key value pair
//keys are the property names and, value are the values
//first element in the array is the key and the second one is the value
//we use destructuring to store the keys of the properties in the key variable
//second element inside the array is an object for this specific array
//to get the elements inside the object to different variables
//we do another destructuring inside the destructuring to get them
//first variable is the opening hours and the second is the closing
for (const [key, { open, close }] of entries) {
  console.log(`On day ${key} we are open at ${open} and close at ${close}`);
}

//?SETS
//sets are a collection of unique values
//sets can NOT have duplicate values
//sets are case sensitive
//when creating a set we need to write an iterable inside the parenthesis
//in this case it is an array
const orderSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pizza",
  "Pasta",
  "pizza",
]);
console.log(orderSet);

//but strings are also iterables so we can do this:

console.log(new Set("Emre eee"));

// we can get the size of a set with:
console.log(orderSet.size);

//we can check if a certain element is inside the set
console.log(orderSet.has("Pasta"));
console.log(orderSet.has("Bread"));

//we can add elements to the set with:
orderSet.add("Garlic Bread");
orderSet.add("Garlic Bread");
console.log(orderSet);

//we can also delete elements
orderSet.delete("Pasta");
console.log(orderSet);

//we can delete all of the elements of the set at once with:
// orderSet.clear();

//!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!
//there is no way to take an element from a set unlike arrays

//because sets are iterable we can loop through them

for (const order of orderSet) {
  console.log(order);
}

//we can use sets to remove duplicate elements from an array

const staff = ["Chef", "Waiter", "Manager", "Chef", "Waiter", "Waiter"];

//we got the duplicates removed
//if we want to turn it back to an array we can use the spread operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//if all we wanted to know is how many different types of items in the array but not create a new array we can do this

const sizeOf = new Set([
  "Chef",
  "Waiter",
  "Manager",
  "Chef",
  "Waiter",
  "Waiter",
]).size;
console.log(sizeOf);

//?MAPS
//map is a data structure we can use to map values to keys
//like in objects data stored in key value pairs in maps
//big difference is: in maps keys can have any data type
//in objects keys are always are stings
//but in maps we can have any type of key, they can even be objects, arrays, or other maps

//easiest way to create a map is to create it empty without passing anything in
const rest = new Map();

//to fill up the map we can use the set method
//first argument is the key and the seconds is the value
rest.set("name", "Classico Italiano");
//keys don't have to be strings
//lets say the restaurant has two locations
rest.set(1, "Firenze, Italy");
//calling the set method like this not only updates the map but also returns the map it is called on
console.log(rest.set(2, "Lisbon, Portugal"));
//the fact that the set method returns the map allows us to chain it like this:
rest
  .set("Categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed");

console.log(rest);

//we can use the get method to read data from the map

console.log(rest.get("name"));
console.log(rest.get(true));

//we can use boolean keys to create something like this

const time = 21;

//result of the operation in the parenthesis returns a boolean value
//if true we are open if false we are closed
//but this format is hard to read so refrain from over doing it
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// we can also delete elements from the map
rest.delete(2);
console.log(rest);

//maps also have the size property
console.log(rest.size);

//we can also use the clear method to remove all the elements from the map
// rest.clear();
// console.log(rest);

//as said before we can use arrays or objects as map keys
rest.set([1, 2], "Test");
//because of the way the objects are stored in the heap this won't work
console.log(rest.get([1, 2]));
//because for all intents and purposes the array we use to set the map, and the arrays we use to try to get the element are different objects in the eyes of the JavaScript engine
//They are stored in the heap in different locations.. To make it work we need to assign the array we are using it to set it, to a variable then get the elements using that array
const mapArr = [1, 2];
rest.set(mapArr, "Test");
console.log(rest.get(mapArr));
//This is can be used with DOM elements as well
//because they are nothing more than a special type of object
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);

//There is another method we can use to create a map without using the set method
//set method can be cumbersome for larger data sets
//First we create an array inside the parenthesis,
//for key value pairs we create sub-arrays
//each array holds the key in the first position and the value in the second position
const question = new Map([
  ["question", "What is your favorite programming language?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);
console.log(question);
//This structure of arrays inside arrays are the same structure that is returned when the entries method is called
console.log(Object.entries(openingHours));
//This means there is an easy way to convert from maps objects to map
//!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//?CONVERTING OBJECTS TO MAP
console.warn("CONVERTING OBJECTS TO MAP");

const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//?ITERATING OVER MAPS

//Quiz app
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt("What is your answer? "));
const answer = 3;
console.log(question.get(answer === question.get("correct")));

//?CONVERTING MAP TO ARRAY
console.warn("CONVERTING MAP TO ARRAY");
console.log([...question]);

//We also have some methods available to arrays such as:
console.log("entries", [...question.entries()]); //this is the same as console.log([...question])
console.log("keys", [...question.keys()]);
console.log("values", [...question.values()]);

//!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!
//?WHICH DATA STRUCTURE TO CHOOSE

//SOURCES OF DATA
//Check the lecture pdf for information
//data comes from three sources
//1. Program itself: Data  written directly in source code(e.g. status messages)
//2. From UI: Data inout from the user or data written in DOM(e.g. tasks in a TODO app)
//3. From external sources: Data fetched for example from a web API(e.g. recipe objects)

//*Simple List: choose array
//*if you need key value pairs: use object or map

//Data from a web API usually comes in the form of a JSON
//JSON can be easily converted to JavaScrip objects

//?ARRAY VS SETS VS OBJECTS VS MAPS

//*Array vs Sets
//Use arrays when there is a need to store values in order and when these values might contain duplicates
//Use arrays when data needs to be manipulated because there is a ton of useful array methods
//Sets should be only used when working with unique values
//Use sets in situations where high performance is really important because operations like searching for an item or deleting an item from a set can be up to 10x more faster
//One great use case for sets is to remove duplicate values from an array

//*Objects vs Maps
//Objects are the traditional key/value pairs because we didn't had maps before but using objects simply as key/value pairs have a couple of technical disadvantages
//Maps are better suited for simple key/value stores because they have better performance, they can have any type of key, they are easier to iterate and, it is easy to compute their size
//Biggest advantage of objects is probably how easy it is to write them and access data by simply using the dot(.) or the brackets([]) operator
//Also most developers are already used to objects so they keep using them for simple key/value stores
//Use maps when you simply need to map keys to values and also when you need keys that are NOT strings
//If you need functions as values use objects/even though you can use any type for maps, it is hard to call functions as keys from a map and maps don't have the this keyword)
//In objects functions are stores as methods and you can use the this keyword for advanced features
//Use when working with JSON

//?STRINGS
//Strings have useful methods that are similar to arrays

const airline = "TAP Air Portugal";
const airplane = "A320";

//we can get the index of a char in a string using brackets like an array
console.log(airplane[0]);
console.log("B737"[0]);

//we get the length of a string  using the length method
console.log("length of airplane", airline.length);
console.log("length of B737 ", "B737".length);

//we can use the indexOf method as well
//this method is case sensitive
//this gives the first occurrence of that char
console.log("index of r", airline.indexOf("r"));
//to get the last char we use lastIndexOf
console.log("last index of r", airline.lastIndexOf("r"));

//we can also get the index of a whole word
//this give the starting index
console.log(airline.indexOf("Portugal"));

//we can use the indices to extract a part of a string using the slice method
//so it can be useful to know the indices of strings for methods like slice or other methods
//argument of the slice method is the starting index
//slice method returns a substring and it doesn't mutate the original string. It is impossible to mutate strings strings are primitives
console.log(airline.slice(4));

//we can also specify an end parameter in addition to the start parameter
//the end value is not included in the substring
//length of the extracted string is always going to be end-start
//in this case the length is 7-4=3
console.log(airline.slice(4, 7));

//up until this point we hard coded the strings but in many cases we don't know the string we are going to work with
//so let's extract only the first word of the airplane string without knowing any of the indices
//a string starts at the index of 0, and a word ends when there is a space so we can use this to extract the first word
console.log(airline.slice(0, airline.indexOf(" ")));

//to get the last word we can use the lastIndexOf
//we need to add 1 because otherwise the space is included in the substring
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

//we can use a negative argument to start extracting from the end
console.log(airline.slice(-2));

//we can also specify a negative end parameter
//because the end index is not included in the substring the last char is not included in the substring
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const isMiddle = seat.slice(-1);
  if (isMiddle === "B" || isMiddle === "E")
    console.log(`The seat ${seat} is in the middle`);
  else console.log(`The seat ${seat} is not in the middle`);
};

checkMiddleSeat("11B");

//! Normally methods can only be called on objects but strings are primitives so they shouldn't be able to use methods
//!but whenever we call a method on a string JavaScript will automatically turn the string in to an string object with the same content
//!and in that object the methods are called
//!This process is called boxing because it basically takes out string and it puts it in to a box which is the object

console.log(new String("Emre"));
//this is the conversion JavaScript does behind the scenes whenever we call a method on a string
//and when the operation is done object is converted back into a regular primitive string
//and in fact all string methods return primitives even if called on a string object
console.log(typeof new String("Emre"));
console.log(typeof new String("Emre").slice(1));

//this methods are used to change the case of a string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Fix capitalization of a string
const passenger = "eMrE";
//first we turn everything to lowercase
const passengerLowerCase = passenger.toLowerCase();
//then take the first letter from the passengerLowerCase and turn it to uppercase, then get the rest of the string using the slice method and concatenate the rest of the string
const passengerCorrect =
  passengerLowerCase.slice(0, 1).toUpperCase() + passengerLowerCase.slice(1);
console.log(passengerCorrect);

//I have created a function for practice it does the same things as the code above
const capitalize = function (name) {
  const lowerCase = name.toLowerCase();
  const correctName =
    name.toLowerCase().slice(0, 1).toUpperCase() + lowerCase.slice(1);
  console.log(correctName);
};

capitalize("emRE");

//we can use trim, trimEnd and TrimStart to remove white space from strings
const untrimmed = "   hello      ";
console.log(untrimmed.trim());
console.log(untrimmed.trimEnd());
console.log(untrimmed.trimStart());

//comparing emails
const email = "hello@jonas.io";
const loginEmail = "   Hello@Jonas.IO \n";

const lowerEmail = loginEmail.toLocaleLowerCase();
//to get rid of the white space we use another method
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizeEmail = loginEmail.toLocaleLowerCase().trim();
console.log(normalizeEmail);
console.log(normalizeEmail === email);

//I have created a function for practice it does the same things as the code above
const compareEmail = function (correct, user) {
  console.log(user.toLowerCase().trim() === correct ? true : false);
};
compareEmail(email, loginEmail);

//Replacing parts of strings
//we can use replace for this
//first argument is the string/char we want to replace and the seconds argument is what we want to replace it with

const priceGBP = "288,97£";
//USA uses a dot instead of a comma for separating fractions so wee need to change the comma to a dot and the price to $
const priceUS = priceGBP.replace("£", "$").replace(",", ".");
console.log(priceUS);

//we can also replace whole words
const announcement =
  "All passengers come to the boarding door 23. Boarding door 23!. Repeat boarding door 23!";
const regAnnouncement =
  "All passengers come to the boarding door 23. Boarding door 23!. Repeat boarding door 23!";

console.log(announcement.replace("door", "gate")); //this only replaces the first instance of the door to gate
//we can use replaceAll to replace all instances
console.log(announcement.replaceAll("door", "gate"));
//replaceAll is a new method before replaceAll we used to get around this limitation with regular expressions
//to use regular expressions instead of quotes "" we put the string inside slashes /
//then we add g suffix g means global
//that is it now all the occurrences are targeted
//regular expressions is a confusing topic it will be covered later
console.log(regAnnouncement.replace(/door/g, "gate"));

//Methods that return booleans
const plane = "Airbus A320neo";
console.log(plane.includes("320"));
console.log(plane.startsWith("Air"));
console.log(plane.endsWith("neo"));

if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
  console.log("Part of the new Airbus family");
}

const checkBaggage = function (items) {
  //when we receive input from a user we usually start by putting everything into lowercase
  //because that makes it easier to compare it
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed on board");
  } else {
    console.log("Welcome aboard");
  }
};

checkBaggage("I have a laptop, some food, and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("I got some snacks and gun for protection");

//Split and join method
//split methods splits a string to separate elements and stores them in an array
//split takes a separator parameter and splits the string according to that
console.log("A+very+nice+string".split("+"));

//we can combine this with destructuring
const [firstName, lastName] = "Emre Küpçüoğlu".split(" ");
console.log(firstName, lastName);

//we can join the split string with the join method

const newName = ["Mr.", firstName, lastName].join(" ");
console.log(newName);
//we can use anything as the argument
const newName2 = ["Mr", firstName, lastName].join("----");
console.log(newName2);

//let's write a function to capitalize every word of a name

const capitalizeName = function (name) {
  const names = name.toLowerCase().split(" ");
  const userName = [];
  //we don't use name in the for of loop instead we use n
  //the reason for this is:
  //using the same var as the parameter is a bad practice because it can overwrite it
  for (const n of names) {
    // userName.push(n.slice(0, 1).toUpperCase() + n.slice(1));

    //alternative
    // userName.push(n[0].toUpperCase() + n.slice(1));

    // another alternative
    userName.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(userName.join(" "));
};
capitalizeName("jessiCa liZZy aNn FriDaY");
capitalizeName("emre küpçüoğlu");

//Padding
//it might work differently than it is originally thought of
//it makes the string it is called on a specific length
//message variable has a length of 18
//when we specify the first parameter of the padStart as 25
//the total length of the string is increased from 18 to 25
//so it adds a total of 7 + signs not 25
//but it adds a lot more when we try it with "Emre"

const message = "Go to the gate 23!";
console.log(message.length);

console.log(message.padStart(25, "+"));
console.log("Emre".padStart(25, "+"));

//when we chain padStart with padEnd the length of the string will be last chained methods specified length
//so because after the padStart the string is already 25 chars long padEnd will only add 5 + signs
console.log(message.padStart(25, "+").padEnd(30, "+"));
console.log("Emre".padStart(25, "+").padEnd(30, "+"));

//?Real world example
//Credit card number masking

const maskCreditCard = function (number) {
  //to turn the number into a string instead of using String(number) we can do this
  const str = number + "";
  //this works because of type coercion. Because of the + JavaScript converts the number to a string and concatenates them
  //and because the string is empty it turns the number into a string
  const last4 = str.slice(-4);
  return last4.padStart(str.length, "*");
};

console.log(maskCreditCard(456454564564564));
console.log(maskCreditCard("5645651564546456456"));

//Repeat method
const message2 = "Bad weather... All departures are delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line right now ${"✈".repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

//?AT METHOD
//At method is a new addition to the language it is a ES2022 feature
//We can use the at method the get the char at the specified index
console.log("Burak".at(1));
console.log("Burak".at(-1));
