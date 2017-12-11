const box6 = {
    color: "green",
    position: 1,
    clickMe: function(){ document.querySelector(".green").addEventListener("click", ()=>{
            
           alert("This is box number " + this.position + " , and it is "+ this.color); 
        });
    }
};
box6.clickMe();