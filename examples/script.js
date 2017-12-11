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