var colorCount = 6;
var isHard = true;
var colors = [];
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var pickedColor = colors[PickColor()];
var h1 = document.querySelector("h1");
var restartButton = document.querySelector("#reset");
var header = document.querySelector("#header");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

init();
easyButton.addEventListener("click", function(){
	if (isHard) {
		isHard = false;
		easyButton.classList.add("selected");
		hardButton.classList.remove("selected");
		colorCount = 3;
		for (var i = 0; i < colorCount; i++) {
			squares[(i+3)].style.display = "none";
		}
		restart();
	}

})
hardButton.addEventListener("click", function(){
	if (!isHard) {
		isHard = true;
		hardButton.classList.add("selected");
		easyButton.classList.remove("selected");
		colorCount = 6;
		restart();
		for (var i = 3; i < 6; i++) {
			squares[i].style.display = "block";
		}
	}

})

restartButton.addEventListener("click", function(){
	restart();
});


function init(){
	for (var i = 0; i <squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "You Picked Right!";
			setAllColorsTo(pickedColor);
			restartButton.textContent = "Play Again!";
			header.style.backgroundColor = pickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again!";
			messageDisplay.style.color = "#000000";
		}
	});
}

 restart();
}
function setAllColorsTo(color) {
	squares.forEach(function (square){
		square.style.backgroundColor = color;
	})
}

function PickColor(){
	var quantity;
	if (isHard) {
		quantity = 6;
	} else {
		quantity = 3;
	}
	return Math.floor(Math.random() * quantity );
}
function createNewColors(numbers){
	var arr = [];
	for (var i = 0; i < numbers; i++) {
		arr.push(createRandomStringColor());
	}
    return arr;
}

function createRandomStringColor(){
	var newColor = "rgb(" + randomInt() + ", " + randomInt() + ", " + randomInt() + ")" ;
//	console.log(newColor);
	return newColor;
}
function randomInt(){
	return Math.floor(Math.random() * 256);
}
function restart(){
	colors = createNewColors(colorCount);
	pickedColor = colors[PickColor()];
	colorDisplay.textContent = pickedColor;
	this.textContent = "Pick New Colors!";
	header.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	restartButton.textContent = "New Colors!";
	for (var i = 0; i <squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
}