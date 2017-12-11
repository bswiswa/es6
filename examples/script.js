const boxes = document.querySelectorAll(".box");
//recall that querySelectorAll returns a node list
//we want to make that node list into a node array so we can loop through them with forEach

//ES5
/*
var boxesArr = Array.prototype.slice.call(boxes);

boxesArr.forEach(function(el){
    el.style.backgroundColor = "dodgerblue";
});

*/

//ES6
// using the from method
const boxesArr = Array.from(boxes);
boxesArr.forEach(el=> el.style.backgroundColor = "dodgerblue");

//ES5
/*for(var i = 0; i < boxesArr.length; i++){
    if(boxesArr[i].className === "box blue")
        continue;
    else
        boxesArr[i].textContent = "I changed to blue";
}
*/

//ES6
for(const el of boxesArr){
    if(el.className === "box blue")
        continue;
    else
        el.textContent = "I changed to blue";
}

// we can also use the includes methods eg el.className.includes("blue")