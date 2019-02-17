"use strict";

var imgData;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rw = canvas.width / 2;
var rh = canvas.height / 2;
var radius = Math.min(rw, rh) * 0.9;

// Mapping in the center
ctx.translate(rw, rh);


var imgData;
drawClock();
setInterval(drawClock, 1000);




function drawClock() {
    drawFace();
    drawNumbers();
    drawTime();
}

function drawTime() {
    var dateNow = new Date();
    var hour = dateNow.getHours();
    var seconds = dateNow.getSeconds();
    var minutes = dateNow.getMinutes();

    var posH = hour + minutes / 60 + seconds / 3600;
    console.log("H  " + posH);
    drawHand(posH, radius * 0.5, radius * 0.07);

    var posM = (minutes + seconds / 60) * 12 / 60;
    drawHand(posM, radius * 0.75, radius * 0.07);
    console.log("M  " + posM * 60 / 12);

    var posS = seconds * 12 / 60;
    console.log("S  " + posS * 60 / 12);
    drawHand(posS, radius * 0.9, radius * 0.02);
}

function drawHand(pos, length, width) {
    var ang = (9 + pos) * Math.PI / 6;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.lineTo(length * Math.cos(ang), length * Math.sin(ang));
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

function drawNumbers() {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (var num = 1; num < 13; num++) {
        var t = (9 + num) * Math.PI / 6;
        var x = radius * Math.cos(t);
        var y = radius * Math.sin(t);
        ctx.fillText(num.toString(), 0.85 * x, 0.85 * y);
    }
}

function drawFace() {
    // Circle
    drawCircle(radius, "#ffffff");

    // Outer circle for clock
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    var grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(1, '#000000');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // Middle dot
    drawCircle(radius * 0.1, "#000000");
}


function drawCircle(fradius, fillEnt) {
    ctx.beginPath();
    ctx.arc(0, 0, fradius, 0, 2 * Math.PI);
    ctx.fillStyle = fillEnt;
    ctx.fill();
}
