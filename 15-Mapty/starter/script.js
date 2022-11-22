"use strict";

//We made the map and the mapEvent global variables to pass them around
//But now we want everything that is related to our application inside the App class
//So we will declare them as properties
// let map, mapEvent;

//Structuring the app

class Workout {
  //!Public fields are a new JavaScript feature so check for compatibility before using it
  //If not compatible you can use a property
  date = new Date();
  //!In real projects use a library for creating unique id's
  id = Date.now().toString().slice(-10);

  //clicks are used for demonstrating the public interface
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat,lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  //Clicks are used for demonstrating the public interface
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    //We call this function in the child classes and not on the workout class
    //Because we need the type of the exercise for the _setDescription method to work
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    //We call this function in the child classes and not on the workout class
    //Because we need the type of the exercise for the _setDescription method to work
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([37, 40], 5, 45, 173);

const cycling1 = new Cycling([38, 42], 15, 180, 523);

console.log(run1);
console.log(cycling1);

////////////////////////////////
//Application Architecture

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const btnDelete = document.getElementsByClassName("delete");
const sideBar = document.querySelector(".sidebar");

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #zoomLevel = 13;

  constructor() {
    //Get users location
    this._getPosition();

    //Get data from local storage
    this.#getLocalStorage();

    //We want the event handlers to be attached as soon as the page loads so we put them in the constructor
    //The reason why we don't put the event handler in another method and call that method in the constructor is
    //because we don't want to attach a new handler every time we call that method
    form.addEventListener("submit", this._newWorkout.bind(this));

    //*To change the cadence field to elevation automatically when the workout changes from running to cycling
    //We can use an event listener

    //here we don't have to use the bind method because _toggleElevationField doesn't use the .this keyword
    inputType.addEventListener("change", this._toggleElevationField);

    containerWorkouts.addEventListener("click", this.#moveToPopup.bind(this));

    //Delete app
    // Array.from(btnDelete).forEach(btn => btn.addEventListener("click", this.#deleteWorkout));
    sideBar.addEventListener("click", this.deleteWorkout.bind(this));
  }

  _getPosition() {
    //?Geolocation API
    //Geolocation API is a browser API just like internationalization API and it is a very modern API
    //There are many more modern API's for accessing the users camera or vibrating the users phone

    //This function as an argument takes 2 callback functions
    //First callback function will be called on success,
    //so whenever the browser successfully got the coordinates of the current position of the user
    //Second callback function is the error callback
    //error callback will be called when there is an error getting the users current location
    //We can check if the navigator.geolocation exist to make sure we don't get any errors with older browsers
    if (navigator.geolocation)
      //*Success callback function is called with a parameter called position
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  _loadMap(position) {
    // console.log(position);
    //Destructuring
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},13z`);

    const coords = [latitude, longitude];

    //L is the main function the leaflet library gives us as an entry point
    //map function takes an id of the html element we will use to display the map
    //!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!
    //L is a global variable in the leaflet.js script
    //and any variable that is a global variable in any of the scripts that we use in our code(we can have multiple scripts in our code)
    //is also accessible from other scripts as long as
    //the script that is using the variable appears after, the script the variable is used from in the HTML
    //*So for us to use the L(L is a global variable in the leaflet script) we need the leaflet script to appear before out main script
    //First parameter of the setView is an array of coordinates first is the latitude and the seconds is the longitude
    //Second parameter is the zoom level of the map

    //!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!!!!!IMPORTANT!!!!
    //We get an error when we try to set the #map
    //Because in this instance the .this keyword is undefined
    //The reason for this is:
    //_loadMap is called by the getCurrentPosition function
    //And because of that it is treated as a regular function call NOT as a method call
    //And regular function calls don't have the .this keyword
    //To fix this we bind the callback function of the getCurrentPosition to the .this keyword of the App class(at around line 141 it may change)
    // console.log(this);
    this.#map = L.map("map").setView(coords, this.#zoomLevel);

    //The map we see is made up of small tiles
    //And those tiles come from this URL
    //We will be working with openmap but leaflet can work with other maps including google maps
    //We can google for URLs to change the style of the map
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //on function is not coming from JavaScript
    //It is coming from the leaflet library
    //When leaflet calls this callback function it will do so with a special mapEvent
    //event is created by the leaflet NOT the JavaScript

    //this code gives this error if we don't bind it to the .this keyword:
    //Uncaught TypeError: Cannot write private member #mapEvent to an object whose class did not declare it
    //Reason for this is:
    //_showForm is being used as an event handler function
    //and because it is working as an event handler, .this keyword will be set to the objects that the event handler is attached
    //That objects is the this.#map itself
    //Because of that we are trying to write #mapEvent on the #map
    //If we don't fix this using the bind method
    //This code in the _showForm method <this.#mapEvent=mapE> becomes #map.#mapEvent=mapE(.this keyword points to the #map because that is where we attached the event handler)
    //solution to this is to bind the .this keyword
    //With the bind method <this.#mapEvent=mapE> becomes app.#mapEvent=mapE
    this.#map.on("click", this._showForm.bind(this));

    this.#workouts.forEach((workout) => this.#renderWorkoutMarker(workout));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  #hideForm() {
    //Clear the inputs
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";

    //We need to hide the form immediately first
    //otherwise sliding up animation plays and we don't want that

    form.style.display = "none";
    form.classList.add("hidden");
    //We need to put the display back to grid after the animation plays out
    //Animation takes 1 second to complete
    setTimeout(() => (form.style.display = "grid"), 1);
  }

  _toggleElevationField() {
    {
      inputElevation
        .closest(".form__row")
        .classList.toggle("form__row--hidden");
      inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every((input) => Number.isFinite(input));
    const allPositive = (...inputs) => inputs.every((input) => input >= 0);

    e.preventDefault();

    //Get data from form

    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //Check if data is valid

    //if workout is running, create running object

    if (type === "running") {
      const cadence = Number(inputCadence.value);
      //check if data is valid
      // if (
      //   /!Number.isFinite(distance) ||
      //   /!Number.isFinite(duration) ||
      //   /!Number.isFinite(cadence)) return alert("Inputs have to be positive numbers!"
      //   )
      //We used a function instead of writing it like the code above
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //if workout is cycling, create cycling object
    if (type === "cycling") {
      const elevation = Number(inputElevation.value);
      if (
        !validInputs(distance, duration, elevation) ||
        //We don't check if the elevation is positive because it can be negative when going down a hill
        !allPositive(distance, duration)
      )
        return alert("Inputs have to be positive numbers!");
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to workouts array
    this.#workouts.push(workout);
    console.log(this.#workouts);

    //Render workout on the map as a marker
    this.#renderWorkoutMarker(workout);

    //render workout on the list
    this.#renderWorkout(workout);

    //Hide the form and Clear the input fields
    this.#hideForm();

    //Set local storage for all workouts

    this.#setLocalStorage();
  }

  #renderWorkoutMarker(workout) {
    //Display Marker
    // console.log(this.#mapEvent);
    L.marker(workout.coords)
      .addTo(this.#map)
      //Instead of writing a string we can create a new popup object
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
    // console.log(inputDistance.value);
    // console.log(workout);
  }

  #renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <p class="delete">&Cross;</p>
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</span>
      <span class="workout__value">${workout.value}</span>
      <span class="workout__unit">km</span>
    </div >
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      `;

    if (workout.type === "running") {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>
  `;
    }

    if (workout.type === "cycling") {
      html += `
    <div class="workout__details">
      <span class="workout__icon">${workout.speed.toFixed(1)}</span >
      <span class="workout__value">16</span>
      <span class="workout__unit">km/h</span>
    </div >
        <div class="workout__details">
          <span class="workout__icon">${workout.elevationGain}</span>
          <span class="workout__value">223</span>
          <span class="workout__unit">m</span>
        </div>
  </li >
        `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    // console.log(workoutEl);

    //If we click some other place in the container that is not related we get null
    //We used a guard clause to make sure we don't work with null values
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (workout) => workout.id === workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#zoomLevel);

    //Using the public interface
    workout.click();
  }

  #setLocalStorage() {
    //!!!!!!!!!!!!Important!!!!!!!!!!!!!!!!!!!!!!Important!!!!!!!!!!!!!!!!!!!!!!Important!!!!!!!!!!!!!!!!!!!!!!Important!!!!!!!!!!!!!!!!!!!!!!Important!!!!!!!!!!!!!Important!!!!!!
    //!Local Storage is a very simple API so it is only advised to use for small amounts of data
    //That is because local storage is blocking/we will learn about this in the next section but it is a bad thing
    //*Do NOT use local storage to store large amounts of data

    //Local storage is an AP the browser provides for us to use
    //setItem takes 2 arguments
    //First argument is the name of the stored value
    //Second argument is the value itself
    //So localStorage is a simple key-value storage
    //!Both arguments must be type of string
    //We can use the JSON.stringify to convert any object to string

    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    //We get the data from the local storage using the getItem method
    //We pass in the key of the value we want to retrieve from the local storage
    //This gives a string but we need to convert it back to an object
    //We can do this with JSON.parse()
    const data = JSON.parse(localStorage.getItem("workouts"));
    console.log(data);

    //Check if data exist
    if (!data) return;

    //Because this method gets executed at the beginning of a page reload
    //#workouts is empty
    //So we overwrite it with the data variable
    this.#workouts = data;

    //Now that we have the workouts in the #workouts array
    //We can loop over them and render them on the screen

    this.#workouts.forEach((workout) => {
      this.#renderWorkout(workout);
      //This won't work because we are calling this method at the beginning
      //And for this method to work the map needs to be loaded first
      //So we will move this code to the _loadMap method
      // this.#renderWorkoutMarker(workout);

      //!THE PROBLEM WITH THE LOCAL STORAGE API
      //When we click on the workout the map moves to the workout and the number of clicks increases
      //But with local storage the clicks doesn't increase
      //instead it gives an error(Uncaught TypeError: workout.click is not a function at #moveToPopup(script.js: 416: 13))
      //This happens because the object we get from the local storage has its prototype chain broken
      //So it no longer has the running and the workout class as its prototype
      //We can rebuild the prototype chain using this
      workout.__proto__ =
        workout.type === "running" ? Running.prototype : Cycling.prototype;
    });

    data.forEach((workout) => {
      //!THS DID NOT WORK
      //We can rebuild the prototype chain it using the Object.assign method
      // let obj;
      // if (workout.type === "running") obj = new Running();
      // if (workout.type === "cycling") obj = new Cycling();
      // Object.assign(obj, workout);
      // this.#workouts.push(obj);
    });
  }

  deleteWorkout(e) {
    // if (e.target.classList.contains("delete")) {
    //   // localStorage
    //   const id = e.target.closest(".workout").dataset.id;
    //   // console.log("id1", id);
    //   const el = this.#workouts.findIndex(el => el.id === id);
    //   console.log("el", el);
    //   this.#workouts.splice(el, 1)
    //   if (!localStorage) return;
    //   localStorage.clear();
    //   localStorage.setItem("workouts", this.#workouts)
    //   console.log("workouts", this.#workouts);

    // }
    // console.log("TARGET", e.target);
    const element = e.target.closest(".workout");
    element.remove();
  }

  reset() {
    //We can use this to clear the workouts
    localStorage.removeItem("workouts");
    //reload the page
    //location is a big object that contains a lot of methods and properties in the browser
    //one of the methods reloads the page
    location.reload();
  }
}

const app = new App();

//*We can do this to call the _getPosition as soon as the page loads
//But we can do this inside the class and it will be cleaner
//Inside of the App class we have a methods that is executed immediately
//That methods is the constructor
// app._getPosition();

console.log(btnDelete);

// const a = Array.from(btnDelete)
// console.log(a);
