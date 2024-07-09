const canvas = document.getElementById("canvas");
const dotsNumberInp = document.querySelector("input[name='dotsNumber']");
const captureRadiusInp = document.querySelector("input[name='captureRadius']");
const controlApplyBtn = document.querySelector(".controlApply");
const panel = document.querySelector(".panel");
const panelToggler = document.querySelector(".panel .toggler");

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

let NUMBER_OF_DOTS = 50;
let dots = [];
let nearest = [];
let captureRadius = 200;
let cursor = { x: 0, y: 0 };

dotsNumberInp.value = NUMBER_OF_DOTS;
captureRadiusInp.value = captureRadius;

initDots(NUMBER_OF_DOTS);

panelToggler.addEventListener("click", () => {
  panel.classList.toggle("open");
});

controlApplyBtn.addEventListener("click", () => {
  let dotNumberValue = Number(dotsNumberInp.value);
  let captureRadiusVlaue = Number(captureRadiusInp.value);

  if (dotNumberValue > 0) {
    initDots(dotNumberValue);
  }

  if (captureRadiusVlaue > 0) {
    captureRadius = captureRadiusVlaue;
  }
});

document.addEventListener("resize", () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
});

document.addEventListener("mousemove", (ev) => {
  cursor.x = ev.clientX;
  cursor.y = ev.clientY;

  nearest = [];
  dots.forEach((dot) => {
    let nearX = Math.abs(cursor.x - dot.x);
    let nearY = Math.abs(cursor.y - dot.y);

    if (captureRadius > nearX && captureRadius > nearY) {
      nearest.push(dot);
    }
  });
});

function initDots(n = NUMBER_OF_DOTS) {
  dots = [];
  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);
    let color = getRandomColor();
    dots.push({
      x,
      y,
      color,
    });
  }
}

function makeDots(x, y, r = 10, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
}

function getRandomColor() {
  return `rgb(${Array.from({ length: 3 })
    .fill(0)
    .map(() => Math.floor(Math.random() * 255))
    .join(",")})`;
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  dots.forEach(({ x, y, color }) => {
    makeDots(x, y, 10, color);
  });

  nearest.forEach((nearDot) => {
    ctx.beginPath();
    ctx.strokeStyle = nearDot.color;
    ctx.moveTo(cursor.x, cursor.y);
    ctx.lineTo(nearDot.x, nearDot.y);
    ctx.stroke();
  });
}

animate();
