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