const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const padImg = new Image();
padImg.src = "saba.png";

const dropImg = new Image();
dropImg.src = "gota_sangre.png";

let padX = canvas.width / 2 - 40;
const padY = canvas.height - 100;
const padSpeed = 10;

let drops = [];

function createDrop() {
  drops.push({ x: Math.random() * (canvas.width - 20), y: -40, speed: 2 + Math.random() * 3 });
}

function drawPad() {
  ctx.drawImage(padImg, padX, padY, 80, 100);
}

function drawDrops() {
  drops.forEach((drop) => {
    ctx.drawImage(dropImg, drop.x, drop.y, 20, 20);
  });
}

function updateDrops() {
  drops.forEach((drop, index) => {
    drop.y += drop.speed;

    // Check collision
    if (
      drop.y + 20 >= padY &&
      drop.x + 10 >= padX &&
      drop.x <= padX + 80
    ) {
      drops.splice(index, 1); // Caught
    }

    // Remove if out of bounds
    if (drop.y > canvas.height) {
      drops.splice(index, 1);
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPad();
  drawDrops();
  updateDrops();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && padX > 0) {
    padX -= padSpeed;
  } else if (e.key === "ArrowRight" && padX < canvas.width - 80) {
    padX += padSpeed;
  }
});

setInterval(createDrop, 1000);
gameLoop();
