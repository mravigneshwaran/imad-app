console.log('Loaded!');
//change the text of main-div
var element = document.getElementById('main-text');
element.innerHTML = 'New value';

//move the image
var img = document.getElementById("modi");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
    
}
img.onclick = function(){
    var interval = setInterval(moveRight,100);
    
}