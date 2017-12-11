# Notes
Official name is EcmaScript 2015
Currently ES5 is the version supported by all browsers.
- ES6 has partial support so it should be used with care in production.
- There is also ES2016 but it has few new features

## Variable declarations
`let` keyword is used to declare variables
Variables declared with `let` are block-scoped whilst those declared with `var` are function-scoped.
Thus:
```javascript
function es5(condition){
    if(condition){
        var name;
        var dob;
        name = "Batsi";
        dob = "01/01/1900";
    }
    console.log(name + " " + dob);
}
```
The above code will compile in ES5 because `var name` is function-scoped. However:
```
function es6(condition){
    if(condition){
        let name;
        const dob;
        name = "Batsi";
        dob = "01/01/1900";
    }
    console.log(name + " " + dob);
}
```
does not compile in ES6 because `let name` is block-scoped and thus `name` is only accessible in the if block. the following will work:
```
function es6(condition){
    let name;
    const dob = "01/01/1900";
    
    if(condition){
        name = "Batsi";
    }
    console.log(name + " " + dob);
}
```
...notice that we have to declare the `const` immediately.
- in ES6, variables are hoisted but they are not accessible until we declare them. In ES5, if you tried to use a variable that is declared later on in a function, you got the `undefined` result whereas you get an error in ES6.

ES5:
```
var i = 20;
for(var i = 1; i < 5; i++){
    console.log(i);
}
console.log(i);
// 1 2 3 4 5
```
...recall that `var` is function-scoped so it is overwritten

ES6:
```
let i = 20;
for(let i = 1; i < 5; i++){
    console.log(i);
}
console.log(i);
// 1 2 3 4 20
```
...recall that `let` is block-scoped so it is unaffected

## Blocks and IIFEs
In ES5 we used IIFEs for data privacy by creating anonymous funcitons of code that hid some variables. This was the only way to hide data since `var` is function-scoped. For example

```
(function(){
    var name = "Batsi";
    var dob = "01/01/1900";
})();

//thus we cannot access our vars name and dob out here
console.log(name + " " + dob); // will not work
```

In ES6, `let` and `const` are block-scoped. Thus we can achieve the same level of data-hiding by merely creating a block ({ }) of code eg
```{
   let name = "Batsi";
   const dob = "01/01/1900";
 }
 
 //thus we cannot access our vars name and dob out here
console.log(name + " " + dob); // will not work
 ```

## Strings
### Template Literals
ES5
```
var firstName = "Batsi";
var lastName = "Swiswa";

console.log("This is "+ firstName + " " + lastName);
```
ES6
Use back-ticks to tell JavaScript that we want to use a template literal
```
let firstName = "Batsi";
let lastName = "Swiswa";

console.log(``This is ${firstName} ${lastName}. This year is ${(new Date()).getFullYear()}``);
```
You can even run functions inside template literals as well as shown above.
### New String methods
Other methods available for strings
``` 
let firstName = "Batsi";
    console.log(firstName.startsWith("B"));
    //true
    console.log(firstName.endsWith("i"));
    //false
    console.log(firstName.includes("o"));
    //false
    console.log(firstName.repeat(3));
    //BatsiBatsiBatsi
```

## Arrow Functions
ES5

```
var years = [1990, 1965, 1982];
var ages = years.map(function(el){
    return 2017 - el;
});
console.log(ages);
//[27, 52, 35]
```
ES6

```
const years = [1990, 1965, 1982];
 const ages = years.map(el => 2017 - el);
 console.log(ages);
 //[27, 52, 35]
```
Arrow function lets us write less code
If we are using multiple arguments in an arrow function, we must use parentheses eg
```
const ageStrings = years.map((el, index) => ``Age of element ${index + 1} is ${2017 - el}``);
 ```
 If our function has more than one line, we must use curly braces and also explicitly specify the return value:
 ```
 const ageStrings = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = new - el;
    return ``Age of element ${index + 1} is ${now - el}``
 } );
 ```
 ### this and Arrow Functions
 Arrow functions do not have their own **this** keyword, they use the **this** keyword of the function that they are written in. We say that they have a lexical **this** variable
 ES5 **this** (problem?):
 ```
 var box5 = {
    color: "green",
    position: 1,
    clickMe: function(){
        document.querySelector(".green").addEventListener("click", function(){
            
           alert("This is box number " + this.position + " , and it is "+ this.color); 
        });
    }
};
box5.clickMe();
```
This will not work as expected because only object methods use the object as their **this** reference. Regular function calls will use the global window object as their this reference. 
Thus the clickMe function uses the box5 object as its **this** reference but the anonymous function/event handler inside of it is a regular function call and thus it uses the global context which has window as its object. The window object does not have the position and color properties and hence our code above would not work. 
The workaround to this is shown below:

 ES5 workaround:
 ```
 var box5 = {
    color: "green",
    position: 1,
    clickMe: function(){
        var self = this;
        document.querySelector(".green").addEventListener("click", function(){
            
           alert("This is box number " + self.position + " , and it is "+ self.color); 
        });
    }
};
box5.clickMe();
```
Here we use the self variable set to our object in our regular function call/event handler and it works fine.
In ES6, the arrow functions always use the **this** object of the surrounding method and so we avoid the problem above:

```
const box6 = {
    color: "green",
    position: 1,
    clickMe: function(){
    document.querySelector(".green").addEventListener("click", ()=>{
           alert("This is box number " + this.position + " , and it is "+ this.color); 
        });
    }
};
```
Use arrow functions when you want to preserve the value of the surrounding this object.

### Function constructors and Arrow functions
ES5
```
function Person(name){
    this.name = name;
}

Person.prototype.myFriends = function(friends){
    var arr = friends.map(function(el){
        return this.name + " is friends with " + el; 
    });
    console.log(arr);
}

var friends = ["Bob", "Jane", "Mark"];
(new Person("Batsi")).myFriends(friends);
```
The above code will run but **this.name** will be undefined. The problem here is similar to what we had above -- the myFriends function rightfully points to the Person object as its **this** reference. However, the map function's anonymous function is a regular function and so does not point to the Person object that invoked the whole process. Instead, this anonymous function is pointing to the window object since it is a regular function call in a global context.
We can fix this in ES5 in two ways:
1. By using the self = this declaration:
```
Person.prototype.myFriends = function(friends){
    var self = this;
    var arr = friends.map(function(el){
        return self.name + " is friends with " + el; 
    });
    console.log(arr);
}
```
OR
2. by using the **bind**, **call** and **apply** methods since they allow us to define the **this** variable manually. **call** immediately runs the function whilst **bind** can be used to create a copy of a function, with some preset variables.

```
Person.prototype.myFriends = function(friends){
    var arr = friends.map(function(el){
        return this.name + " is friends with " + el; 
    }.bind(this));
    console.log(arr);
}
```
By binding this to map's anonymous function, we preset the this variable inside of it

In ES6, arrow functions help us avoid this issue/having to use self = this or bind
```
Person.prototype.myFriends = function(friends){
    var arr = friends.map(el => 
        this.name + " is friends with " + el);
    console.log(arr);
}
```
We can even use template literals
```
Person.prototype.myFriends = function(friends){
    var arr = friends.map(el => 
        ``${this.name} is friends with ${el}``);
    console.log(arr);
}
```
## Destructuring
### For arrays:
ES5:
```
var batsi = [ "Batsi", 26];
var name = batsi[0];
var age = batsi[1];
console.log(name + " " + age);
//Batsi 26
```
ES6:
```
let batsi = ["Batsi", 26];
let [name, age] = batsi;
console.log(``${name} ${age}``);
//Batsi 26
```
### For objects:
ES5:
```
var batsi = { name: "Batsi", age: 26 };
var name = batsi.name;
var age = batsi.age;
console.log(name + " " + age);
//Batsi 26
```
ES6:

```
let batsi = { name: "Batsi", age: 26 };
let { name, age } = batsi;
console.log(``${name} ${age}``);
//Batsi 26
```
Note that in ES6, the names of the new variables have to exactly match keynames in the object in order for them to map as show above. Otherwise they will be undefined.
If we want to use different names for the variables we do it as follows:
```
let batsi = { name: "Batsi", age: 26 };
let { name: theName, age: theAge } = batsi;
console.log(``${theName} ${theAge}``);
//Batsi 26
```
### Returning multiple variables
If we have the function below that returns multiple values:

```
function calcRetirementAge(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
```
ES5:
```
var ageArr = calcRetirementAge(1990);
var age = ageArr[0];
var retirement = ageArr[1];
```
ES6:
```
let [age, retirement] = calcRetirementAge(1990);
```
## Arrays
### New methods
- use the **Array.from** method to get an array from a list
### Looping
When looping through an array with **forEach** or **map** we cannot use a **break** statement. We have to use the simple for(var i...) loop
With ES6 we can use the for-of loop eg for(let el of array){}
### Searching Arrays
ES6 has the **find** and **findIndex** methods 

## Spread Operator
If we have a function
```
function addFourNumbers(a, b, c, d){
    return a + b + c + d;
}
```

if we had these numbers in an array, how would we pass those numbers into this function?

In ES5 we can use the **apply** method. It receives an array and calls a function that will be used on each element of the array. We use it in this case as follows
``` 
var nums = [18, 38, 12, 21];
    var sums = addFourNumbers.apply(null, nums);
```
Here apply takes **null** as its **this** reference since it is not needed but also takes in the array on whose elements and uses all of them as parameters to the addFourNumbers function.

In ES6 we use the spread operator which expands an array into its components.
```
let nums = [18, 38, 12, 21];
let sums = addFourNumbers(...nums);
```
Spread operator can also be used to join arrays:
```
const children = [ "Sam", "Batsi", "Shingi"];
const parents = [ "Baba", "Amai"];
const family = [...parents, ...children];
```

We can use the spread operator on other data structures as well eg a node list returned by **document.querySelectorAll()**
```
const h = document.querySelectorAll("h1");
const p = document.querySelectorAll("p");
const headersAndParagraphs = [...h, ...p];
```
We can then proceed to change the node list to an array and loop through it using the **Array.from()** method then **forEach** to loop.

## Function Parameters
### Rest parameters
Rest parameters allow us to pass an arbitrary number of arguments into a function.
Rest parameters use three dots like the spread operator. The spread operator transforms a structure into its constituent elements whilst rest parameters receive some single values and transform them into an array in the function call.

Each function has a special **arguments** variable which is an object with keys corresponding to the parameters passed into a function. It is an array-like structure but not an array.

ES5:
```
function isFullAge(){
    //get array from arguments object
    var argsArr = Array.prototype.slice.call(arguments);
    //loop and calculate
    argsArr.forEach(function(el){
    console.log((2017 - el) >= 18);
    });
}
```
Even though isFullAge() is defined as taking no arguments, we can call it with variable numbers of arguments and it will still work. eg isFullAge(1980, 1987, 1982, 1900);

ES6:
We can specify the rest parameter operator as an argument in functions that take variable number of arguments.
The rest parameter will transform the arguments into an array and then passes it into the function
```
function isFullAge(...years){
    years.forEach(el=> console.log((2017-el) >= 18);
}
```
The spread operator and rest parameters differ in the places that we use them.
The spread operator can be used in a function call to expand a data structure being passed into its elements. The  rest parameter is used in a function declaration to make the function accept an arbitrary number of arguments.

If we wanted to pass in the age limit dynamically to our isFullAge function here is how we would modify our functions in ES5 and ES6

ES5:
```
function isFullAge(limit){
    //get array from arguments object
    var argsArr = Array.prototype.slice.call(arguments, 1);
    //loop and calculate
    argsArr.forEach(function(el){
    console.log((2017 - el) >= limit);
    });
}
```
Notice that we only pass an extra argument to our slice function which specified the position at which we want to start cutting to get our array. In this case, we skip the limit in the **arguments** variable and get all our other arguments.

ES6:
```
function isFullAge(limit, ...years){
    years.forEach(el=> console.log((2017-el) >= limit);
}
```
We just add the additional parameters before the rest parameter

### Default Parameters
```
function Person(firstName, lastName, yearOfBirth, nationality){
this.firstName = firstName;
this.lastName = lastName;
this.yearOfBirth = yearOfBirth;
this.nationality = nationality;
}
```
JavaScript allows us to call functions without specifying all of the parameters. It will simply assign undefined to the missing parameters. Thus the following code will run:
```var john = new Person("John", "Smith");```
What if we wanted to add a default for the last name and the nationality?
ES5:
```
function Person(firstName, lastName, yearOfBirth, nationality){
lastName = (lastName === undefined)? "Smith":lastName;
nationality = (nationality === undefined)? "Zimbabwean":nationality;
this.firstName = firstName;
this.lastName = lastName;
this.yearOfBirth = yearOfBirth;
this.nationality = nationality;
}
```
ES6:
We can specify the default values right where we declare the parameters
```
function Person(firstName, lastName = "Smith", yearOfBirth, nationality = "American"){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
```
## Maps
A map is a new key-value data structure in ES6.
In an object, we were restricted to using strings as the keys. In maps, we can use any kind of primitive value eg numbers, strings, booleans, even functions and objects

Creating and setting a map
Use **new Map()** to create a map
Use **set(key, value)** to insert elements
```
const question = new Map();
//insert a first key-value pair
 question.set("question", "What is the official name of the latest major JavaScript version?");
 //inserting more key value pairs
 question.set(1, "ES5");
 question.set(2, "ES6");
 question.set(3, "ES2015");
 question.set("correct", 3);
 question.set(true, "Correct answer");
 question.set(false, "Wrong, please try again");
 ```
 Retrieving info from map
 Use the **get(key)** method:
 ```
 console.log(question.get("question"));
 //What is the official name of the latest major JavaScript version?
 ```
 Size of map
 Use the **size** property of the map
 ```
 console.log(question.size);
 // 7
 ```
 Removing elements
 Use the **delete(key)** method
 ```
 question.delete(3);
 console.log(question.size);
 // 6
 ```
 You can also use the **clear** method to remove everything from the map:
 ```
 question.clear();
 ```
 Checking for a key
 Use the **has(key)** method
 ```
 if(question.has(2)){
    question.delete(2);
    console.log(question.size);
 // 5
 }
 ```
 
 Looping through maps
 Use the **forEach** method
 ```
 question.forEach((value, key)=> console.log(``This is ${key}, and its set to ${value}``)); 
 ```
 You can also use the **for-of** method
 ```
 for(let key of question){
    console.log(``This is ${key}, and its set to ${question.get(key)}``));
 }
 ```
 Alternatively you can use the **entries** method to get all the key value pairs as you loop
  ```
  for(let [key, value] of question.entries()){
    console.log(``This is ${key}, and its set to ${value}``));
 }
 ```
 Since map keys can be more than just strings, we can use logic on them:
   ```
   for(let [key, value] of question.entries()){
      if(typeof(key) === "number"){
        console.log(``Answer ${key}:${value}``);
      }
 }
 ```
Maps provide more functionality than regular objects:
-  keys can be more than just strings which opens up other logic possibilities
- we can check the size of a map easily with its **size** property
- maps are iterable thus it is easy to loop and manipulate data in them.

## Classes
Make it easier to implement inheritence and to create objects based on blueprints. In ES5 the blueprints are called function constructors. We added methods to the prototype property of these blueprints in order to extend the behaviour of all instances created from the blueprints.

ES5
```
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

var john = new Person("John", 1990, "teacher");
```
In order to make all instances of the Person blueprint, we add it to the prototype of that function constructor.
```
Person.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
}

console.log(john.calculateAge());
//27 (in 2017)
```
In ES6:
We use the **class** keyword. The class has the same name as a function constructor. A class has to have a **constructor** method
```
class Person{
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
}
```
To add a method to all instances, we can add a method inside of the class:
```
class Person{
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
    }
}
```
### Static methods
We can add static methods to classes. These are not inherited by the instances.
```
class Person{
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
    }
    
    static greeting(){
        console.log("Hey there!");
    }
}

var john = new Person("John", 1990, "teacher");

console.log(john.calculateAge()) // 27 in 2017 (works since it is inherited)

console.log(Person.greeting());
// Hey there!

console.log(john.greeting()); //Error method undefined since it is not inherited
```
Note that class definitions ARE NOT HOISTED. We need to define and implement our classes before we use them.
Also, we can only add methods and not properties to classes