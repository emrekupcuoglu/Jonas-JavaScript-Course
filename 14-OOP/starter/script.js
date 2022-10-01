'use strict';

//Watch the Lectures in the OOP section for more information on classes, objercts, instances, inheritance, prototypes, and prototypel inheritence

//?Constructor Functions and new Operator

//In OOP thre is a convention that constructor functions always start with a capital letter
//Arrow functions will not work because arrow functions don't have their own .this keyword
const Person = function (firstName, birthYear) {
  //Instance Properties
  //These properties will be available on all the instances
  //that are created using the constructor function
  this.firstName = firstName;
  this.birthYear = birthYear;

  //!Never do this
  //This works but this a really bad practice
  //Never create a method inside a constructor function
  //Imagine that we are going to create a hundred or thousands
  //or even tens of thosands of person objects using this constructor function
  //If we did taht then each of these objects would carry the calcAge function with them
  //So if we had a thosound objects we would essentially be creating thousand copies of the calcAge function
  //We are going to solve this problem using prototypes


  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };



};


//new operator is very special
//when we call a function with the new operator:
//1. A new empty object is created
//2. Function is called and the .this keyword is set to the newly created object
//3. The newly created object is linked to a prototype 
//4. Function automaticly returns the empty object from the beginning
//But actually the object doesn't have to be empty
//And this is the trick of making the constructor function work
const emre = new Person("Emre", 1998);
console.log(emre);

//Now we can use this object to create as many persons as we want
const matilda = new Person("Matilda", 1990);
const jack = new Person("Jack", 1981);
console.log(matilda, jack);

//Even though there are no classes in JavaScript in a traditional sense
//Because we created the objects programmaticly using the constructor function
//We can say that emre, matidla, and jack are instances of the Person
//We can check this using the instanceof operator
console.log(emre instanceof Person);

//*Static Method
Person.hey = function () {
  console.log("Hello there! 🖐");
  console.log(this);
};

Person.hey();

//?Prototypes
//Each and every function in JavaScipt automaticly has a property called prototype
//and that includes constructor functions as well
//Every object that is created by a certain constructor function
//will get access to all the methods and properties that we define
//on the constructors prototype property
//In our case this is:
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
//So all objects that are created using the constructor function
//will inherit all the methods and properties that are defined on this prototype property

console.log(Person.prototype);

//emre object doesn't have the calcAge function but because of prototypal inheritance we can access it
emre.calcAge();

matilda.calcAge();

//?prototype of emre and matilda is Person.prototype
//
console.log(emre.__proto__);//This is the prototype of emre
//!It is NOT the prototype property. It is simply the prototype
//So prototype of the emre object is,
//essentially the prototype property of the constructor function
//We can check that like this:
console.log(emre.__proto__ === Person.prototype);
//!This is confusing
//Person.prototype is NOT the prototype of Person
//Person.prototype is what is going to be used as the prototype
//of all the objects that are created with the Person constructor function
//This a subtle but important difference

//This is proved with the code above but we there are also built in methods we can use to prove this
console.log(Person.prototype.isPrototypeOf(emre)); //This return true: that means that Person.prototype is the prototype of emre
console.log(Person.prototype.isPrototypeOf(Person));//This returns false: taht means Person.prototype is NOT the prototype of Person
//*This confusion stems from bad naming

//*But where does the __proto__ property comes from?
//Remember the step 3 of what the new operator does behind the scenes
//Which links the empty new object to the prototype
//In step 3 __proto__ property is created and it sets its value to the prtotype property of the function that is being called
//This is how JavaScipt knows internally that the emre objects is connected to Person.prototype


//This not the property of emre or matilda objects
//species property is not directly in the object
//So it not its own property
//Own properties are the properties that are declared directly on the objects itself
//So not including inherited properties
Person.prototype.species = "Homo Sapiens";
console.log(emre.species, matilda.species);

//We can check this with:
console.log(emre.hasOwnProperty("firstName"));
console.log(emre.hasOwnProperty("species"));

console.log(emre.__proto__);

//This is the prototype of emre's prototype
//Which is object.prototype
console.log(emre.__proto__.__proto__);

//This will point back to the Person itself
//If we want to inspect the function we need to use console.dir
console.dir(Person.prototype.constructor);

const arr = [3, 3, 3, 3, 4, 2, 8, 9, 1];

console.log(arr.__proto__);

//?We can create our own methods like this:
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
//*However extrending the prototype of a build in object is generally NOT a good idea
//If you are working on a small project on your own you can do this
//But don't get into habit of extending built in objects prototypes for multiple reasons
//First reason is that the next version of JavaScirpt might add a new method
//with the same name that we are adding(unique() in our case) but it might work in a different way
//And that will break your code
//Second reason is when you work with a team this is a really bad idea
//Because if multiple developers implement the same method with different names
//It's going to create so many bugs it just not worth doing it
//So it is a nice experiment but in practice don't do it

console.log(console);
console.dir(console);

//?ES6 Classes
//Classes in JavaScipt do not work like in other languages
//Classes in JavaScript are basically syntactic sugars
//They still work the same, they still implement prototypal inheritence
//But with a sytax that makes more sense to poeple coming from other languages

//We can use class declarations or expressions when creating classes
//That is becuase classes are a special type of function

//*Class expression
// const PersonClass = class{}

//*Class declaration
class PersonClass {
  //constructor works in a similiar way to the constructor function
  //But constructor is a method of class
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;

  };
  //!The properties and methods we write outside of the constructor will NOT be inside the class
  //But it will be inside the prototype of that class

  //So writing the methods and properties outside of the constructor
  // is the same as writing them as Person.prototype.calcAge(){}

  //Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  //*Getters and setters are explained below
  get age() {
    return 2037 - this.birthYear;
  };

  //!Setters and getters are really important for data validations
  //We are creating a setter for a property that already exist
  //fullName is the name of the setter but it already exist before.
  //So because they have the same name, each time the code above -this.fullName = fullName- is executed
  //(whenever we set the fullName on the .this keyword) setter will be executed
  //The name we pass in as fullName to the class, will become the name argument of the setter
  //But this will cause an error if we don't fix it
  //Error is: Maximum call stack size exceeded
  //This happens because both the setter function and the constructor function are trying to set the exact same property name
  //To fix this we need to create a new property name
  //And the convention for doing that(when we have a setter that is trying to set a property that already exist)
  //*is adding an underscore
  //But when we do this we can NOT use the fullName property because it doesn't exist anymore(we can use the _fullName but that doesn't make sense)
  //To fix this we need to create a getter for the full name property
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);

  };

  //This returns this._fullName when called but we can use it to call it without the underscore
  //But the actual property doesn't change it is still _fullName
  get fullName() {
    return this._fullName;
  };

  //Static method
  static hey() {
    console.log("Hey there! 🖐");
    console.log(this);
  };

};


const jessica = new PersonClass("Jessica Davis", 1996);

jessica.calcAge();

console.log(jessica.__proto__ === PersonClass.prototype);

//We  can add a method using the old way as well
PersonClass.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();


//!Importants things about classes
//1. Classes are NOT hoisted even if they are class declarations
//2. Like functions classes are first-class citizens(we can pass them into functions and also return them from functions),
//because behind the scenes classes are special type of functions
//3. Body of a class is always executed in strict mode

PersonClass.hey();


//?Getters and Setters
//Getters and setters are accessor properties
//Regular properties are called data propperties
//Getters and setters are basically functions that get and set a value, but on the outside look like regular properties

const account = {
  owner: "Emre",
  movements: [200, 900, 600, 350],

  //*This can be very useful if we want to read something as a property but need to do calculations before
  get latest() {
    return this.movements.splice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  }
};

console.log(account.latest);

//If the setter was a regular method we would of done this:
//account.latest(50);
//But to use the setter we just set the property to the argument we want to pass in
account.latest = 50;
console.log(account.movements);

//?Classes also have getter and setter properties so let's add them to the PersonClass above


//?Static Methods
//static methods are attached to the constructor NOT to the prototype property
//So we can use them on the constructor but not on the objects instantiated from that constructor

//This works
Array.from(document.querySelectorAll("h1"));
//This does not because from method is not on the prototpye of Array
//So array objects do NOT inherit the from method
// [1, 2, 3].from()

//?We have added static methods to the both constructor function and class above



//?Object.create
//Object.create works differently then constructor functions and classes
//With Object.create there is still the idea of prototypal inheritence however there is no prototype property involved
//and there is no constructor function and no new operator
//So instead we can use Object.create to manually set the prototype of an object to any other object we want

//Let's create the object that will become the prototype

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  //This might look like a constructor function but it NOT a constructor function
  //because we are not using the new operator
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

};

const steven = Object.create(PersonProto);
//steven is an empty object but it's prototype is set to the PersonProto

//creating the object like this is against the spirit of creating objects programmaticly
//and if we are serious about using Object.create we should implement a function that does this for us
//*That function is the init function above
steven.name = "Steven";
steven.birthYear = 1960;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);

sarah.init("Sarah", 2000);
sarah.calcAge();



//?Inheritance between "classes": Constructor Functions

const Student = function (firstName, birthYear, course) {

  //This code here is a duplicate of the Person's code
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //and if the implemantation of Person cahnges in the future the changes won't be reflected here
  //So let's change the code

  //We add call because this is a regular function call(we are not using the new keyword) and a regular function's .this keyword is undefined
  //We want the .this keyword of the Person function to be equal to the .this keyword of the Student functions .this keyword
  Person.call(this, firstName, birthYear);
  this.course = course;
};


//*Linking Prototypes
//We need to add this code before we add anything to the Student.prototype,
//because Object.create returns an empty object
//So at this point Student.prototype is empty
//And we can add methods to the empty object
//But if we wrote this code after Student.prototype.introduce then we would of overwritten the prototype with an empty object
Student.prototype = Object.create(Person.prototype);

//!Do NOT do this
//Student.prototype=Person.prototype
//*Check lecture 218 for more info
//This gives us the wrong prototype chain
//When we do Student.prototype=Person.prototype we set them equal to the exact same object
//But that is not what we want
//We want the Person's prototype object to be the prototype of Student.prototype
//So we want to inherit from it but it should NOT be the exact same object
//That's why we need the Object.create

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

//Both of these return true because we linked the prototypes together using Object.create
console.log(mike instanceof Student);
console.log(mike instanceof Person);
//Mike is also an instance of Object because that is also in it's prototype chain
console.log(mike instanceof Object);

//Because we set the prototype property of Student using Object.create, JavaScript thinks that the constructor of Student is Person which is not correct
//But it is easy to fix with this code:
Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor);



//?Inheritance between "classes": ES6 Classes

//extends keyword will link the prototypes behind the scenes without us even having to think about them
class StudentClass extends PersonClass {
  constructor(fullName, birthYear, course) {
    //We don't have to call the PersonClass manually like we did when we created the object with the constructor function
    //But we need to call the super function
    //super is the constructor function of the parent class
    //Idea is similliar to what we did with the constructor function, but this time it happens automaticly.
    //We don't have to specify the name of the parent class again because we already did it with the extend keyword 
    //!This always needs to happen first
    //because this call to the super function is responsible for creating the .this keyword in this subclass
    //So therefore without writing this we wouldn't be able to access the .this keyword
    //So if we want to  do this: this.fullName=fullName then we need to write the super function first
    super(fullName, birthYear);
    this.course = course;
  };

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  };

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old but i feel like ${2037 - this.birthYear + 10}`);
  }


}

//!Important
//If we don't need to add another property to the child class (course in this example)
//Then we don't need the constructor so we could of wrote it like this and it would still work
//We can use this when we want to add methods to the child class but not properties
class StudentClass2 extends PersonClass {


};


const martha = new StudentClass2("Martha Jones", 2012);
console.log(martha);

const john = new StudentClass("John James", 2006, "Computer Science");

//introduce method is in the prototype of the StudentClass
john.introduce();
//calcAge method is in the prototype of the PersonClass and the PersonClass is the parent class of the StudentClass
john.calcAge();


//?Inheritance Between Classes: Object.create

//We used the PersonProto as the prototype of the objects we created
//But now we want to add another prototype in the middle of the chain
//So between the PersonProto and the object we are creating
//We are going to make the student inherit directly from PersonProto

//We are creating an object that will be the prototype of students
//And this will be an empty object for now and the prototype will be PersonProto
const StudentProto = Object.create(PersonProto);

//PersonProto has a method called init and we can use it to initialize our student
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};


//jay will inherit from the StudentProto
//So prototype of jay is the StudentProto object
const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "CS");

jay.introduce();
jay.calcAge();

//?Another class example

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    //Continued from: Encapsulation: Protected Properties and Methods
    //movements is a mission critical data so we need to protect it so no one can accidentally manipulate it
    //we do that by adding an underscore before the variable
    //!This does NOT make the property PRIVATE it is just a convention
    //We can still access the property outside of the class using the underscore
    //But at least everyone on your team and yourself will know that
    //this property is NOT supposed to be touched outside of the class
    //Since it is not truly private we call this protected
    //Protected property
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }
  //Public Interface

  //If we want to give access to the movements array from the outside
  //Then we have to implement a public method

  getMovements() {
    return this._movements;
  }



  deposit(val) {
    this._movements.push(val);
  }

  withdrawl(val) {
    this.deposit(-val);
  }

  //Protected Method
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan) {
      this.deposit(val);
      console.log(`Loan approved`);
    }

  }

};

const acc1 = new Account("Jonas", "EUR", 111);

//We can manipulate the movements like this
//However it is NOT a good idea at all to do this
//*Instead of interacting with a property like this
//it is alot better to create methods that interact with these properties
//This is especially true for important properties such as the movements
//This will help to avoid bugs in the future as your application grows
//Let's create a deposit and withdrawl method inside the Account class above
// acc1.movements.push(250);
// acc1.movements.push(-140);

acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
//This doesn't do anything but in a real application we shouldn't even be able to access this method
// acc1.approveLoan(2000);
console.log(acc1.getMovements());

console.log(acc1);


//?Encapsulation: Protected Properties and Methods
//There are 2 big reasons why we want encapsulation and data privacy
//First it is to prevent a code from outside the class to accidently manipulate the data insdie the class
//That is the reason why we implemented the public interface(deposit, withdrawl, and requestLoan methods)
//We are not supposed to manually mess with the movements property(e.g using push or pop) therefore we should encapsulate it
//Second reason: When w eexpose only a small interface, a small API consisting of only a couple public methods,
//then we can change all the other internal methods with more confidance
//Because we can be sure that external code doesn't rely on these methods
//So therefore our code will not break when we do internal changes
//!JavaScript classes do NOT support real data privacy and encapsulation yet
//!There is a proposal to add it but it is not ready yet
//So we will fake encapsulation by using a convention
//We need to protect the movements so llok there for more info



//?Encapsulation: Private Class Fields and Methods
//Private class fields and methods are part of a bigger proposal
//for improving and changing JavaScript classes which is simply called class fields
//!Proposal is accepted and functional
//This proposal is not yet accepted but it is in stage 3, so it is likely that iw will be approved
//Some parts of this proposal already work in chrome but other parts don't 
//The reason why this proposal is called class fields is because
//in traditional OOP languages, properties are usually called fields
//With this proposal JavaScript is moving away from the idea that
//classes are just syntactic sugar over constructor functions
//Because with these new class features classes actually
//starts to have abilities that we didn't previously have with constructor functions 

//*In this propoosal there are 8 different kinds of class fields
//*But we will only focus on 4

//Public Fields
//Private Fields
//Public Methods
//Private Methods

//*The other 4 fields are the static fields
//Just add the static keyword before the field
//Static Public Fields
//Static Private Fields
//Static Public Methods
//Static Private Methods


class ClassFields {

  //*Public Fields(instances)
  //This is how we set public fields
  //This looks like a variable but there is no let or const so do not confuse them
  //And don't forget the semicolon
  //!Public fields are instances properties they are NOT on the prototype
  //*Public fields are usually are more general and common to other objects
  //*While Instance properties are more personilized because
  //*they take their data from the arguments passed into the constructor function
  locale = navigator.language;

  //*Private Fields(instances)
  //With private fields we can truly make the properties
  //inaccessible from outside the class
  //# symbol makes the field private
  //If we try to read the #movements property the nwe'll get a syntax error(we have tried this below)
  #movements = [];

  //*to make the private we need to declare it outside of the constructor and set to to nothing(JavaScript will set this too undefined)
  //*and set it inside the constructor 
  #pin;



  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //*We can not make the pin protected inside the constructor
    //We need to set it outside to make it private
    //So for that we define the pin as a private field outside of the constructor and set it here in the constructor
    this.pin = pin;
    //Continued from: Encapsulation: Protected Properties and Methods
    //movements is a mission critical data so we need to protect it so no one can accidentally manipulate it
    //we do that by adding an underscore before the variable
    //!This does NOT make the property PRIVATE it is just a convention
    //We can still access the property outside of the class using the underscore
    //But at least everyone on your team and yourself will know that
    //this property is NOT supposed to be touched outside of the class
    //Since it is not truly private we call this protected
    //Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  //*Public Methods
  //There is not much to talk about public methods
  //We use the public methods to interact with the class


  //Public Interface
  //If we want to give access to the movements array from the outside
  //Then we have to implement a public method

  getMovements() {
    return this.#movements;
  }



  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdrawl(val) {
    this.deposit(-val);
    return this;

  }

  requestLoan(val) {
    if (this.#approveLoan) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;

  }

  //*Private Methods
  //Private methods are really useful to
  //hide the implementation detail from the outside
  //!As of today i am not sure if private classes are implemented or not 
  //!Chrome sees them as private fields and because of that approveLoan is not on the prototype but is on the instance
  //!This might be the intended way for it to work or it is simply not yet implemented 

  #approveLoan() {
    return true;
  }

};


const may = new ClassFields("May", 2015, "CS");
may.requestLoan(15000);
console.log(may);

//We get a syntax error when we do this because #movements is a private field
// console.log(may.#movements);

//?Chaining Methods

may.deposit(500).deposit(300).withdrawl(35).requestLoan(25000).withdrawl(4000);





//!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW ADDITION!!!!!!!!NEW
//We can use the bind() method like this to pass call private methods from the callback function
const h1 = document.querySelector("h1");
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

    const callback2 = callback.bind(new Callback);

    h1.addEventListener("click", callback2);
  }
}

const callbackClass = new Callback();
callbackClass.handler();






