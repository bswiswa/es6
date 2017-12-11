# Notes
Official name is EcmaScript 2015
Currently ES5 is the version supported by all browsers.
- ES6 has partial support so it should be used with care in production.
- There is also ES2016 but it has few new features

## Variable declarations
`let` keyword is used to declare variables
Variables declared with `let` are block-scoped whilst those declared with `var` are function-scoped.
Thus:
`function es5(condition){
    if(condition){
        var name;
        var dob;
        name = "Batsi";
        dob = "01/01/1900";
    }
    console.log(name + " " + dob);
}
`
The above code will compile in ES5 because `var name` is function-scoped. However:
`function es6(condition){
    if(condition){
        let name;
        const dob;
        name = "Batsi";
        dob = "01/01/1900";
    }
    console.log(name + " " + dob);
}
`
does not compile in ES6 because `let name` is block-scoped and thus `name` is only accessible in the if block. the following will work:
`function es6(condition){
    let name;
    const dob = "01/01/1900";
    
    if(condition){
        name = "Batsi";
    }
    console.log(name + " " + dob);
}
`
...notice that we have to declare the `const` immediately.
- in ES6, variables are hoisted but they are not accessible until we declare them. In ES5, if you tried to use a variable that is declared later on in a function, you got the `undefined` result whereas you get an error in ES6.

ES5:
`
var i = 20;
for(var i = 1; i < 5; i++){
    console.log(i);
}
console.log(i);
// 1 2 3 4 5
`
...recall that `var` is function-scoped so it is overwritten

ES6:
`
let i = 20;
for(let i = 1; i < 5; i++){
    console.log(i);
}
console.log(i);
// 1 2 3 4 20
`
...recall that `let` is block-scoped so it is unaffected

## Blocks and IIFEs
In ES5 we used IIFEs for data privacy by creating anonymous funcitons of code that hid some variables. This was the only way to hide data since `var` is function-scoped. For example

`(function(){
    var name = "Batsi";
    var dob = "01/01/1900";
})();

//thus we cannot access our vars name and dob out here
console.log(name + " " + dob); // will not work
`

In ES6, `let` and `const` are block-scoped. Thus we can achieve the same level of data-hiding by merely creating a block ({ }) of code eg
`{
   let name = "Batsi";
   const dob = "01/01/1900";
 }
 
 //thus we cannot access our vars name and dob out here
console.log(name + " " + dob); // will not work
 `

## Strings
### Template Literals
ES5
`
var firstName = "Batsi";
var lastName = "Swiswa";

console.log("This is "+ firstName + " " + lastName);
`
ES6
Use back-ticks to tell JavaScript that we want to use a template literal
`
let firstName = "Batsi";
let lastName = "Swiswa";

console.log(``This is ${firstName} ${lastName}. This year is ${(new Date()).getFullYear()}``);
`
You can even run functions inside template literals as well as shown above.
### New String methods
Other methods available for strings
` let firstName = "Batsi";
    console.log(firstName.startsWith("B"));
    //true
    console.log(firstName.endsWith("i"));
    //false
    console.log(firstName.includes("o"));
    //false
    console.log(firstName.repeat(3));
    //BatsiBatsiBatsi
    `

## Arrow Functions
ES5
`var years = [1990, 1965, 1982];
var ages = years.map(function(el){
    return 2017 - el;
});
console.log(ages);
//[27, 52, 35]
`
ES6
`const years = [1990, 1965, 1982];
 const ages = years.map(el => 2017 - el);
 console.log(ages);
 //[27, 52, 35]
 `
Arrow function lets us write less code
If we are using multiple arguments in an arrow function, we must use parentheses eg
`const ageStrings = years.map((el, index) => ``Age of element ${index + 1} is ${2017 - el}``);
 `
 If our function has more than one line, we must use curly braces and also explicitly specify the return value:
 `const ageStrings = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = new - el;
    return ``Age of element ${index + 1} is ${now - el}``
 } );
 `
 ### this and Arrow Functions
 Arrow functions do not have their own *this* keyword, they use the *this* keyword of the function that they are written in. We say that they have a lexical *this* variable
 ES5 *this* (problem?):
 `var box5 = {
    color: "green",
    position: 1,
    clickMe: function(){
        document.querySelector(".green").addEventListener("click", function(){
            
           alert("This is box number " + this.position + " , and it is "+ this.color); 
        });
    }
};
box5.clickMe();
`
This will not work as expected because only object methods use the object as their *this* reference. Regular function calls will use the global window object as their this reference. 
Thus the clickMe function uses the box5 object as its *this* reference but the anonymous function/event handler inside of it is a regular function call and thus it uses the global context which has window as its object. The window object does not have the position and color properties and hence our code above would not work. 
The workaround to this is shown below:

 ES5 workaround:
 `var box5 = {
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
`
Here we use the self variable set to our object in our regular function call/event handler and it works fine.
In ES6, the arrow functions always use the *this* object of the surrounding method and so we avoid the problem above:

`const box6 = {
    color: "green",
    position: 1,
    clickMe: function(){
    document.querySelector(".green").addEventListener("click", ()=>{
           alert("This is box number " + this.position + " , and it is "+ this.color); 
        });
    }
};
`
Use arrow functions when you want to preserve the value of the surrounding this object.

### Function constructors and Arrow functions
ES5
`
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
`
The above code will run but *this.name* will be undefined. The problem here is similar to what we had above -- the myFriends function rightfully points to the Person object as its *this* reference. However, the map function's anonymous function is a regular function and so does not point to the Person object that invoked the whole process. Instead, this anonymous function is pointing to the window object since it is a regular function call in a global context.
We can fix this in ES5 in two ways:
1. By using the self = this declaration:
`
Person.prototype.myFriends = function(friends){
    var self = this;
    var arr = friends.map(function(el){
        return self.name + " is friends with " + el; 
    });
    console.log(arr);
}
`
OR
2. by using the *bind*, *call* and *apply* methods since they allow us to define the *this* variable manually. *call* immediately runs the function whilst *bind* can be used to create a copy of a function, with some preset variables.

`
Person.prototype.myFriends = function(friends){
    var arr = friends.map(function(el){
        return this.name + " is friends with " + el; 
    }.bind(this));
    console.log(arr);
}
`
By binding this to map's anonymous function, we preset the this variable inside of it

In ES6, arrow functions help us avoid this issue/having to use self = this or bind
`
Person.prototype.myFriends = function(friends){
    var arr = friends.map(el => 
        this.name + " is friends with " + el);
    console.log(arr);
}
`
We can even use template literals
`
Person.prototype.myFriends = function(friends){
    var arr = friends.map(el => 
        ``${this.name} is friends with ${el}``);
    console.log(arr);
}
`
## Destructuring
### For arrays:
ES5:
`
var batsi = [ "Batsi", 26];
var name = batsi[0];
var age = batsi[1];
console.log(name + " " + age);
//Batsi 26
`
ES6:
`
let batsi = ["Batsi", 26];
let [name, age] = batsi;
console.log(``${name} ${age}``);
//Batsi 26
`
### For objects:
ES5:
`
var batsi = { name: "Batsi", age: 26 };
var name = batsi.name;
var age = batsi.age;
console.log(name + " " + age);
//Batsi 26
`
ES6:
`
let batsi = { name: "Batsi", age: 26 };
let { name, age } = batsi;
console.log(``${name} ${age}``);
//Batsi 26
`
Note that in ES6, the names of the new variables have to exactly match keynames in the object in order for them to map as show above. Otherwise they will be undefined.
If we want to use different names for the variables we do it as follows:
`
let batsi = { name: "Batsi", age: 26 };
let { name: theName, age: theAge } = batsi;
console.log(``${theName} ${theAge}``);
//Batsi 26
`
### Returning multiple variables
If we have the function below that returns multiple values:

`function calcRetirementAge(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
`
ES5:
`var ageArr = calcRetirementAge(1990);
var age = ageArr[0];
var retirement = ageArr[1];
`
ES6:
`let [age, retirement] = calcRetirementAge(1990);
`
## Arrays
### New methods
- use the *Array.from* method to get an array from a list
### Looping
When looping through an array with *forEach* or *map* we cannot use a *break* statement. We have to use the simple for(var i...) loop
With ES6 we can use the for-of loop eg for(let el of array){}
### Searching Arrays
ES6 has the *find* and *findIndex* methods 
