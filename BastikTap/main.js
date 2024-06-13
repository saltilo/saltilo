let score = 0;
const targetScore = 500;
const hamsterImg = document.getElementById("hamster");
const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const container = document.querySelector(".game");
const withdrawButton = document.getElementById("withdraw-button");
const popup = document.getElementById("popup");
const restartButton = document.getElementById("restart-button");
const reverseCounter = document.getElementById("reverse-counter");
const introPopup = document.getElementById("intro-popup");
let gameActive = true;
let hasInteracted = false;

window.addEventListener("load", () => {
  reverseCounter.textContent = `⚡ 0/${targetScore.toLocaleString()}`;

  setTimeout(() => {
    introPopup.remove();
  }, 3500);
});

document.addEventListener("touchstart", () => {
  hasInteracted = true;
});

hamsterImg.addEventListener("touchstart", (event) => {
  if (gameActive && hasInteracted) {
    event.preventDefault();
    handleTouch(event);
    tiltImage(event);
  }
});

function handleTouch(event) {
  const touches = event.touches;
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    score += 3;
    showClickScore(touch);
    triggerVibration();
  }
  updateScoreDisplay();
  updateProgressBar();

  if (score >= targetScore) {
    endGame();
  }
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score.toLocaleString();
  reverseCounter.textContent = `⚡ ${score.toLocaleString()}/${targetScore.toLocaleString()}`;
}

function updateProgressBar() {
  const progress = (score / targetScore) * 100;
  progressBar.innerHTML = `<div style="width: ${progress}%"></div>`;
}

function showClickScore(touch) {
  const clickScore = document.createElement("div");
  clickScore.className = "game__click-score";
  clickScore.textContent = "+3";
  container.appendChild(clickScore);

  const containerRect = container.getBoundingClientRect();
  const x = touch.clientX - containerRect.left + container.scrollLeft;
  const y = touch.clientY - containerRect.top + container.scrollTop;

  clickScore.style.left = `${x}px`;
  clickScore.style.top = `${y}px`;
  clickScore.style.display = "block";

  setTimeout(() => {
    clickScore.remove();
  }, 1000);
}

function triggerVibration() {
  if (navigator.vibrate && hasInteracted) {
    navigator.vibrate(100);
  }
}

withdrawButton.addEventListener("click", () => {
  popup.style.display = "flex";
});

restartButton.addEventListener("click", () => {
  popup.style.display = "none";
  resetGame();
});

function endGame() {
  console.log("Game ended");
  gameActive = false;
  withdrawButton.classList.add("game__withdraw-button--visible");
}

function resetGame() {
  score = 0;
  gameActive = true;
  updateScoreDisplay();
  progressBar.innerHTML = '<div style="width: 0;"></div>';
  withdrawButton.classList.remove("game__withdraw-button--visible");
}

function decreaseScore() {
  if (gameActive && score > 0) {
    score -= 3;
    if (score < 0) {
      score = 0;
    }
    updateScoreDisplay();
    updateProgressBar();
  }
}

setInterval(decreaseScore, 500);

function tiltImage(event) {
  const imgRect = hamsterImg.getBoundingClientRect();
  const x = event.touches[0].clientX - imgRect.left - imgRect.width / 2;
  const y = event.touches[0].clientY - imgRect.top - imgRect.height / 2;

  const rotateX = (y / (imgRect.height / 2)) * 20;
  const rotateY = (x / (imgRect.width / 2)) * 20;

  hamsterImg.style.transition = "transform 0.2s";
  if (Math.abs(rotateX) > Math.abs(rotateY)) {
    hamsterImg.style.transform =
      rotateX > 0 ? "rotateX(25deg)" : "rotateX(-35deg)";
  } else {
    hamsterImg.style.transform =
      rotateY > 0 ? "rotateY(42deg)" : "rotateY(-33deg)";
  }

  setTimeout(() => {
    hamsterImg.style.transform = "";
  }, 200);
}
