const boxes = document.querySelectorAll(".box");
//recall that querySelectorAll returns a node list
//we want to make that node list into a node array so we can loop through them with forEach

//ES5
var boxesArr = Array.prototype.slice.call(boxes);

boxesArr.forEach(function(el){
    el.style.backgroundColor = "dodgerblue";
});