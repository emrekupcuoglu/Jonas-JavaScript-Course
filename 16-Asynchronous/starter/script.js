"use strict";

///////////////////////////////////////

//?Synchronous code

//Most code is synchronous
//Synchronous code is executed line by line
//Each line of code waits for the previous line to finish
//With synchronous code long running operations block code execution

//?Asynchronous code

//Asynchronous code is executed after a task that runs on the background finishes(e.g when a using the setTimeout task runs after the timer ends)
//Asynchronous code is non-blocking
//Execution doesn't wait for an asynchronous task to finish its work

//?AJAX Calls
//AJAX stands for Asynchronous JavaScript And XML
//IT allows us to communicate with remote web  servers in an asynchronous way.
//With AJAX we can request data from web servers dynamically

//?API
//API stands for Application Programming Interface
//It is a piece of software that can be used by another piece of software,
//in order to allow applications to talk to each other

//There are many types of APIs in we b development
//DOM API
//Geolocaiton API
//API we can make using classes(public interface)
//"Online" APIs: Applications running on a server, that receives,request for data, and sends data back in response(online term is not real it is used here just for emphasizing the meaning)

//We can build our own APIs(but this requires back-end development e.g. with node.js)
//We can alos use 3rd party APIs(there is an API for everything()

//?API data formats
//XML is used to be a widely used data format for transmitting data on the web
//However no basically API uses XML anymore
//Most APIs these days us e the JSON data format
//JSON is popular becasue it is just a JavaScript object converted to a string,
//tehrefore it is easy to send it across the we b and use it once the data arrives

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//?AJAX Call:XMLHttpRequest
//This is the old school way of doing things
//But it is still important to learn it because you might need it in the future
//And to see how AJAX calls used to be handled with events and callback functions

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        Number(data.population) / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  //We handled the opacity of the container in the finally method
  // countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  //!PUBLIC APIs
  //On github there is a huge repository called public-apis
  //you can find there a ton of public and free apis that you can use
  //!Any API you should use need to have the CORS set to yes or maybe unknown
  //CORS stands for Cross Origin Resource Sharing

  //First argument we pass in is the type of the request(the type of the http request to get data is simply "GET")
  //Second we need a string containing the URL to which the AJAX should actually be made
  request.open("GET", `https://restcountries.com/v2/name/${country}`);

  //We opended the request and now we need to send it
  request.send();
  //In order to get the result we can NOT simply store it in a variable
  //The reason why we can't store it in a variable is
  //because the result is simply NOT there yet
  //The AJAX call we sended is being done in the background while the rest of the code keeps running
  //This is the asynchronous, non-blocking behavior

  //Instead we need to register a callback on the request object for the load event

  //We sended the request and that request fetches the data in the background
  //When it is done it will emit a load event
  //We are waiting for that event using the event listener
  //As soon as the data arrives the callback function will be called
  request.addEventListener("load", function () {
    //.this keyword inside of this function is the request(.this keyword of event listeners always points to the attached element)
    //Response is in the property responseText
    //This property will only be set when the data arrives
    //responseText is a JSON so we need to convert this to an actual JavaScript object
    //This is an array containing only one object so we destructured it
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbour country
    //We used optional chaining to account for countries with no neighbours
    const neighbour = data.borders?.[0];
    console.log(data.borders);

    //AJAX call country 2
    // const request2 = new XMLHttpRequest();
    // request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`)
    // request2.send();

    // request2.addEventListener("load", function () {
    //   const data = JSON.parse(this.responseText)
    //   renderCountry(data, "neighbour")
    // });

    //?Callback Hell
    //Imagine we wanted the neighbour countries of the neighbour countries
    //We would have ended up with callbacks inside callbacks inside callbacks inside callbacks... and so forth
    //We have a special name for that kind of structure and behaviour
    //it is called "Callback Hell"
    //Callback hell is when we have a lot of nested callbacks in order to execute asynchronous tasks in sequence
    //In fact this happens for all asynchronous tasks which are handled by callbacks NOT just AJAX calls

    //This is another callback hell
    //It is easy to identify by it because of the shape the code makes, a triangular shape
    // setTimeout(() => {
    //   console.log("1 second has passed");
    //   setTimeout(() => {
    //     console.log("2 second has passed");
    //     setTimeout(() => {
    //       console.log("3 second has passed");
    //       setTimeout(() => {
    //         console.log("4 second has passed");
    //       }, 1000);
    //     }, 1000);
    //   }, 1000);
    // }, 1000)

    //*Problem with callback hell
    //It makes our look very messy
    //But even more important it makes out code hard to maintain
    //and very difficult to understand and to reason about
    //And code that is hard to understand and,
    //difficult to reason about will have more bugs and it is a bad code

    //*My own code for practice
    data.borders.forEach((neighbour) => {
      const request3 = new XMLHttpRequest();
      request3.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
      request3.send();

      request3.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);
        renderCountry(data, "neighbour");
      });
    });
  });
};

//By calling this function twice we will have two AJAX calls happening at the same time
//In parallel so to say
//If we load the page a couple of times they might appear in different orders
//The reason for that is the data arrives at a slightly different time each time we reload the page
//This really shows the non-blocking behaviour in action
// getCountryAndNeighbour("turkey");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //We handled the opacity of the container in the finally method
  countriesContainer.style.opacity = 1;
};

//?Escaping the callback hell fetch API
const getCountryDataPromise = function (country) {
  //For more complex AJAX calls fetch function can take an object of options
  const request = fetch("https://restcountries.com/v2/name/turkey");
  //fetch returns a promise
  // console.log(request);

  //*Promise
  //Promise is an objects that is used as a placeholder for the future result of an asynchronous operation

  //With promises we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results
  //Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations
  //thereby escaping callback hell

  //?Promise lifecycle
  //Promise starts as pending before any future value is available
  //When the asynchronous task is finished we say the promise is settled
  //There are 2 types of settled promises
  //Fulfilled promises and rejected promises
  //Fulfilled: Success data is now available
  //Rejected: an error has happened

  fetch(`https://restcountries.com/v2/name/${country}`)
    //Callback function of the then method will receive an argument when it is called by the JavaScript
    //And that argument is the resulting value of the fulfilled promise
    .then(
      function (response) {
        console.log(response);

        //?Throwing Errors Manually
        //When we try to reach the API with a wrong country name or code
        //fetch method doesn't throw an error
        //So we need to throw the error manually ourselves
        //When the name or the code of the country is wrong ok property of the response is set to false
        //And the status is set to 500
        //So we check if the ok is false and if it is we throw an error
        if (!response.ok) {
          //We created a new error
          //and terminated the function using the throw keyword similar to the return keyword
          //but because of the throw keyword the promise is immediately rejected
          //and the rejection will propagate all the way down to the catch handler
          throw new Error(`Country not found (${response.status})`);
        }

        //response has a property called body -body has a value of ReadableStream- but we can't directly read it
        //to read it we need call the json method on the response
        //json method is available on all the response objects that is coming from the fetch function
        //Problem is the json function is itself is an asynchronous function as well
        //So it will also return a new promise
        //It it confusing but it is implemented like this and this is just how it works
        //It probably works like this because the stream needs processing to be readable and it takes time
        //*Note that despite the method being named json(), the result is not JSON
        //*but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
        return response.json();
      }
      //?HANDLING ERRORS
      //only way we can get an error with a fetch function is
      //when the internet connection is severed
      //We can handle the error with a second callback function
      //With the second callback function we caught the error
      //Without this second callback function there was an uncaught error
      //You can see the uncaught error in the console without the callback function
      //However we would need to handle the error on the second fetch function as well
      //And that can get annoying but we can handle all the errors globally on a central place
      // function (err) {
      //   return alert(err)

      // }
    )
    .then(function (data) {
      console.log(data);
      const [country] = data;
      const neighbour = country.borders?.[0];
      renderCountry(country);
      console.log(neighbour);

      //!IMPORTANT
      //We return the promise resulting from fetch
      //because we can use the returned value for chaining another then method
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);

      //!IMPORTANT
      //This does work but if we chain the fetch and the method like this
      //we are back tto the callback hell
      //Always return a promise and handled it outside
      // fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
      //   .then(response => response.json())
      //   .then(data => renderCountry(data, "neighbour"))

      //*This is a code i wrote for displaying all the neighbouring countries
      //This code uses the forEach but doesn't go outside for resolving the promise
      //To fix this we can change the renderCountry function a bit
      //We can return an array of promises and render them accordingly
      //THis may or may not work

      // const neighbours = country.borders;

      // neighbours.forEach(n => {
      //   fetch(`https://restcountries.com/v2/alpha/${n}`)
      //     .then(response => response.json())
      //     .then(data => renderCountry(data, "neighbour"))
      //   console.log(n);
      // })
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbour"))
    //!Error handling globally
    //We can handle all the errors no matter where they appear on the chain by adding the catch method
    //Errors propagate down the chain until they are caught
    //Only if they are not caught anywhere we get that uncaught error
    .catch((err) => {
      //Printing the error to the console is not enough in real life applications
      console.error(`${err} 🚩`);
      //!IMPORTANT
      //The error that is generated is a real JavaScript object
      //We can create errors in the JavaScript with a constructor just like a map or a set
      //and any error in JavaScript that is created like this contains the message property
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    //There is also the finally method
    //The callback function in the finally method will always be called
    //No matter the promise is fulfilled or rejected
    //then method is only called when the promise is fulfilled
    //and the catch method is only called when the promise is rejected
    //but the finally method is called regardless
    //We use this method for something that is always needs to happen no matter the result of the promise
    //e.g. hiding the loading spinner
    //In our case we always need to fade in the container
    //Opacity of the container needs to be set to 1 no matter if the the promise is rejected oor fulfilled
    //finally method works because the catch method returns a promise as well
    .finally(() => (countriesContainer.style.opacity = 1));
};

//?Code above but simplyfied
// const getCountryDataPromise=function(country){
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(response=>response.json())
//   .then(data=>renderCountry(data[0]))
// }

//?Helper Function
//It is repetitive to constantly write fetch() then() json()
//So we encapsulate it with a helper function
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryDataPromise2 = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      console.log(data);
      const [country] = data;
      renderCountry(country);
      console.log(country);
      const neighbour = country.borders?.[0];

      if (!neighbour) throw new Error("This country doesn't have neighbours");
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  //When we write a invalid country an error is thrown
  //But the fetch promise only rejects when there is no internet connection
  //In this case there is an internet connection so the promise will still be fulfilled
  //Because there is no rejection the catch handler can NOT pick up on this error
  // getCountryDataPromise("iceland")
  getCountryDataPromise2("turkey");
});

//*My own code for when a neighbour country doesn't exist
//When a neighbour country doesn't exist this code rejects the promise and only the original country is displayed
// const ex = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`)
//     .then(data => {
//       const [country] = data;
//       renderCountry(country)
//       console.log(country.borders?.[0]);
//       if (!country.borders) {
//         return Promise.reject("no neighbour country")
//       }
//       return getJSON(`https://restcountries.com/v2/alpha/${country.borders?.[0]}`)
//     })
//     .then(neighbour => {
//       console.log(neighbour);
//       renderCountry(neighbour, "neighbour")
//     })
//     .finally(() => countriesContainer.style.opacity = 1)
// }

// ex("iceland");

//?Event Loop
//JavaScript is a single threaded language
//So for it to do asynchronous tasks with a single thread it uses an event loop
//A non-blocking event loop to be precise
//When an asynchronous task happens like loading an image or the fetch API
//JavaScript doesn't run it, it runs in the web APIs runtime
//After the image is loaded or an event is triggered
//If we attached an event listener
//JavaScript puts the callback function of the event into the callback queue
//*Callback function is NOT immediately put in the callback queue
//*It is only put there after the load event is fired off
//*So it waits for the asynchronous task to finish first
//When the execution context is empty(except the global context)
//the event loop puts the code in the callback queue into the execution context to be executed
//This called an event loop tick
//Event loop has the extremely important task of coordinating the the callback and the callbacks in the callback queue
//The event loop essentially decides exactly when each callback is executed
//We can also say the event loop does the orchestration of the entire JavaScript runtime
//But this presents a problem for timers
//Callback queen is an ordered data structure like a list
//So if there are callback functions in the queue before the the timers callback function
//And if those callbacks take 2 seconds to execute
//and the timer's callback needs to be executed after 5 seconds
//It will take 7 seconds for the callback to be executed
//First it has to wait for the other functions in the queue and after that it waits for another 5 seconds
//This makes the timers in the JavaScript unreliable
//it only guarantees that the function will be executed after 5 seconds
//But it can be 5 seconds or 10
//JavaScript doesn't have a sense of time
//this becomes clear from this explanation
//Asynchronous tasks do NOT run in the engine
//It is the runtime who manages all the asynchronous behaviour
//and it is the event loop who decides which code will be executed next
//But he engine itself simply executes whatever code it is given

//*DOM events also use the callback queue even though they are not asynchronous

//*Things work slightly different with promises
//The callbacks related to the promises like the promises then() method
//do not go to the callback queue, instead callbacks of promises have a special queue
//They go into the microtasks queue.
//Special thing about the microtasks queue is that it has priority over the callback queue.
//At the end of an event loop tick
//so after a callback has been taken from the callback queue
//the event loop will check if there are any callbacks in the microtasks queue
//And if there are callbacks in the microtasks queue
//it will run all of them before running any more callbacks from the regular queue
//*We call these callbacks from promises microtasks there are other microtasks but it is not relevant here
//If a microtask add another microtask then that callback must be executed before the regular callback queue
//And if we keep adding more and more microtasks we can starve the callback queue
//Because if we keep adding more and more microtasks then the callbacks in the regular callback queue can never execute
//This is usually never a problem but it is still a possibility

//?The Event Loop in Practice

const eventLoopTest = function () {
  console.log("Test Start");
  setTimeout(() => console.log("0 sec timer"), 0);
  //Promise.resolve allows us to build a promise that immediately resolves
  Promise.resolve("Resolved promise 1").then((res) => console.log(res));

  Promise.resolve("Resolved promise 2").then((res) => {
    //Let's simulate this callback taking too much time by looping over a large number
    //The promise is resolved immediately
    //So the asynchronous tasks doesn't take time
    //But the microtask it put into the microtasks queue takes a long time
    //This takes a few seconds to execute
    //so the 0 sec timer takes more than 0 second to finish
    //It waits for this microtask to finish
    for (let i = 0; i < 1000000000; i++) {}

    console.log(res);
  });

  console.log("Test end");
};

//?Building a Simple Promise

//Promises are special kinds of objects

//Promise constructor takes exactly one argument
//and that is the so called executor function.
//As soon as the Promise constructor runs it will automatically execute the
//executor function that we pass in.
//And as it executes this function, it will do so by passing in 2 other arguments.
//Those arguments are the resolve and the reject functions
//The executor function that we specified here
//will contain the asynchronous behaviour that we are trying to handle with the promise
//So this executor function should eventually produce a result value
//The value that will become the future value of the promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening");

  setTimeout(function () {
    //Let's say we win the lottery the 50% of the time
    if (Math.random() >= 0.5) {
      //To fulfill the promise we use the resolve function
      //We pass the fulfilled value of the promise into the resolve function,
      //so that it can later be consumed with the then() method
      resolve("You WIN");
    } else {
      //We pass in the error message into the reject function
      reject(new Error("You lost"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

const promisify = function () {
  //?promisifying
  //In practice most of the time we only consume promises
  //We only build promises to wrap old callback based functions into promises
  //This is a process promisifying
  //Basically promisifying needs to convert callback based asynchronous behaviour to promise based

  //Promisifying setTimeout
  const wait = function (seconds) {
    //We don't need the reject function this time because it is impossible for the timer to fail
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  wait(1)
    .then(() => {
      console.log("1 second passed");
      return wait(1);
    })
    .then(() => {
      console.log("2 seconds passed");
      return wait(1);
    })
    .then(() => {
      console.log("3 seconds passed");
      return wait(1);
    })
    .then(() => console.log("4 seconds passed"));

  //We escaped a callback hell by promisifying the setTimeout function
  //If we hadn't we would had to do it like this
  // setTimeout(() => {
  //   console.log("1 second has passed");
  //   setTimeout(() => {
  //     console.log("2 second has passed");
  //     setTimeout(() => {
  //       console.log("3 second has passed");
  //       setTimeout(() => {
  //         console.log("4 second has passed");
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }, 1000)
};

// promisify();

//?Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(position => console.log(position),
//   err => console.error(err))
//Geolocation API is asynchronous we can check it by writing to the console
//Even though this line of code is later it will show up earlier because geolocation takes time to compute
// console.log("Getting location");

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      //When the API successfully gets the location we want to resolve the promise
      //and pass in the position object
      //because that is the value we want to get from this fulfilled promise
      (position) => resolve(position),
      //If we get an error we use the reject function
      (err) => reject(new Error(err))
    );
  });
};

//We can make this even simpler
const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    //If the getCurrentPosition function automatically calls these callback functions
    //and if it also automatically passes in the position
    //then we can simply do this
    //This works because when the getCurrentPosition function is successfully gets the location
    //it calls the first callback function with the position argument
    //So this is equal to calling this like this *resolve(position)*
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition2().then((response) => console.log(response));

//?Consuming Promises with Async/Await

//We turn this function into an async function by adding the async keyword in front of the function
//When this function is done it automatically returns a promise(more on that later)
//Inside an async function we can have one or more await statements
const whereAmI = async function () {
  //In an async function we can use the await keyword to wait for the result of the promise
  //await will stop the code execution at this point of the function until the promise is fulfilled
  //You might think that stopping the execution is blocking the execution
  //But the answer is no in this case
  //!Stopping the execution in an async function is not a problem because:
  //This function is running in the background
  //Therefore it is NOT blocking the main thread of execution
  //It is not blocking the callstack
  //That is what so special about async/await
  //It makes our code look like regular synchronous code,
  //while behind the scenes everything is asynchronous
  //As soon as the promise is resolved value of the await expression is going to be the resolved value
  //we can store that inside a variable
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=704785914225166312361x14413`
    );
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    console.log(res);

    if (!res.ok) throw new Error("No country is found");

    //!IMPORTANT
    //async/await is simply syntactic sugar over the then method in promises
    //So behind the scenes we are still using promises
    //We are simply using a different way of consuming them

    //This is essentially the same thing as the code below:
    // fetch(`https://restcountries.com/v2/name/${country}`)
    // .then(response=>console.log(response))

    //Previously we would of need to chain another then() method
    // to the json method but now we can use the await keyword

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong ${err.message}`);

    //*Reject promise returned from the async function
    //re-throwing the error
    //We handled the error inside the catch block but
    //because we are using the whereAmI function with the then() method outside of the async function
    //we need to throw the error so that it can propagate downwards to be handled by the catch() method
    //We do this because we handle the errors internally with the try/catch blocks
    //but when we use the then() method we are using this function externally
    //and to catch the error externally we need to throw the error
    //!So when using async/await with the then() method throw the error
    throw err;
  }
};

// whereAmI()

//?Error Handling with try... catch
//We need a way to catch errors
//and we cannot use the catch method with async/await
//because we can't attach it anywhere

//try catch was implemented well before async/await

//We can wrap our code in a try block
//when we do this JavaScript will try to execute this code

//Let's say that we are trying to assign the y variable to another value
//but we make a mistake and try to assign the x which is a constant
//We would get this error:Uncaught TypeError: Assignment to constant variable.
// let y = 1
// const x = 2
// x = 3;

const tryCatch = function () {
  try {
    let y = 1;
    const x = 2;
    x = 3;
  } catch (err) {
    //catch block will have access to the whatever error occurred in the try block
    //with this script no longer ends abruptly
    //we can catch the error and handle it accordingly
    console.error(err);
  }

  //*This is used above to catch errors in the async code
};

//?Returning Values From Async Functions

// console.log("1: Will get location");
//WhereAmI returns a promise because
//at the time of assigning the return value of the whereAmI function
//whereAmI is still executing in the background
//Remember that we can NOT assign values from async functions like this
// const city = whereAmI();
// console.log(city);

//Instead we use the then() method to get the data from the promise

const async1 = function () {
  whereAmI()
    //This here doesn't work as expected
    //Even though there is an error with getting the geocode
    //the then() method is executed instead of the catch() method
    //this means that the function the async function returns is fulfilled even though there is an error
    //To fix this we need to re-throw the error(we did this above)
    .then((city) => console.log(`2: ${city}`))
    .catch((err) => console.error(`2: ${err.message} 🔴`))
    .finally(() => console.log("3: Finished getting location"));
};

// async1();

//?Converting the code above into an async/await code
//Code above combines the old way and new way(async/await and the then(method))
//We can use only the new way by converting this into an async function

//We don't want a new complete function so we'll use an IIFE

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.warn(`2: ${err.message} 🚩`);
  }
  //We put what was in the finally() method outside of the catch block at the end of the code to always execute no matter the outcome of the promise
  console.log("3: Finished getting location");
})();

//?Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    //This doesn't make sense because wea re loading them one by one
    //We don't need them to be in a certain order
    //They don't depend on each other
    //So we can run these codes in parallel
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
    // console.log([data1.capital, data2.capital, data3.capital]);

    //This method will take an array of promises and it will return a new promise
    //which will run all the promises in the array at the same time
    //!IMPORTANT
    //If one of the promises reject than all of the promises get rejected
    //because Promise.all() is rejected
    //We say that Promise.all() short-circuits when one promise rejects
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data);

    const capitals = data.map((d) => {
      const [el] = d;
      return el.capital;
    });
    console.log(capitals);
  } catch (err) {
    console.log(err);
  }
};

get3Countries("turkey", "germany", "usa");

//?Other Promise Combinators

//?Promise.race
//Promise.race, just like other combinators, receives an array of promises and returns a promise
//Promise returned by Promise.race is settled as soon as one of the input promises settles
//In Promise.race basically first settled promise wins the race
//IF the winning promise is a fulfilled promise then the
//fulfillment value of the whole Promise.race promise is going to
//be the fulfillment of the winning promise
//If the promise that won is rejected then we get an error

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
    getJSON(`https://restcountries.com/v2/name/turkey`),
  ]);

  console.log(res[0]);
})();

//In the real world Promise.race is very useful too prevent against never ending promises or  very long promises
//For example if the user has a very bad internet connection,
//then the fetch request in your application might take too long to be useful
//So we can create a timeout promise which automatically rejects after a certain time has passed

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

//If the request takes too long and the timeout happens first then
//Promise.all will be rejected and we will get an error saying "Request took too long!"
Promise.race([getJSON(`https://restcountries.com/v2/name/turkey`), timeout(0)])
  .then((data) => {
    console.warn("Promise.race");
    console.log(data[0]);
  })
  .catch((err) => {
    console.warn("Promise.race");
    console.error(err);
  });

//?Promise.allSettled
//This is a pretty ne one from ES2020
//It takes an array of promises and it returns an array of all the settled promises
//It is similar to the Promise.all in that it also returns an array of promises
//but Promise.all short-circuits as soon as one promise rejects
//but Promise.all never short-circuits

Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Fail"),
  Promise.resolve("Another Success"),
]).then((data) => {
  console.warn("Promise.allSettled");
  console.log(data);
});

//?Promise.any
//Promise.any is even newer then Promise.allSettled
//It is introduced in ES021
//Promise.any takes an array of promises
//This one will return the first fulfilled promise
//and it will simply ignore rejected promises

//Promise.any is very similar to Promise.race
//The difference is with Promise.any rejected promises are ignored
//Therefore result of Promise.any is always going to be a fulfilled promise unless all of them reject

Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Fail"),
  Promise.resolve("Another Success"),
])
  .then((data) => {
    console.warn("Promise.any");
    console.log(data);
  })
  .catch((err) => {
    console.warn("Promise.any");
    console.error(err);
  });

//?Coding Challange

// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own �
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that �)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK �

const getImg = function () {
  const image = document.querySelector(".images");

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;
      img.addEventListener("load", () => {
        image.append(img);
        resolve(img);
      });

      img.addEventListener("error", () => reject(new Error("Image not found")));
    });
  };

  let currentImg;

  createImage("./img/img-1.jpg")
    .then((img) => {
      currentImg = img;
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = "none";
      return createImage("./img/img-2.jpg");
    })
    .then((img) => {
      currentImg = img;
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = "none";
      return createImage("./img/img-3.jpg");
    })
    .catch((err) => console.error(err));
};

// getImg();

//?Coding Challenge

// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array �
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK

const loadNPause = async function () {
  const image = document.querySelector(".images");

  const wait = function (seconds) {
    //We don't need the reject function this time because it is impossible for the timer to fail
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;
      img.addEventListener("load", () => {
        image.append(img);
        resolve(img);
      });

      img.addEventListener("error", () => reject(new Error("Image not found")));
    });
  };
  try {
    let img = await createImage("./img/img-1.jpg");
    await wait(2);
    img.style.display = "none";
    img = await createImage("./img/img-2.jpg");
    await wait(2);
    img.style.display = "none";
    img = await createImage("./img/img-3.jpg");
  } catch (err) {
    console.error(err);
  }
};

const loadAll = async function (imgArr) {
  const image = document.querySelector(".images");

  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement("img");
      img.src = imgPath;
      img.addEventListener("load", () => {
        image.append(img);
        resolve(img);
      });

      img.addEventListener("error", () => reject(new Error("Image not found")));
    });
  };

  try {
    const imgs = imgArr.map(async function (imgPath) {
      console.log(imgPath);
      return await createImage(imgPath);
    });
    console.log(imgs);

    const a = await Promise.all(imgs);
    a.forEach((img) => img.classList.add("parallel"));
  } catch (err) {}
};

// loadNPause();

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
