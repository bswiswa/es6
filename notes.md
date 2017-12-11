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
