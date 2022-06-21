x = 0;
y = 0;
screenWidth = 0;
screenHeight = 0;
var apple = undefined;
drawApple = false;
count = 0;
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
speakData = "";
threshold = 2500;

function preload() {
	apple = loadImage("apple.png");
}

function start() {
	document.getElementById("status").innerHTML = "Please speak";
	recognition.start();
}

recognition.onresult = function (event) {
	// console.log(event);
	content = event.results[0][0].transcript;
	console.log(content);
	count = Number(content);
	console.log(count);
	if (Number.isInteger(count)) {
		document.getElementById("status").innerHTML = "Drawing...";
		drawApple = true;
	} else {
		document.getElementById("status").innerHTML = "The speech has not been recognized as a number. (NaN)";
	}

	// document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
};

function setup() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	createCanvas(screenWidth, screenHeight - 150);
}

function draw() {
	if (drawApple == true) {
		if(count >= threshold) {
			setTimeout(function () {
				speakData = `More than ${threshold} objects requested, refreshing recommended.`;
				speak();
			},3000)
		}

		for (let i = 0; i <= count; i++) {
			x = Math.floor(Math.random() * screenWidth - 128);
			y = Math.floor(Math.random() * screenHeight - 128);
			image(apple, x, y, 128, 128);
		}

		drawApple = false;
		document.getElementById("status").innerHTML = count + " Apples drawn";
		speakData = count + " Apples Drawn";
		speak();
	}
}

function speak() {
	var synth = window.speechSynthesis;
	var utterThis = new SpeechSynthesisUtterance(speakData);
	synth.speak(utterThis);
	speakData = "";
}