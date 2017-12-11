const boxes = document.querySelectorAll(".box");

//ES5
var boxesArr = Array.prototype.slice.call(boxes);

boxesArr.forEach(function(el){
    el.style.backgroundColor = "dodgerblue";
});