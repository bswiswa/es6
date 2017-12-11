//1. find the position of element that is 18 and over
//2. find the age at that position

//ES5
var ages = [12, 17, 5, 21, 14, 11];
var full = ages.map(function(el){
   return el >= 18; 
});
var position = full.indexOf(true);
//to get the age at that position
var fullAge = ages[position];

//ES6
let index = ages.findIndex(el => el >= 18);
let fullAgeAtIndex = ages.find(el => el > = 18);