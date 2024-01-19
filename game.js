const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

//platno se bude rovnat velikosti celeho okna
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//nastaveni fotek jak hrace tak "enemy"
const playerImg = new Image();
playerImg.src = "images/dogo.png";

const redSquareImg = new Image();
redSquareImg.src = "images/tenis.png";

//nastaveni velikostnich proporci pro hrace
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 300,
  speed: 20,
};

//nase skore je na zacatku nula a muze se pozdeji menit
let score = 0;

//souper a sledovani zda li je tlacitko stisknute a nebo ne 
//enemy je umisteni do nahodneho pole
const enemy = [];
const keyState = {};

//nastaveni okraju pro herni platno
const borderSize = 10;

//vykresli hrace jako predem zvolenou fotku a danych rozmerech
function drawPlayer() {
  ctx.drawImage(playerImg, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

//vykresli soupere jako predem zvolenou fotku a danych rozmerech
function drawenemy() {
  enemy.forEach((square) => {
    ctx.drawImage(redSquareImg, square.x, square.y, square.size, square.size);
  });
}

//vypisuje na skore, skore se nam aktualizuje
function drawScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

//umeny u hrace(pohyb), enemy kde se nachazi a skore ktere se nam pricita
function update() {
  drawPlayer();
  drawenemy();
  drawScore();

  //vzdalenost enemy od hrace, pokud se hrac "dotkne", enemy zmizi
  enemy.forEach((square, index) => {
    const distance = Math.hypot(player.x - square.x, player.y - square.y);

    if (distance < player.size / 2 + square.size / 2) {
      enemy.splice(index, 1); //pri dotyku s polem se vymaze obsah pole
      score++;
      addRedSquare();
    }
  });
}

function addRedSquare() { //pridava nam dalsi soupere
  const size = 100;
  let x, y;

  do {
    x = Math.random() * (canvas.width - size); //kde se bude enemy spawnovat
    y = Math.random() * (canvas.height - size);
  } while (Math.hypot(player.x - x, player.y - y) < 500); // Zajistí, že minimální vzdálenost je 500 px

  enemy.push({ x, y, size, currentImageIndex: 0 }); //push nam vykresly soupere do pole
}

//sleduje sstisk klavesy a jejich spusteni, u "w" nam zvisuje hodnotu y a podobne
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

//opakovani hry
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //aktualizuje pozice x,y
  handleMovement();
  update();

  //pro plynulost
  requestAnimationFrame(gameLoop);
}

//pokud je klavesa stisknuta tak se aktualizuje hra
window.addEventListener("keydown", (event) => {
  keyState[event.key] = true;
});

//kdyz ji pustime tak prestane
window.addEventListener("keyup", (event) => {
  keyState[event.key] = false;
});

addRedSquare();
gameLoop();

//pro side bar s dalsimi hernimy mody 
const openBtn = document.getElementById("open-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

//akce se provede po kliknuti mysi
openBtn.addEventListener("click", () => {
  sidebar.style.width = "250px";
});

//akce se provede po kliknuti mysi
closeBtn.addEventListener("click", () => {
  sidebar.style.width = "0";
});

//hudba na pozadi se spusti po stisknuti jakekoliv klavesy za pouziti "keydown"
var backgroundMusic = document.getElementById("backgroundMusic");
document.addEventListener("keydown", function() {
  backgroundMusic.volume = 0.1; //hlasitost
  backgroundMusic.play(); //spusteni hudby 
});
