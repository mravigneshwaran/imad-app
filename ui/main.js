console.log('Loaded!');
//change the text of main-div
var element = document.getElementById('main-text');
element.innerHTML = 'New value';

//move the image
var img = document.getElementById("modi");
img.onClick = function(){
    img.style.marginLeft = '100px';
}