"use strict";

const framesPerSecond = 50;
const obstaclesPerSecond = 3;
const obstacleSpeed = 2;
const playerSpeed = 5;
const canvasWidth = 500;
const canvasHeight = 300;

var gamePiece;
var obstacles;
var gameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        clearInterval(this.updateInterval);
        clearInterval(this.obstaclesInterval);
        obstacles = [];
        gamePiece = new component(10, 120, 30, 30, "red");
        this.score = 0;
        this.keys = [];
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.backgroundColor = "#b4b7b9";
        this.canvas.classList.add("d-block", "mx-auto");
        this.ctx = this.canvas.getContext("2d");
        document.getElementsByTagName("div")[0].appendChild(this.canvas);
        this.updateInterval = setInterval(updateGameArea, 1000 / framesPerSecond);
        this.obstaclesInterval = setInterval(generateObstacles, 1000 / obstaclesPerSecond);
    },
    clear: function() {
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    },
    stop: function() {
        clearInterval(this.updateInterval);
        clearInterval(this.obstaclesInterval);

        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "50px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game over", canvasWidth / 2, canvasHeight / 2)

        this.canvas.addEventListener("click", startGame)
    }
}

window.addEventListener("keydown", function(evt) {
    gameArea.keys[evt.keyCode] = true;
});
window.addEventListener("keyup", function(evt) {
    gameArea.keys[evt.keyCode] = false;
})

function component(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.opx = x + width;
    this.opy = y + height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opx += this.speedX;
        this.opy += this.speedY;
        gameArea.ctx.fillStyle = color;
        gameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.stopMove = function() {
        this.speedX = 0;
        this.speedY = 0;
    }
    this.newPos = function() {
        this.stopMove();
        if (gameArea.keys[37]) {
            this.speedX += -playerSpeed;
        }
        if (gameArea.keys[38]) {
            this.speedY += -playerSpeed;
        }
        if (gameArea.keys[39]) {
            this.speedX += playerSpeed;
        }
        if (gameArea.keys[40]) {
            this.speedY += playerSpeed;
        }
    }
    this.intersects = function(obs) {
        return (this.opx >= obs.x && obs.opx >= this.x && this.opy >= obs.y && obs.opy >= this.y);
    }
    this.isOutside = function() {
        return (this.opx <= 0 || canvasWidth <= this.x || this.opy <= 0 || canvasHeight <= this.y);
    }
}



function startGame() {
    gameArea.start();
    gameArea.canvas.removeEventListener("click", startGame);
    document.getElementById("score").innerHTML = "Score: " + gameArea.score;
}

function updateGameArea() {
    if (gamePiece.isOutside()) {
        gameArea.stop();
        return;
    }
    for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i].isOutside()) {
            obstacles.splice(i, 1);
            gameArea.score += 1;
            document.getElementById("score").innerHTML = "Score: " + gameArea.score;
        }
    }
    for (var i = 0; i < obstacles.length; i++) {
        if (gamePiece.intersects(obstacles[i])) {
            gameArea.stop();
            return;
        }
    }

    gameArea.clear();
    gamePiece.newPos();
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
    }
    gamePiece.update();
}

function generateObstacles() {
    var x = randomInt(0.6 * canvasWidth, 0.9 * canvasWidth),
        y = randomInt(0.1 * canvasHeight, 0.9 * canvasHeight),
        width = randomInt(0.05 * canvasWidth, 0.1 * canvasWidth),
        height = randomInt(0.05 * canvasHeight, 0.1 * canvasHeight),
        color = randomColor();
    obstacles.push(new component(x, y, width, height, color));
    obstacles[obstacles.length - 1].speedX = -obstacleSpeed;
    obstacles[obstacles.length - 1].speedY = randomInt(-1, 1);
}



function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[randomInt(0, 15)];
    }
    return color;
}
