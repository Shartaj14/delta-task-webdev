let boxsize = 25;
let rows = 20;
let cols = 20;
let board;
let context; 
let snakeX = boxsize * 2;
let snakeY = boxsize * 18;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * boxsize;
    board.width = cols * boxsize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, boxsize, boxsize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="green";
    snakeX += velocityX * boxsize;
    snakeY += velocityY * boxsize;
    context.fillRect(snakeX, snakeY, boxsize, boxsize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxsize, boxsize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*boxsize || snakeY < 0 || snakeY > rows*boxsize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * boxsize;
    foodY = Math.floor(Math.random() * rows) * boxsize;
}