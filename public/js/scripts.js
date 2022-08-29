"use strict";
const height = 600;
const width = 800;
const boardThickness = 20;
const boardHeight = 80;
let score1 = 0;
let score2 = 0;
let gameLogameLoopToggle = 0;
//create context
const canvas = document.getElementById("context");
const canvasContext = canvas.getContext("2d");
const scorePanel = document.querySelector(".score-panel > .score-container");
const aceNumber = document.querySelector("#aceNumber");
const ballSpeed = document.querySelector("#ballsSpeed");
const aiButton = document.querySelector(".ai-button");
//ball
let bx = Number(width / 2);
let by = Number(height / 2);
const defaultBallSpeed = 8;
const defaultBallSpeedY = 4;
const bd = 12;
let xv = Number(ballSpeed.value || defaultBallSpeed);
let yv = defaultBallSpeedY;
// AI flags
let aiEnabled = false;
let aiSpeed = 8; // AI smartness
let ace = 0;
// panels
let p1y = 100;
let p2y = 100;
const panelSpeed = 16; // For manual player
/**************************************************************************/
function start() {
    // Event Listeners
    canvas.addEventListener("mousemove", function (e) {
        p1y = e.clientY - boardHeight / 2;
    });
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 38) {
            p2y -= panelSpeed;
        }
        else if (event.keyCode === 40) {
            p2y += panelSpeed;
        }
        else if (event.keyCode == 32) {
            togglePlay();
        }
    });
    scorePanel.innerHTML = score1 + " : " + score2;
    // Single show
    gameLoop();
}
function gameLoop() {
    drawPanels();
    drawBall(bx, by, bd);
    bx += xv;
    by += yv;
    //boundaries
    if (by < 0 && yv < 0) {
        yv = -yv;
    }
    if (by > height && yv > 0) {
        yv = -yv;
    }
    // when it hits the pedal from left side
    if (bx < 0 + boardThickness) {
        if (by > p1y && by < (p1y + boardHeight)) {
            xv = -xv * (1 + ace);
            Math.floor(Math.random() * 10) > 5 ? yv = -yv * (1 + ace) : yv = yv * (1 + ace);
        }
        else {
            score2++;
            reset();
        }
    }
    // when it hits the pedal from right side
    if (bx > width - boardThickness) {
        if (by > p2y && by < (p2y + boardHeight)) {
            xv = -xv * (1 + ace);
            Math.floor(Math.random() * 10) > 5 ? yv = -yv * (1 + ace) : yv = yv * (1 + ace);
        }
        else {
            score1++;
            reset();
        }
    }
    if (aiEnabled) {
        if (yv > 0 && (p2y + boardHeight / 2) < height && by > (p2y + boardHeight / 2)) {
            p2y += aiSpeed;
        }
        if (yv < 0 && (p2y + boardHeight / 2) > 0 && by < (p2y + boardHeight / 2)) {
            p2y -= aiSpeed;
        }
    }
}
function reset() {
    scorePanel.innerHTML = score1 + " : " + score2;
    xv = Number(ballSpeed.value || defaultBallSpeed);
    yv = Number(ballSpeed.value || defaultBallSpeed);
    bx = Number(width / 2);
    by = Number(height / 2);
    p1y = 100;
    p2y = 100;
    xv = -xv;
    yv = defaultBallSpeedY;
    clearInterval(gameLogameLoopToggle);
    gameLogameLoopToggle = null;
    gameLoop();
}
function resetScore() {
    score1 = 0;
    score2 = 0;
    reset();
}
function toggleAI() {
    aiEnabled = !aiEnabled;
    if (aiEnabled) {
        aiButton.style.color = "red";
    }
    else {
        aiButton.style.color = "";
    }
}
function togglePlay() {
    if (gameLogameLoopToggle) {
        clearInterval(gameLogameLoopToggle);
        gameLogameLoopToggle = null;
        return;
    }
    gameLogameLoopToggle = setInterval(gameLoop, 1000 / 30);
}
function enableAce() {
    console.log(aceNumber.value);
    ace = parseFloat(aceNumber.value);
    resetScore();
}
window.onload = function () {
    //start game logic
    start();
};
// draw methods
function drawBall(x, y, radius) {
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = 'orange';
    canvasContext.fill();
    canvasContext.lineWidth = 5;
    canvasContext.strokeStyle = '#003300';
    canvasContext.stroke();
}
function drawPanels() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, width, height);
    //player 1 panel
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(0, p1y, boardThickness, boardHeight);
    //player 2 panel
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(width - boardThickness, p2y, boardThickness, boardHeight);
}
//# sourceMappingURL=scripts.js.map