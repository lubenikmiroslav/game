const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImg = new Image();
playerImg.src = "images/dogo.png";

const redSquareImg = new Image();
redSquareImg.src = "images/tenis.png";

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 300,
  speed: 10,
};

let score = 0;

const enemy = [];
const keyState = {};

const borderSize = 10;

function drawPlayer() {
  ctx.drawImage(playerImg, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

function drawenemy() {
  enemy.forEach((square) => {
    ctx.drawImage(redSquareImg, square.x, square.y, square.size, square.size);
  });
}

function drawScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
  drawPlayer();
  drawenemy();
  drawScore();

  enemy.forEach((square, index) => {
    const distance = Math.hypot(player.x - square.x, player.y - square.y);

    if (distance < player.size / 2 + square.size / 2) {
      enemy.splice(index, 1);
      score++;
      addRedSquare();
    }
  });
}

function addRedSquare() {
  const size = 69;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);

  enemy.push({ x, y, size });
}

function handleMovement() {
  if (keyState["a"] && player.x - player.size / 2 > borderSize) {
    player.x -= player.speed;
  }
  if (keyState["d"] && player.x + player.size / 2 < canvas.width - borderSize) {
    player.x += player.speed;
  }
  if (keyState["w"] && player.y - player.size / 2 > borderSize) {
    player.y -= player.speed;
  }
  if (keyState["s"] && player.y + player.size / 2 < canvas.height - borderSize) {
    player.y += player.speed;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleMovement();
  update();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  keyState[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keyState[event.key] = false;
});

addRedSquare();
gameLoop();

const openBtn = document.getElementById("open-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

openBtn.addEventListener("click", () => {
  sidebar.style.width = "250px";
});

closeBtn.addEventListener("click", () => {
  sidebar.style.width = "0";
});
