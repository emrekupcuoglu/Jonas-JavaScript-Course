//Exporting Module

console.log("Exporting Module");

const shoppingCost = 10;
export const cart = [];

//This is a named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);

}

const totalPrice = 237;
const totalQuantity = 23;

//We can export multiple named exports at once
//We can use the as keyword to export a value with a different name
export { totalPrice, totalQuantity as qt }

//?Default Exports
//Usually we use default exports when we only want to export one thing per module

//If we wanted to export the same function we would simply export the value itself not the variable. No name involved
//When we imported it we can give it any name we want

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);

}


//Blocking code
//!Code below is commented out because parcel doesn't support top-level await
// console.log("Start fetching users");
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finished fetching users");

