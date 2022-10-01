console.log("%cscript.js", "color:red; background-color:yellow;font-style:italic;");




//A module is a re-usable piece of code that encapsulates implementation details of a certain part of our project
//This might sound like a function or a class but a module is usually a stand-alone file, it doesn't always have to be
//but normally when we think of a module we think of a single file

//A module always contains some code, but it can also have improts and exports
//With exports we can export values oput of a module e.g. simple values or even functions
//Whenever we export from a module it is called a public API
//So this is just like classes where we can also expose a public API for other code to consume
//In the case of modules this public API is actually consumed by importing values into a module
//So just like we can export values in module we can usually also import values from other modules
//and these other modules we import from are then called dependencies of the importing module
//Because the code inside the importing module can NOT work without the code it is importing
//So it is depended on other modules

//We can write code without modules but as the codebase gets bigger and bigger advantages of modules become more prononuced

//1. Modules make it really easy to compose software: Modules are small building blocks that we put together to build complex applications
//Let's take a look at real world example A Digital Camera:
//A digital camera is made up of many different modules like the screen, controller, battery, battery safety system, flashlight, memory and many more

//2. Isolating Components: Modeles can be developed in isolation without thinking about the entire codebase,
//the enginner working on the module doesn't even need to understand all of it.
//Each of these camera modules can be developed in complete isolation. One engineer can work on the camera lens, while another works on the controller,
//and another on the screen and the best part of this each can work on their own module withouth understanding what the other engineers are doing and also
//without understanding how the entire final camera works itself 

//3. Abstract Code: Implement low-level code in modulesand import those abstractions to other modules.
//Screen module of the camera doesn't care about the low level implementation of the controller for example
//It can simple import the controller without knowing how it works and use it to control other pars of the camera

//4. Organized Code: Modules naturally lead to a more organized codebase. Because when we break up pur cpde into seperate, isolated and, abstracted modules this will automaticly organize our code make it easier to understand

//5. Re-usable Code:Modules allows us to easily reuse the same code even across multiple projects
//For example if we used a module to implement a couple of mathematical functions in a creatain project, and if we then need the same function in a different project
//all we need to do is to copy that module to the new project

//?Native JavaScirpt (ES6) Modules
//As of ES6 Javascript has a built in module system.We did have modules before ES6 but we had to implement them ourselves or use external libraries
//ES& modules are modules that are actyually stored in files. Each file is one module exactly

//*You might be thinking that scripts are usually files too, so let's compare them 

//1. Variables are private to the module and the only way an outside module can access a value that is inside a module is by exporting that value
//In scripts all top-level variables are always global. This can lead to problems like global namespace pollution where multiple scripts try to declare a variable with the same name
//2. ES6 Modules are always run in strict mode but scripts are executed in "sloppy" mdoe by default
//3. In ES6 Modules the .this keyword is always undefined at the top level while in script's this keyword points at the window object 
//4. We can import and export values between them using ES6 import and export syntax, in regular scripts importing and exporting values is NOT possible
//!Imports and exports can happen only at the top level and imports are hoisted
//5. In order to link a module to an HTML file we need to use the scipt tag with the type attribute set to module, we don't need this with regular scripts
//6. Modules always download in an asynchronous way.
//This is true for a module loaded from an HTMl as well as for modules that are loaded by importing one module into another using the import syntax.
//With scripts default behaviour is synchronous unless we use the async or defer attribute.

//*                                     ES6 MODULE                         SCRIPT
//*Top-level variables:             Scoped to the module                    Global
//*Default Mode:                        Strict Mode                      "Sloppy Mode"
//*Top-level this:                       undefined                          window
//*Imports and Exports:                     YES                               NO
//*HTML Linking:                    <script type="module">                 <script>
//*File Downloading:                     Asynchronous                    Synchronous



//?How ES6 Modules Are Imported
//*Watch lecture 271 for more information

//When a piece of code is executed the first step is to parse that code(parsing basically means reading the code without executing it)
//This is the moment at which the imports are hoisted
//In fact the whole process of importing modules happens before the code in the main module is executed
//Modules are imported synchronously(but are still downlaoded asynchronously these two are different things)
//Only after all imported modules are downloaded and executed the main script.js mdoule will finally be executed
//This is only possible because of top level imports and exports
//If we only import and export outside of any code that needs to be executed, then the engine can know all the imports and exports during the parsing phase
//If we were allowed to import a module inside of a function then that function would first ahve to be executed before the import could happen.
//And because ofo that modules wouldn't be able to be implemented in a synchronous way
//*But why do we want the modules to be loaded in a synchronous way
//Because this makes bundling and dead code elimination possible.
//This is very miortant in large projects with hundreds of modules,
//and that includes 3rd party modules which we usually only want a small piece and not the entire module.
//By knowing all dependencies between modules bundlers like webpack and parcel can then join multiple modules together and elimitane dead code
//So essantially this is the reason why we can only import and export outside of any code that needs to be executed like a function or an if block
//After the parsing process has figured out which modules it needs to import then htese modules are downlaoded from the server (downloading happens in an asynchronous way)
//Only the importing operationo itself happens synchronously
//After a module arrives it is parsed then the modules exports are linked to the imports in script.js
//e.g. math.js exports a function called rand and this function is linkled to the rand import in the script.js module
//!This connection is a live connection so exported values are not copied to imports, instead imports are basically just a reference to the exported value
//!like a pointer when a value changes in the exporting module then the same value also changes in the importing module
//!This is quite important to understand because it is unique to ES6 modeules, other module systems do NOT work like this but JavaScirpt modules do
//Next the code in the imported modeles are executed and with this process of importing moduels is finally finished
//And now it is time for the importing module to be executed as well script.js in this example

//?Importing Module

//Exporting module is executed first we can check this by writing a consle.log() in both the importing and the exporting moodule
//When we do this we will see that the exporting module's console.log() will execute first
//This is the sytax for named imports
//We can acahnge the name of the imported variable using the as keyword
// import { addToCart, totalPrice as price, qt } from "./shoppingCart.js"
// console.log("Importing Module");

// addToCart("bread", 5)
// console.log(price, qt);


//?We can import everyting with this sytax
//ShoppingCart is imported as an object
//If we think about it this module here is basicaly export a public API just like a class
//So it is as if the ShoppingCart object was an object created from a class that has methods and properties
//*We are not trying to replace classes with modules
//I just wanted to note that it looks similliar
//We can say a module kinda exports a public API because everything else stays private inside the module
import * as ShoppingCart from "./shoppingCart.js";

ShoppingCart.addToCart("water", 1);

//*This is a default import
//This will import the default export and we can give it any name we want
//We are importnig the same module twice it doesn't cause any error but it is not advisable
import add from "./shoppingCart.js";

//*We can even mix default and named imports in the same statement
//*However in practice we usually never mix default and named exports in the same module
//This is not really desirable
// import add, { totalPrice as price, qt } from "./shoppingCart.js"

//*Preffered style is to just use one default export per module and import that
//That is why default exports are easier to import

//!Imports are a live connection to exports
//When we first exported the cart array it was empty
//But after we added some items using the add() method we mutated the cart array
//And if the cart was not a live connection we wouldn't see the chagnes
//But because it is a live connection we see the changes reflected

import { cart } from "./shoppingCart.js";

add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);







//?Top-Level Await
//Starting from ES2022 we can now use the await keyword outside of asycn functions at least in modules
//!Remember this only works in modules

// console.log("Start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts")
// const data = await res.json();
// console.log(data);
//!While this is great, this now blocks the execution of the entire module
//We ccan demoonstrate this by loggin something else afterwards
//Normally something would of printed too the console before the data
//But because the entire modules is blocked,
//we wait for the fetch() and json() methods to finish before executing the console.log("something");
console.log("something");
//This await keyword is blocking the execution of this entire module
//This can be useful in some situations but can also be harmful

//*A More Real Example
//Many times we have situations where we have an asycn function that we want to return some data


const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log(data);

  //We want to return something from this function
  //I simply want to return an object which contains the title and also the body
  return { title: data.at(-1).title, text: data.at(-1).body };

};

const lastPost = getLastPost();
//This won work because calling an async function will always return a promise
//It will not return the actual data itself
//Because by the time we are running the - const lastPost = getLastPost(); - data is has not yet arrived
console.log(lastPost);

//Workaround for this was to simply use regular promises
//We can get the promise and run the then() method
//However doing this is not very clean
lastPost.then(last => console.log(last));

//We can now use the top level await for this

//!The code below is commneted out because parcel doesn't support top-level await

// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//!Another important implication of using top-level await
//If one module imports a module which has a top-level await, then the importing module will wait for the imported module to finish the blocking code


//?Module Pattern
//The module pattern we used to use before ES6 to implement modules
//It is important to understand this module patter because you might come across them
//Just like the regular modules we just learned about the main goal of the module pattern is to:
//Encapsulate  functionality, to have privata data and to expose a public API
//Best way of achiving this is to simply use a function
//Because functions give us private data by default and allow us to return values which can become our public API

//We usually write an IIFE because this way we don't ahve to call it seperatly and we can also ensure it is only called once
//It is really important taht this function is only created once
//Because the goal of this function NOT to re-use code by running it multiple times
//Only purpouse of this function is to create a new scope and return data just once
const ShoppingCart2 = (function () {

  //All of this data here is private because it is inside the scope of this function
  //All we have to do is to return some of this to create a public API 

  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart, shipping cost is ${shippingCost}`);


  };
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} is ordered from the supplier`);

  };

  //*We also could of defined everything inside the returned object as properties and methods
  //*or create an object with these properties and methods and return that

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();



ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);
//And the properties we wanted to make private are not accessible
console.log(ShoppingCart2.shippingCost);//this return undefined

//!!!!!!!!!IMPORTANT!!!!!!!!!!CLOSURES!!!!!!!!!!!
//How are we able to still manipulate the data isndie the IIFE, if the IIFE has returned long ago
//Closures allow a function to have access to all the variables taht were present at it's birthplace basically
//The resason addToCart function outside can still access the cart varaible that was in the function
//So the reason why this works is NOT because the car variable is also in this object, that is not relevant because we are not using this.cart
//if it was the case the addToCart function wouldn't be able to access the shippingPrice variable
//


//!Problem with module pattern
//With this pattern if we want to have one module per file then we need to create different scripts and link each of them in the HTML file
//And that creates a couple of problems
//We have to be careful with the order of scripts we declare in the HTML
//and we'll have all of the variables living in the global scope
//and we can't bundle them together using a module bundler



//?CommonJS Modules
//Besides native ES6 modules and the module pattern,
//there are other module systems that have been used by JavaScript developers in the past
//But they were not native JavaScript. They relied on some external implementations

//2 examples are AMD Modules and CommonJS

//CommonJS modules are important because they have been used in node.js for almost all of its existance
//Only very recently ES modules have acrually been implemented in node.js
//node.js is a way of running JavaScirpğt on a web server outside of a browser
//Big concequence of this almopst all of the modules in the NPM repository still use the CommonJS module system
//The reason for that the NPM was originally only intented for node.js which uses CommonJS
//Only later NPM became the standart repository for the whole JavaScript world and now we are basically stuck with CommonJS
//Therefore you will see a lot of CommonJS still around

//Just like ES6 modules in commonJS one file is one module

//Sytax for exporting in CommonJS
//This would NOT work on the browser but it would work on the node.js
// exports.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to the cart, shipping cost is ${shippingCost}`);
// };

//Import
//require is not defined in our browser but it is defined in node.js because this is a part of the CommonJS specification
// const { addToCart } = require("./shoppingCart.js");

//!This is all we are going too see about CommonJS but it is important to remember this:
//!There are other modules syustems and COmmonJS is a particularly important one


//?A Brief Introduction to the Command Line
//This is a only the foundation of the command line so nothing advanced will be covered here
//Stuff like moving around the file system, creating files and folders copying files and etc.
//As a web developer it is important to know at least these basic commands using a terminal or command promt

//Because VS code has a terminal we''ll use it but you can use the command promt on windows or terminal on the mac

// PowerShell:we can use the dir command to see the directory we are in
//Git Bash: ls or dir to see the directory we are in
//we can use th cd to change directory
//we can use cd .. to go to the upper directory
//if we want to go up more than one level we can use cd ../..

//if we want to enter a directory we can use cd {directory name}
//we can press tab to autocomplete the name of the directory

//we can use clear to clear the console
//but in VSCode we can also use ctrl+l

//we can use mkdir to create a folder
//PowerShell: We can use new item or ni to create a new file
//Git Bash: We can use the touch command to create a new file

//We can create multiple items by writing them after a space

// Deleting files
//PowerShell: We can delete files with del
//Git Bash: We can delete files using rm
//We can also remove multiple files as well

//Moving files
//We can use mv to move files
//We need to first specify the name of the file that will be moved and the locatipon of the file that iw will be moved into
//To move it into the parent foler we do it like this: mv {file name} ../
//To move it insdie a folder: mv {file name} {folder name}

//We can use rmdir to remove(delete) a directory
//rmdir only works on empty directories
//But we can use a flag to remove a directory
//rm -R {folder name}
//-R stands for recursive
//This deletes all the files and the directory itselft recursively



//?Introduciton to NPM
//NPM stands for node package manager
//It is both a software on our computer and a package repository

//Why do we need something like NPM?
//Why do we need a way to manage packages or dependencies in our project?
//Back in the day before NPM we used to include external libraries right into our HTML using the <script> tag
//And this then would expose a global variable we could use.
//That is exactly what we did with the leaflet library in our mapty project
//This creates a few problems at least in a big project
//1. It doesn't make much snese having the HTMl loading all our JavaScript that is just messy
//2. Also many times we would usually download a library file into our computer directly efor example: A JQuerry JavaScript file
//But then whenever a new version come out we would have to
//manually go to the site, download the new version, change the file in our file system manually then included in the HTML again mayve with a different name because it can change name or the version number. That is a huge pain
//3. Before NPM there simply wasn't a single repository that contain all the packages we might need.
//This made it even more difficult to manually download libraries and manage them on our computers
//This used to be a major problem and we needed a better way to manage our packages and dependencies
//And thats where NPM comes in

//We can check if NPM is installed on our computer by writng npm -v to the terminal
//If we get a number the nnpm is installed. The number is the version number

//In each project that we want to use NPM we need to start by initializing it
//to do it we write npm init
//After that command it will ask as a few question about the creating of the package
//After answering the questions(leave it as is for now) it will create a file called package.json
//This file stores the entire configuration of our project

//Let's install the leaflet library we used before
//First go to the leaflet's website and go to the downloads section and see how to install it
//It is fairly easy to install using the NPM
//Just write npm install leaflet into the terminal
//This is how it goes for all packages
//First you write npm to run the npm program, then install, and then the name of the package
//We can also intall it using a shorter version
//We just write npm i leaflet for a shorter version

//2 thing happened when we installed the leaflet library
//1. In our package.json file a new field is created for the dependencies
//and the dependency we have here now is the leaflet we just installed at version 1.8.0(more why this is important later)
//2. We now have this foler called node_modules
//This folder itself contains the leaflet folder
//We installed the leaflet library but it is not easy to use without a module bundler
//Because leaflet uses the CommonJS module system threfore we can not directly import it into our code
//We could only do that if later we used a module bundler.
//But we are not using it right now so this was just to show how it was installed

//Instead let's import one of the most popular JavaScript libraries Lodash
//Lodash is a collection of useful function for arrays, objects, functions, dates, and more
//So it is like functions that could or should be included in JavaScript but aren't
//So people simply implemented them in lodash and we can use them
//We will NOT install the standart lodash
//Because that way it will only be usable with a module bundler
//Look for lodash-es on the lodas.com
//es stands for ES modules and use this command on the terminal:
//npm i lodash-es
//With this lodash is addded to the package.json as a dependency
//We have one file for each of the methods avaliable in lodash
//There is a lot of methods (and files because of that)
//We are going to include the one for cloning objects that is called cloneDeep.js

//!IMPORTANT
//We don't need to import libraries like this with module bundlers like webpack and parcel
//This can get cumbersome for every module we want to import
//So we can just import the whole library
//The parcel will automaticly find the path to this module and will import it with us having to manually type the entire path
//!This works with all kinds of assests. Even with html, css, sass files, images, and of course with all sorts of modules
//!So not only with ES6 modules but this will also work with CommonJS modules
//!Thanks to this we can use other packages on npm that still use older module formats
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

//It is very hard to copy a nested object thats why i choose to use cloneDeep

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 }
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
//stateClone looks exacly like the state object
//But if we change one of the nested object in there
//And check the copy then it will also be false
const stateDeepCloned = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateDeepCloned);


//!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!
//Let's say that you want t omove your project to another computer or share it with another developer or even check it into a version control like git
//In all of these scenerioos you should never ever include the node moodules folder
//When you coy your project to somewhere else thre is no reason to include this huge node modules folder
//Because in a real project it will be really huge(you can have folders with 10000+ files)
//That will just slow you down and it doesn't make much sense either because all of these files are already at the NPM so you can alwasy get them back from there

//You might ask this: if i copy my project without node modules folder so without the dependencies will i have to install all of them one by one?
//What if i have 20 or 200 dependencies?
//Thats where this package.json files come into play again
//Let's simulate losing the node_modules by deleteing it
//All we have to do to fix this issue is write this inot the termninal
//npm i
//When you write this, npm will reach into your package.json file, look into your dependencies, and install them back

//?Bundling with Parcel and NPM Scripts
//Importing packages like we did with cloneDeep by specifying the whole path is not practical so we will fix this with parcel
//Modeule bundler we are going to use is parcel it is super fast and easy to use and more importantly it works out of the box without any configuration
//You might have heard of webpack as well which is probably the most popular bundler specially in react world however it is way too complex to use in a course like this
//So let's learn how to use parcel

//Parcel is jsut another build tool that is also on the NPM
//We will use NPM to intall it
//But this is a different dependency so we have to write --save-dev after the package name
//npm i parcel --save-dev
//A dev depencency is basically like a tool we need to build our application
//But it is NOT a dependency we actually include in our code
//It is simply a tool so thats why it is called a dev dependency

//We use the parcel on the terminal because parcel is just another command line interface
//However command like parcel index.html will not work
//Because this doesn't work with locally installed packages
//Parcel is only installed locally (only in this project)
//There are also gloobal installations but more about that later

//We have 2 options to use parcel here in the console
//We can use something called npx or we can use npm scripts

//Let's start with npx
//npx is a application build into npm
//We can use npx to run the same command we try to run before
//npx parcel index.html
//index.html is the entry point
//we chose index.html as the entry point because that is where we our script.js using the <script< tag
//And in script.js we are importing cloneDeep from lodash and ShoppingCart and maybe a few more things.
//The goal of using parcel is to bundle these modules together

//Parcel also creates a live server

//If you had an error installing or an error with a command try using the sudo command
//installing with sudo gives you more permissions
//You write sudo and the comman
//sudo npm i parcel
//It will ask for your password

//You can also install a specific version using this:
//npm i parcel@{version number}

//parcel might have problems with top-level await
//Because parcel turns modules into regular scripts top-level await dooesn't work
//Even when it doesn't top-level await is not supported by parcel
//At lesast in development mode
//It might work in a build version
//We can configure it to get around this and we did
//To fix the issue we deleted the dist file
//After that, we made some changes to the packages.json file
//And then we build the project first using
//npx parcel build index.html
//After building we deployed it using npx parcel index.html
//But older browsers do not support modules. To support older browsers we can't use top-level await

//build command optimizes the project and readies it for production
//But it is hard to work with it
//Optimizations like white space removel and shortening variable names etc.
//And if target browsers are set to older browsers that do not support than it transpiles the code to work on them and creates a nomodule version
//If no target browser is set or the target browsers support ES modules than it doesn't create a nomodule version

//dist folder stands for distrubition
//dist foler is the fodler we are going to send for production
//So we will send the code in the dist folder to our end users
//dist folder has a new index.html and a bunch of new JavaScript files



//Whenever we save this file parcel will reload this file just like with live-server(this doesn't work in build versions becasue of all the optimizations)
//With parcel we can activate something event better which is called Hot module replecament.
//Hot Module Replacements:
//Whenever we change one of the modules it will trigger a rebuild.
//That new modfied bundle will then automatyicly - like magic - get injected into the browser without triggering a whole page reload
//So whenever we change something in the code block below it will not reload that part of the page
//And that is amazing for maintaning state on our apge whenever we are testing out something
//This used to be something quite annoying in the past.
//For example in our bankist application, whenever we re-loaded the page we needed to loging into the application
//But with parcel and hot module replacement that is not going to happen, because the page will not reload
//This code here is code that only parcel understans so it will not make it into our final bundle, because a browser is not going to understand any of it
if (module.hot) {
  module.hot.accept();
}

//If you save the code(not reload tha page) and then check the cart array,
//you will see that it keeps growing and growing
//It adds the same items over and over again that is because oof hot module replacement
//Because the state is maintained whenever we reload the page


//?NPM Scripts
//Ther eis a second way to run parcel and that is with using np scripts
//This is how we use it in practice
//npm scripts are another way of running locally installed packages in the comand line
//They also allow us to automate repetitve tasks
//Therefore we then don't write npx parcel index.html every time
//We write the script in the packlages.json file
//Then we run the scirpt we crated using:
//npm run {script name}. Script name in our case is start

//When we are done developing our project it is time to build the final bundle
//The bundle that is compressed and has dead code elimination, optimization etc.
//We can add another scirpt to the packlages.json file to build our project


//?Configuring Babel and Polyfilling
//We us Babel to transpile our modern code back to ES5 code
//This is still important because there are a lt of people stuck with windows xp or 7 etc.
//We want our applications to work for everyone so we need to keep everyone in mind
//Parcel uses Babel to automaticly transpile our code
//We can configure babel a lot if we want e.g. defining exatly which browsers should be supported
//But that is a ton of work so parcel makes some very good default decisions for us so we will mainly go with these defaults

//To gain a basic understanding of Babel go to babeljs.io
//Go to the documantation section and then to the plugins section

//Babel works with plugins and presets that can both be configured
//A plugin is a specific JavaScript feature that we want to transpile(convert)
//So if we only want to convert arrow functions back to ES5 but leave everything else in ES6
//Usually this doesn't make much sense and we want to transpile everything back to ES5
//So instead of using single plugins for each oof these features, Babels uses presets
//A preset is a bunch of plugins bundled together
//By default parcel is going to use preset-env preset
//That preset will automaticly select which JavaScript features should be compiled based on browser support
//Only browser with a market share less than 0.25% will not be supported with this preset
//!If you check the js file in the dist folder you will see that ES6 features are converted to ES5(this is not the case with parcel 2.0)
//!With parcel 2.0 you have to include a browser list for it to transpile it to ES5
//!With parcel 2.0 the default preset is not preset-env anymore
//!The default preset is @babel/preset-typescript
//!To use the preset-env you can install babel and configure the configure the .babelrc file like this:
//!{     "presets": [         "@babel/preset-env"     ] }
//!Or add this to the browser list: "browserslist": "> 0.25%, not dead"(for parcel inside package.json)
//!This is the config for the preset-env so this is essentially the same thing as using preset-env


//!IMPORTANT
//the preset-env only include final features.
//So features that are already part of the language after passing the 4 stages of the ECMA process
//However previously we used class fields (which is a part of the language now but let's pretend it is not)
//So if there are features that don't work go to the pulgins and look at the Proposals section(it might have different name by hte time you need it)

//we will use the ES6 find method to find a product in a cart that has a quantity of 2 or greater
//If we could see this in parcel 2 we would see that the arrow function has been transiled into a normal function
//But the find method which is a ES& method is not converted into an ES5 method
console.log(cart.find(el => el.quantity >= 2));
//The same is true for other things as well
//Promise is not transpiled as well
Promise.resolve("TEST").then(x => console.log(x));

//!IMPORTANT
//Reason for this is that Babel can only transpile ES6 sytax
//So things like arrow functions, classes, const and let, or the spread operator
//These have an equivalent way of writing them in ES5
//It is easy to convert const and let to var, or an arrow functioninto a normal function
//But the same is not true for real new features that were added to the language like find() and Promise
//So these new features can not be simply transpiled it is not easy to do

//However all hope is not lost
//So for these added features like find(), Promises and bunch of other stuff we can polyfill
//Babel used to do polyfilling out of the box some time ago,
//but recently they started to recommend another library
//So we have to manually import that as well
//Usually we have to install all of the packages first but parcel handles it for us
//But it didn't worked this time so let's installed it manually
//*These things change all the time as you can see. It will be easier as you gain more experience
import "core-js/stable";

//Polyfilling creates the find function and make it available in this bundle so the code can use it
//But polyfilling will polyfill everything even if we don't needed.
//But if we wanted we could cherry pick the features we want
//That is a lot of work but it will greatly reduce the bundle size
//So it might worth it if it is a concern
//But it is a lot of work and we usually don't do
//But it is possible if you are really worried of your bundle size
//So instead of importing everything we can only import what we need like this
// import "core-js/stable/array/find"
// import "core-js/stable/promise/"

//Finally there is one more feature that is not polyfilled
//and that is the async fucntions
//So we need to install one more package with:
//npm i regenerator-runtime

//For polyfilling async functions
import "regenerator-runtime/runtime";


//!Imports are usually are at the top of the code but this is just for learning purposes


//?Writing Clean and Modern JavaScript
//*Check lecture 280

//?READABLE CODE

//*Write code so others can understand it
//*Write code so that you can understand it in a year
//*Avıid too "clever" and overcomplicated solutions
//*Use descriptive variable names: what they contain
//*Use descriptive function names: what they do


//?GENERAL

//*Use the  DRy priciple(don't repeat yourself)
//*Don't pollute the global namespace, encapsulate instead
//*Don't use var
//*Use strong type checks(=== nad !==)

//?FUNCTIONS

//*Generally functions should only do one thing
//*Don't use more than 3 function parameters
//*use default parameters whenever possible
//*Generally, return the same data type as received
//*Use arrow functions when they make code more readable

//?OOP

//*Use ES6 classes
//*Encapsulate data and don't mutate it from outside the class
//*Implement method chaining
//*Do NOT use arrow functions as methods

//?AVOID NESTED CODE

//* Use early return(guard clauses)
//*Use ternary(conditional) or logical operators instead of if
//*Use multiple if statements instead of if/else-if
//*Avoid for loops, use array methods instead
//*Avoid callback-based asynchronous APIs

//?ASYNCHRONOUS CODE

//*Consume promises with async/await for best readability not then() and catch() methods because these methods require callback functions
//*whenever possible run promises in paralled(Promise.all)
//*handle errors and promise rejections







//?Declarative and Functional JavaScript Principles
//*Check lecture 282 for more info
//There is currently a major trend and shift to declarative code and functional programming

//There are two fundamentally different ways of wrting code in programing(paradigms)
//These two paradigms are imperative code and declarative code


//?Imperative
//Lets say that we want someone to bake a cake for us
//If we do that in an imperative way we would tell the person the exact step by step recipe in order to bake that cake
//Code exapmle of duplicating the value in an array
//The loop we have here is a purely imperative way of writing
//Here we are telling the computer step by step to
//Create an empty array, create a counter that starts at 0,
//then to incrwease that counter until we reach the length of the original array,
//then how exactly to store the new result in each new positiopn of the array
//const arr=[2,4,6,8]
//const doubled=[];
// for (let i = 0; i<arr.length;i++)
// doubled[i]=arr[i]*2;

//*Programmer explains "HOW to do things"
//*We explain the computer every step it has to follow to achieve that result


//?Declarative
//Declarative way of baking the same cake would be
//simply describing the cake to the person
//then the person would have to come up with the step-by-step recipe on their own
//So simply describing the task and how it should be achieved is the declarative way
//Code exapmle of duplicating the value in an array
//So we have an array and we tell JavaScript that it should map the values in the arr array,
//to a new array and each of the values should be multiplied by 2
// const arr = [2, 4, 6, 8];
// const doubled = arr.map(n => n * 2)

//*Programmer tells the computer "WHAT to do"
//*We simply describe the way the computer should achieve the result
//*the HOW(step-by-step instructions are abstacted away)



//?Functional Programming

//The functional programming and declarative code has basically
//became the modern way of writing code in the JavaScript world.
//You will see declarative and functional code everywhere
//In fact we ahve been using it all along without knowing that
//this style was called declarative and functional

//*Declarative programming paradigm
//*Based on the idea of writing software by combining many
//*pure functions, avoiding side effects, and mutating data


//*Side Effect:
//Modification (mutation) of any data outside
//of the function (mutating external variables, logging to the console,
//writing to the DOM,etc.)

//*Pure Function:
//Function without side effects. Does not
//depend on external variables. Given the same inputs,
//always returns the same outputs.

//*Immutability:
//State(data) is never modified! Instead
//state is copied and the copy is mutated andreturned
//The big upside of immutability is that it makes it
//so much easier to keep track of how the data flows
//through our application. Ultimately,
//that would allow us to write better code, with
//less bugs, and code that is also more readable.
//Whic is the goal of using functional programming
//in the first place
//Functional programming is a huge pradigm that is
//which is really difficult to implement
//But it is sitll important to know thse principles
//Many of the popular libraries such as react and redux
//are build around these principles
//In react state is also completely immutrable
//You need to know these concepts to learn react to use it properly
//Some principle like side effects and pure functions
//can be easier to implement into our code.
//So we can mix imperative and declarative programming
//we don't have to go 100% declarative

//?FUNCTIONAL PROGRAMMING TECHNIQUES

//*Try to avoid adata mutations

//*Use built-in methods that don't produce side effects

//*Do data transformations with methods such as
//*.map(), .filet(), .reduce()

//*Try to avoid side effects in functions: this is not always possible

//?DECLARATIVE SYTAX

//*Use array and object destructuring
//*Use the spread operator(...)
//*Use the ternary (conditional) operato
//*Use template lieterals



//?Object.freeze()
//We can use this method to make an object or an array immutable
//*Object.freeze() only freezes the first level of the object
//So it is not a so called deep freeze, because we can still
//change objects that are inside the object that is freezed












