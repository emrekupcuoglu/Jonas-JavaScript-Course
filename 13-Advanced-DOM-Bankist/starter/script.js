"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//?Implementing Smooth Scrolling
btnScrollTo.addEventListener("click", function (e) {
  //First we need the coordinates of where to scroll to
  //getBoundingClientRect is relative to the viewport
  const s1coords = section1.getBoundingClientRect();
  console.log("s1coords", s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll position(X/Y)", window.scrollX, window.scrollY);
  console.log(
    "Height and width of the viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  //*Old Way of doing things
  //This only works if we are at the top of the page
  // window.scrollTo(s1coords.left, s1coords.top);
  //But if we scroll even a little bit this doesn't work properly
  //This happens because s1coords.left and s1coords.top is relative to the viewport
  //So if the viewport is not at the top of the page we get a different value
  //Solution to this is to add the current scroll position
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  //We can make this better by making the scrolling animation nice and smoother
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: "smooth",
  });

  //*More Modern Way
  //This only works in modern browsers
  //This NOT supported in many browsers check caniuse.com
  // section1.scrollIntoView({ behavior: "smooth" });
});

//Page Navigation

//Code below is inefficient because we are attaching the same event handler to all html elements
//If we had for example 10,000 elements than we would be creating,
//10,000 copies of the same function and that would impact the performance
// document.querySelectorAll(".nav__link").forEach(el => el.addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("LINK");
//We use getAttribute and not the property selector, because we want the relative URL not the absolute URL
//   const id = this.getAttribute("href");
//   console.log("id", id);
//   const scoords = document.querySelector(id).getBoundingClientRect();
//   console.log(scoords);
//   window.scrollTo({
//     left: scoords.left + window.screenX,
//     top: scoords.top + window.screenY,
//     behavior: "smooth",
//   });
// }));

//?Event Delegation
//!This is a really important technique
//!Event delegation is especially important when working with elements that are NOT yer on the page. Like buttons that are added dynamically when using the page
//!Because it NOT possible to add event handlers to elements that do not exist there will an example for this later in the section
//Better method is to use event delegation, with event delegation we use the fact that events bubble up(more on that below)
//We put the event handler on a common parent of all the elements that we are interested in
//In this example it is the unordered list, that the links are in
//So we'll put the event listener on this element and when the user clicks one of the links event is generated and bubbles up
//And then we can catch that event on the common parent element and handle it there

//1. Add event listener to a common parent element
//2. Determine which elements originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  //e.target gives us where the event is originated
  e.target;

  //We only want to handle the events that happen on the links
  //But with this we also handle events if we click on the container around the links
  //We need to match the elements and only handle the events that match
  //This can be hard to come up when using this technique

  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    // We need this or otherwise smooth scrolling doesn't works
    e.preventDefault();
    console.log("INSIDE");
    const id = e.target.getAttribute("href");
    console.log("id", id);
    const scoords = document.querySelector(id).getBoundingClientRect();
    console.log(scoords);
    window.scrollTo({
      left: scoords.left + window.scrollX,
      top: scoords.top + window.scrollY,
      behavior: "smooth",
    });
  } else {
    console.log("OUTSIDE");
  }
});

//Tabbed component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
console.log(tabs);

tabsContainer.addEventListener("click", function (e) {
  //e.target only works for the button itself but not the number inside the button
  //Because the number is inside a span element
  //We can try to get its parent element with
  //e.target.parentElement this works for the number
  //But when we click the button it gives the parent of the button, not the button itself
  //And we need the data attribute inside the button element so this doesn't work as well

  //We need to get the tabs element wherever we click inside the button
  //So we need the parent element if it is a span, but if it is a button we need the button itself
  //We can use the closest method for that
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //If we clicked outside the buttons but still inside the operations__tab-container then we get an error.
  //Because there is no parent element of the operations__tab-container with the class operations tab e.target is null
  //And we get an error saying cannot read properties of null
  //We can use optional chaining or a guard clause to fix this
  //So if the clicked is not a truthy value we exit the function without running the code below it

  //Guard Clause
  if (!clicked) return;

  //We remove the operations__tab--active class on all of the buttons before adding it to the selected button
  //This way only the selected button is active and the other buttons are not active
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //Activate Content Area
  const selectedContent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  selectedContent.classList.add("operations__content--active");
});

//Menu fade animation
const nav = document.querySelector(".nav");

const handleHover = function (e) {
  //We could of have done this without using the closest method and select them using the class names or selecting the parent and then getting the siblings
  //But for learning purposes this is done like this
  //One upside of doing this is that this code not only will work on this navigation bar but it will work with other nav bars too
  //Reason for this is that this chooses the closest element with the nav class, so even if there are more than one nav class this will only choose the closest element
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    //Getting the siblings
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    console.log("siblings", siblings);
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this.opacity;
      }
      logo.style.opacity = this.opacity;
    });
  }
};

//mouseover and mouseenter are similar but mouseenter does not bubble
//And we need the event to bubble
//We can pass in arguments the handleHover like this
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });

//mouseout is the opposite of mouseover
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1)
// });

//*Or we can use the bind method and remove the anonymous callback functions
//With that we don't have to have a function inside another function
//!Passing an "argument" into handler
//We are not really passing an argument to the handler function
//In fact it is impossible to pass an argument to an event handler function
//!A handler function can only have one real argument and that is the event
//If we want to pass in additional values into the handler function
//then we need to use the .this keyword
nav.addEventListener("mouseover", handleHover.bind({ opacity: 0.5 }));

nav.addEventListener("mouseout", handleHover.bind({ opacity: 1 }));

//!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW
//We can use the bind() method like this to pass call private methods from the callback function

class Callback {
  #name = "#private property";

  #privateCallback() {
    console.log(this.#name);
    this.#name = "private property is changed using a private method";
    console.log(this.#name);
  }

  handler() {
    const callback = function (e) {
      e.preventDefault();
      this.#privateCallback();
    };

    const callback2 = callback.bind(new Callback());

    nav.addEventListener("click", callback2);
  }
}

const callbackClass = new Callback();
callbackClass.handler();
//?Sticky navigation

// const initialCoords = section1.getBoundingClientRect();
//Scroll event is not efficient and usually should be avoided
//This especially has bad performance on older smartphones
// window.addEventListener("scroll", function (e) {
//   console.log(this.window.scrollY);

//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// })

//?Intersection Observer API
//This API allows our code to observe changes to the way that a certain target element intersects another element,
//or the way it intersects the viewport

const obsCallback = function (entries, observer) {
  //This callback function here will be called each time the observed
  //element is intersecting the root element at the threshold we defined
  //So in this example whenever the target is intersecting the viewport at 10%(viewport because we set the root to null)
  //then the callback function will be called. It doesn't matter that we scroll up or down it will be called.
  //This function is called with 2 arguments: entries and the observer objects itself
  //entries are actually an array of threshold entries
  //In this case there is only one element but let's create a more general function that loops over entries
  // entries.forEach(entry => console.log(entry))
};

const obsOptions = {
  //root is the element that the target is intersecting
  //root element is the element that we want the target to intersect
  //if we set root to null we intersect the viewport
  root: null,
  //Threshold is the percentage of intersection at which point the callback is called
  //We can specify a single value for the threshold
  //or we can also have multiple thresholds using an array
  //Here we use an array
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

const stickyNav = function (entries, observer) {
  // console.log("entries", entries);
  const [entry] = entries;
  // console.log("entry", entry);
  //If the viewport is NOT intersecting with the .header then we make it sticky,
  //if it is intersecting with the viewport we make it un-sticky
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin is a box of 90 pixels in this case that will be be applied outside of out target element
  //So with this it is as if the .header started 90 pixels before it is actual location
  //With this we make the nav sticky 90 pixels early
  // rootMargin: "-90px"

  //We used 90px because it was the height of the navbar
  //But now we calculate it dynamically
  rootMargin: `${navHeight.height}px`,
});
headerObserver.observe(header);

//?Reveal Sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //We want to only reveal the section that was intersected not all the sections
  //But right now we are observing all the sections with only one observer
  //So we need to make the distinction between sections
  //And we use the target property for that
  //We need to use this if statement because when we load the page an intersection event happens automatically
  //with the target of section--1 so the first section is not animated
  //We can use an if statement because even though the observer is triggered when the page first loads
  //isIntersecting property is false
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  // console.log("revealSection", entry);
  //We don't need the observer after making the sections visible so we can remove the observer to not waste resources
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//?Lazy Loading Images

//We don't want all the images to lazy load
//So we need a way to select only the images that we want to lazy load
//We can use the data-src attribute for this
const imgTargets = document.querySelectorAll("img[data-src]"); //We selected all the images that has the data-src attribute

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace the src attribute with the data-src
  entry.target.src = entry.target.dataset.src;
  //Remove the blur
  //This might work for you but if the user has
  //a slow internet connection or a slow device, this won't work
  //because we lift the blur on the image as soon as possible
  //instead we need to wait for the image to load then remove the blur
  // entry.target.classList.remove("lazy-img");

  //Remove the blur on load
  //This is a bit tricky because replacing of the src with the data-src happens behind the scenes
  //JavaScript finds the new image that it should load and display it behind the scenes
  //And once it has finished loading the image, it will emit the load event
  //Load event is just like any other event so we can listen for it
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
});

imgTargets.forEach((img) => imgObserver.observe(img));

//?Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  const maxSlide = slides.length;
  console.log("sliders", slides);

  //Creating the Dots
  const dotContainer = document.querySelector(".dots");
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      //Code below return a string in this it doesn't matter because JavaScript's type coercion works correctly for the operations in the goToSlide function
      //But if we had try to add numbers in that function we would of get errors
      //So we explicitly convert this to number
      const slide = Number(e.target.dataset.slide);

      goToSlide(slide);
    }
  });

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    //We can select the slide base on a attribute
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  //We refactored the code to make it more DRY
  // slides.forEach((el, i) => {
  //   el.style.transform = `translateX(${i * 100}%)`
  // });

  const goToSlide = function (slide) {
    slides.forEach((el, i) => {
      el.style.transform = `translateX(${i * 100 - 100 * slide}%)`;
    });
    activeDot(slide);
  };

  //This is the same as the code above but refactored
  //We have put this in the init function
  // goToSlide(0);

  //Next Slide

  const nextSlide = function () {
    curSlide++;
    if (curSlide >= maxSlide) curSlide = 0;

    //We refactor the code to make it DRY
    // slides.forEach((el, i) => {
    //   el.style.transform = `translateX(${(i * 100) - (100 * slide)}%)`
    // });
    goToSlide(curSlide);
    console.log(curSlide);
  };

  const previousSlide = function () {
    curSlide--;
    if (curSlide < 0) curSlide = maxSlide - 1;
    goToSlide(curSlide);
    // console.log(curSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowRight") {
      nextSlide();
    }
    if (e.key === "ArrowLeft") {
      previousSlide();
    }
  });

  const init = function () {
    createDots();
    goToSlide(0);
    activeDot(0);
  };
  init();
};
slider();

//?Selecting, Creating, and Deleting Elements
//*Check the lecture 186 because it is harder to grasp these concepts from the mdn documentation

//?Selecting Elements

//*Selecting the document
//Just typing document is not enough to select the document element
//Because document is not a DOM element
//so for example if we want to apply css styles to the entire page we need to select the document
//We have a special way to select the entire document:
console.log(document.documentElement);

//*Selecting the head, and the body
//We can also easily select the head and the body
console.log(document.head);
console.log(document.body);

//We need to use query selector or other methods to select other html elements

//querySelector will return the first element that matches the specified argument
const header0 = document.querySelector(".header");
//We can use the querySelectorAll to select multiple elements
const allSection = document.querySelectorAll(".section");
console.log(allSection);

//We can use get elementByID to select the elements by their id
//Here we only pass in the id name we don't put # before id
//like we do when we select an element by id when using querySelector
document.getElementById("section--1");

//We can get all the elements that have a button tag
//So basically all the elements that are buttons
//!This method returns an HTMLCollection
//HTMLCollection is different than a NodeList because
//An HTMLCollection is a so called live collection
//That means if the DOM changes then this selection is also immediately updated automatically
//So for example if we delete a button using the console
//And read the allButtons again we'll see that is has changed
//Same thing doesn't happen with a NodeList, if we delete the elements in the list and try to read the NodeList
//it will still give the same elements back to us even though they no longer exist
//!Important to keep mind when using this selector sometimes we might need a live collection and sometimes don't
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

//Like with the getElementById we only write the name of the class no . before the class name
//This method also returns an HTMLCollection
console.log(document.getElementsByClassName("btn"));

//?Creating and Inserting Elements

//We can create HTML elements using insertAdjacentHTML this was covered in the previous sections
//Go to the bankist application for more details
//We pass in the tag name of the element we want to create
//So this will create a div
//This method here creates a DOM element and stores that element into the message variable
//This element is not anywhere in our DOM
//All this is a DOM object we can now use to do something on it, but it is not yet in the DOM
//If we want it on the page then we need to manually insert it into the page
//Right now this is like any other selection
//so for example if we have an element in our DOM and selected using querySelector or other selector
//then the result is a DOM object we can also use in out code
//So just like with other DOM object selections we can use classList and other methods
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics.";
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it</button>";
//We can use the append, prepend etc to insert the element
//with prepend the element becomes the first child, with append the element becomes the last child
// header.prepend(message);
// header.append(message);
//The element was only inserted once
//that's because the element message is now a live element living in the DOM
//So therefore it can NOT be at multiple places at the same time
//First we prepend the element than when we try to append it we didn't create new element,
//instead we moved that element
//This means that we use the prepend and append methods not only to insert elements
//but can also use these methods to move them

//*But what if we wanted to add multiple elements
//In that case we first need to copy the element
// header.prepend(message);
//We pass in true because if we don't the child elements won't be copied
//When we pass in true, child elements get copied too
// header.append(message.cloneNode(true));

header.append(message);

//*Before and After
//.before will insert the element before the header element
//So it will insert it as a sibling
//.after will do the same but will insert it after the element

// header.before(message);
// header.after(message);

//?Deleting Elements

//*Remove

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    //Remove method is fairly recent
    //Before the remove method all we could do was to remove the child elements
    //So before this was introduced we would have to select the parent element first then remove the child from there
    //That would look like this
    // message.parentElement.removeChild(message);
    //This is cumbersome but you'll see this is some code bases
    //because this was the old way of doing it and many people also don't know about the remove method
    //*BTW this way of moving up and down on the DOM tree is called DOM traversing and there is a whole lecture on that later
  });

//?Styles, Attributes, and Classes
//You can later reference this later when needed
//Some of the tools here will be used later
//but it is impossible to create examples to use for all the functions methods that will be showed here
//But they are still important

//*Styles
//Styles set like this are set as inline styles. So as styles set directly in the DOM
//To get the style on an element we do this
message.style.backgroundColor = "#37383d";
//The reason we are setting the width to larger than 100% is because we want the empty section on sides to be covered as well
message.style.width = "103.3%";

console.log(message.style.height); //We can't read styles like this because
//Using the style style property like this works only on inline style that we set ourselves also using a style property
//So it's going to work for the background color
console.log(message.style.backgroundColor);

//We can still get the styles if we really want to
//We need to use the getComputedStyle function
//This gives all the properties so it is a huge list
//Then we get the property we want by adding it to the end
console.log(getComputedStyle(message).height);

//Let's say that we wanted to increase the height of the message banner by 40px
message.style.height = getComputedStyle(message).height + 40 + "px"; //This will not work because
//result of the getComputed style is a string and we are trying to add a number (40) to a string an that will not work
//So we need to parse it first

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//*Changing CSS variables
//We can also change css variables
//We have created CSS variables in the root
//And in JavaScript the root is equivalent to the document

//We have to use setProperty for custom CSS properties
//You can do this for other properties like height or color as well
// document.documentElement.style.setProperty("--color-primary", "orangered");

//*Attributes
//We can access the attributes by using the names of the attributes
const logo = document.querySelector(".nav__logo");
//This works only on standard attributes
//like alt or src for images
//If we specify these standard attributes in HTML
//than the JavaScript will automatically create these properties on the Object
console.log(logo.alt);
console.log(logo.src);

//!To get the class you need to use className, class doesn't work. For historical reasons it has to be className
console.log(logo.className);

//*But if we add some other property that is not a standard property
//JavaScript will NOT automatically create a property on the object
//This return undefined because this is NOT a standard property that is expected to be on images
console.log(logo.designer);

//But there is a way to read this from the DOM
console.log(logo.getAttribute("designer"));

//*We can also set attributes

logo.alt = "Beautiful minimalist logo";
console.log(logo.alt);

//We can also use the setAttribute to set non-standard attributes
logo.setAttribute("company", "Bankist");
console.log(logo.getAttribute("company"));

//!Absolute URL and relative URL
//logo.scr gives a different result than expected
//Because logo.src returns the absolute url while what we have in the html file is the relative url
//So relative to the folder which the index.html is located
//If we want to get the relative url we can use the getAttribute
console.log(logo.getAttribute("src"));

//!Same is true for href attribute on links as well

const link = document.querySelector(".twitter-link");
//These two gives the same results because
//Both of them were already absolute
//In this case it didn't matter which one we used
console.log(link.href);
console.log(link.getAttribute("href"));

const link2 = document.querySelector(".nav__link--btn");
console.log(link2.href);
console.log(link2.getAttribute("href"));

//*Data Attributes
//data attributes are special type of attributes that start with the word data
//These special attributes area always stored in the dataset object
//We use data attributes quite a lot when we work with the UI
//especially when we need to store data in the UI basically in the HTML code
console.log(logo.dataset.versionNumber);

//*Classes
//You can also add multiple classes by passing in multiple values
logo.classList.add("c", "j");
logo.classList.remove("c", "J");
logo.classList.toggle("c");
logo.classList.contains("c");

//!Don't use this
//Because this will overwrite all the existing classes and it only allows us to put in 1 class
// logo.className = "Emre"

//?Types of Events and Event Handlers
//!Check the event reference at mdn for more event types
//An event is basically a signal that is generated by a certain DOM element node
//Signal means something has happened like a click, the mouse moving or the user triggering the full screen mode etc.
//We can listen to these events with event listeners
//and we can handle them if we want
//And no matter if we handle an event or not (e.g. click )that event will always happen when the user clicks
//It doesn't matter if we are listening or not

const h1 = document.querySelector("h1");

h1.addEventListener("mouseenter", function (e) {
  //mouseenter event is a bit like the hover in CSS
  //It triggers whenever the mouse enters a certain element
  console.log("addEventListener: Great! You are reading the heading");
});

//*We can also use the onEvent property to listen for events
//However this way of listening to events is a bit old school
//Now we usually always use addEventListener

h1.onmouseenter = function (e) {
  console.log("onmouseenter: Great! You are reading the heading");
};

//! 2 Ways the addEventListener is better than this approach
//1. Add event listener allows us to ad multiple event listeners to the same event
//We can NOT do this with the onEvent property
//2. And more important reason to use addEventListener is that
//We can remove event listeners if we don't need them anymore
//To do that first we need to export the function to a named function

//And of course we can remove the event listener after we handled the event so it doesn't trigger again
let eventExist = false;
const alertH1 = function (e) {
  console.log("alertH1: Great! You are reading the heading");

  //We can remove the event listener wit ht his line of code
  //But this doesn't have to happened inside the event listener callback function
  //We can remove it anywhere we want
  h1.removeEventListener("mouseenter", alertH1);
  eventExist = true;
  return eventExist;
};
h1.addEventListener("mouseenter", alertH1);

//For example we can remove the event handler after a certain time has passed
setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);

  //If there is more than one event listener that you want to check if it exist do not use this method
  //Instead add a data attribute to the element that you are adding the listener and check if that element has the data attribute
  //If it has than it has a listener if it doesn't have the data attribute to specified than it doesn't have the event listener
  if (!eventExist) {
    console.log("Event listener is removed");
  } else {
    console.log("It was already removed");
  }
}, 3000);

//Third way of handling events
//*This should not be used unless needed
//Go to the index.html and check the h1 element for the code
//We can handle events using an HTML attribute
//First we add an attribute to the HTMl element that we want to add the event listener to(onclick in this case)
//And then we write what we want to happen

//?Event Propagation
//*Check lecture 190 and pdf for more information
//An event happens not on the element but generated at the root of the document
//So at the top of the DOM tree
//And from there the capturing phase happens where the element
//travels all the way down from the document root to the target element
//And as the event passed down the tree
//it will pass through every parent element of the target element
//As soon as the event reaches the target element target phase begins,
//where events can be handled at the target, we do that using event listeners
//So an event listener wait for a certain event to happen on a certain element
//and as soon as the event happens calls the callback function
//After reaching the target event,
//travels back all the way up to the document root again in the bubbling phase
//Event bubble up from the target to the document root
//just like the capturing phase event passes through all the parent elements
//*As the event passes up or down through the tree it only passes through the parent elements NOT the sibling elements
//This is important because it is as if the vent also happened at each of the parent elements
//As the event bubbles through a parent element it is as if the event happened right in that element
//This means that if we attach the same event listener also for example to the section element(the parent element in out example),
//then we would get the exact same alert window for the section element as well
//so we would have handled the exact same event twice
//Once at its target, and once at one of it parent elements
//By default events can only be handled in the target and the bubbling phase
//However we can set up event listeners in a way that hey listen for events at the capture phase
//!Not all types of events have a capturing and bubbling phase
//Some of the created on the target element so we only handled them there
//But most of the events do capture and bubble
//We can also say events propagate which is what capturing and bubbling really is
//It is events propagating from one place to another

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max + 1 - min)) + min;

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log("randomColor", randomColor());

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//*.target is where the event originated NOT where it is handled it is not hte place where the handler is attached
//It is the starting place of the event, where th event happened
//In this case where the click happened
//*.current target is the element that the event handler is attached
//*The current target is exactly the same as the .this keyword
// console.log("LINK.target", e.target, "LINK.currentTarget", e.currentTarget,);
// console.log("LINK.currenttarget===this", e.currentTarget === this);

//*We can stop the event propagating
//If we do this parent elements don't change their colors which means the event never arrived at those elements
//!In practice it is usually NOT a good idea to stop propagation
//Stopping the event propagation like this can sometimes fix problems in very complex applications,
//that have many handlers for the same events
//BUt in general it is not a good idea to stop propagation of events
//e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//*.target is where the event originated NOT where it is handled. It is not the place where the handler is attached
//It is the starting place of the event, where the event happened
//In this case where the click happened
//*.current target is the element that the event handler is attached
//*The current target is exactly the same as the .this keyword
// console.log("CONTAINER.target", e.target, "CONTAINER.currentTarget", e.currentTarget,);
// console.log("CONTAINER.currenttarget===this", e.currentTarget === this);
// });

//*If we want to catch events in the capture phase we can add a third parameter and set it to true
//Capturing is rarely used these days only reason why both capturing and bubbling exist is because of historical reasons
//Default behavior is bubbling and use that unless capturing is needed
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//*.target is where the event originated NOT where eit is handled it is not hte place where the handler is attached
//It is the starting place of the event, where th event happened
//In this case where the click happened
//*.current target is the element that the event handler is attached
//*The current target is exactly the same as the .this keyword
//   console.log("NAV.target", e.target, "NAV.currentTarget", e.currentTarget,);
//   console.log("NAV.currenttarget===this", e.currentTarget === this);
// }, true);

//?Event delegation
//*Code for page delegation is above in the page navigation section

//?DOM Traversing

//*Going Downwards: child
//This code selects all the elements with the class hightlight that are the children of the h1 element
//This works no matter how deep the child elements are inside the h1 element
//In this case highlight class is the direct children of the h1 element
//But if they were not it would go dows as deep as necessary into the DOM tree
//And if there were other elements with the class highlight
//that weren't the child of the h1 element then they would not be selected
console.log("h1 highlight", h1.querySelectorAll(".highlight"));

//Sometimes we only want the direct children
//For that we use:
console.log("childNodes", h1.childNodes);

//We can use this to get the HTML collection
//This only works for direct children
console.log(h1.children);

//*Only the first child's color property is set to white
// h1.firstElementChild.style.color = "white";

//*Only the last child's color property is set to orangered
// h1.lastElementChild.style.color = "orangered";

//*Going upwards: parents

//For direct parents
console.log("parentNode", h1.parentNode);

//There is also parent element which is usually what we are interested in but in this case it is the same
console.log("parenElement", h1.parentElement);

//*Indirect parents
//Most of the time we need a parent elements that is not a direct parent of the element
//So we might need to find a parent element no matter how far away it is in the DOM tree
//We have the closest method for that
//Let's say we have multiple headers on the page, so multiple elements with the class of header
//But we want to find only the one that is the parent element of h1, we can use closest for that
//!We use this all the time especially for event delegation
// h1.closest(".header").style.background = "var(--gradient-secondary)";

//If the selector matches the element that we are calling the closest then it will return the element that was called on
// h1.closest("h1").style.background = "var(--gradient-primary)";

//*Going sideways: siblings
//In JavaScript we can only access the direct siblings
//So only the previous and the next sibling
console.log("previousElementSibling", h1.previousElementSibling);
console.log("nextElementSibling", h1.nextElementSibling);

console.log("previous sibling", h1.previousSibling);
console.log("next sibling", h1.nextSibling);

//*If we need all the siblings not just the previous or the next one
//We can move upto the parent element and read all the children from there
console.log(h1.parentElement.children);

//*We want to change the style of the siblings except the original element
//First we convert the HTML collection into an array
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//?Life Cycle of DOM Events

//DOM Content Loaded
//This event is fired by the document as soon as the HTML is completely parsed
//Also all scripts must be downloaded and executed before this event fires
//We can listen to this event since it happens on the document

//This event doesn't wait for images or other external resources to load
//With this we can execute code that should be only after the DOM tree is built
//And we want all our code to be executed after the DOM is built
//So should we put all of our code in this
//No. Because the <script> tag in HTML links the HTML and JavaScript and put the <script> tag at the end of our JavaScript so we don't need to wrap it
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML is parsed and DOM tree is built!", e);
});

//When the page is fully loaded images and external resources included then this vent fires
window.addEventListener("load", function (e) {
  console.log("Page is fully loaded", e);
});

//This event is created immediately before a user is about to lave the page
//e.g. after clicking the close button on the browser
//We can use this event to ask the users if they are 100% sure they want to leave the page
// window.addEventListener("beforeunload", function (e) {
//In some browsers to make this work we need to call prevent default
//It is no necessary on chrome
// e.preventDefault();
// console.log(e);
//To display a leaving confirmation we need to set the returnvalue on the event to an empty string for historical reasons

//To combat unwanted pop-ups some browsers only show this message if you have interacted with the page
//And other browsers might not show it at all

//Long time ago developers were able to customize the message that was displayed when trying to leave the site
//But many people started to abuse this, so now we can only see a generic message
//Thats why it doesn't matter what we write in the returnValue
//   e.returnValue = "";

// });

//?Efficient Script Loading: Async and Defer
//Check out the lecture 203 and the pdf for more detail

//Normally When the HTML is being parsed when the engine comes to the <script> tag
//it stops parsing the HTML and starts fetching the script and after that executes the script
//Thats why we never put the <script> tag in the <head> tag
//and that is the same reason why we put it in the last inside the <body> tag

//?Async
//When we use the async keyword as an attribute in the <script> tag we can fetch the script asynchronously
//So script is fetched as the HTML is parsed,
//but when the script is fetched HTML stops parsing and script gets executed
//This is better and faster than the default behavior but we can improve it with deferring it

//?Defer
//With defer script is fetched asynchronously,
//but the execution of the scripts is deferred until the the end of the HTML parsing
//So in practice loading time is similar to the async but the key difference is this
//*With defer HTML parsing is never interrupted,
//because the script is only executed at the end
