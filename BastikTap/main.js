let score = 0;
const targetScore = 1000;
const bastikImg = document.getElementById("bastik");
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
let lastBoostTime = 0;
let pointsPerClick = 3;
let decreaseInterval = 1500;
let decreaseIntervalId;
let changeCoinBackground = false;

window.addEventListener("load", () => {
  reverseCounter.textContent = `⚡ 0/${targetScore.toLocaleString()}`;

  setTimeout(() => {
    introPopup.remove();
  }, 3000);
});

document.addEventListener("touchstart", () => {
  hasInteracted = true;
});

bastikImg.addEventListener("touchstart", (event) => {
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
    score += pointsPerClick;
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
  clickScore.textContent = `+${pointsPerClick}`;
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
  pointsPerClick = 3;
  decreaseInterval = 500;
  clearInterval(decreaseIntervalId);
  decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);
  fullEnergyActivated = false;
  updateScoreDisplay();
  progressBar.innerHTML = '<div style="width: 0;"></div>';
  withdrawButton.classList.remove("game__withdraw-button--visible");
  bastikImg.src = "./img/bastik.png";
  container.style.background =
    "linear-gradient(to top, #ff8000, #f7be5b, #7b5900, #000000)";
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

decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);

function tiltImage(event) {
  const imgRect = bastikImg.getBoundingClientRect();
  const x = event.touches[0].clientX - imgRect.left - imgRect.width / 2;
  const y = event.touches[0].clientY - imgRect.top - imgRect.height / 2;

  const rotateX = (y / (imgRect.height / 2)) * 20;
  const rotateY = (x / (imgRect.width / 2)) * 20;

  bastikImg.style.transition = "transform 0.2s";
  if (Math.abs(rotateX) > Math.abs(rotateY)) {
    bastikImg.style.transform =
      rotateX > 0 ? "rotateX(25deg)" : "rotateX(-35deg)";
  } else {
    bastikImg.style.transform =
      rotateY > 0 ? "rotateY(42deg)" : "rotateY(-33deg)";
  }

  setTimeout(() => {
    bastikImg.style.transform = "";
  }, 200);
}

document.addEventListener("DOMContentLoaded", function () {
  const boostButton = document.getElementById("boostButton");
  const boostModal = document.getElementById("boostModal");
  const closeButton = document.querySelector(".close-button");
  const multitapButton = document.getElementById("multitapButton");
  const fullEnergyButton = document.getElementById("fullEnergyButton");
  const changeCoinButton = document.getElementById("changeCoinButton");
  const currentScoreDisplay = document.getElementById("current-score");

  boostButton.addEventListener("click", function () {
    if (gameActive) {
      gameActive = false;
      currentScoreDisplay.textContent = score.toLocaleString();
      boostModal.style.display = "block";
    }
  });

  closeButton.addEventListener("click", function () {
    boostModal.style.display = "none";
    gameActive = true;
  });

  window.addEventListener("click", function (event) {
    if (event.target == boostModal) {
      boostModal.style.display = "none";
      gameActive = true;
    }
  });

  function canUseBoost() {
    const now = Date.now();
    if (now - lastBoostTime < 15000) {
      alert("Вы не можете использовать этот буст чаще, чем раз в 15 секунд!");
      return false;
    }
    lastBoostTime = now;
    return true;
  }

  function showInsufficientFundsMessage() {
    alert("У вас недостаточно монет для использования этого буста!");
  }

  multitapButton.addEventListener("click", function () {
    if (score >= 200) {
      if (canUseBoost()) {
        score -= 200;
        pointsPerClick += 1;
        boostModal.style.display = "none";
        gameActive = true;
        updateScoreDisplay();
      }
    } else {
      showInsufficientFundsMessage();
    }
  });

  fullEnergyButton.addEventListener("click", function () {
    if (score >= 300) {
      if (canUseBoost()) {
        score -= 300;
        pointsPerClick += 2;
        clearInterval(decreaseIntervalId);
        decreaseInterval = 300;
        decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);
        boostModal.style.display = "none";
        gameActive = true;
        updateScoreDisplay();
      }
    } else {
      showInsufficientFundsMessage();
    }
  });

  changeCoinButton.addEventListener("click", function () {
    if (canUseBoost()) {
      changeCoinBackground = !changeCoinBackground;
      container.style.background = changeCoinBackground
        ? "linear-gradient(to top, #599eff, #2132cd, #2c026c, #000000)"
        : "linear-gradient(to top, #ff8000, #f7be5b, #7b5900, #000000)";
      bastikImg.src = changeCoinBackground
        ? "./img/boryan.png"
        : "./img/bastik.png";
      document
        .querySelectorAll(".game__click-score")
        .forEach(
          (el) =>
            (el.style.color = changeCoinBackground ? "#ffffff" : "#310303")
        );
      boostModal.style.display = "none";
      gameActive = true;
    }
  });
});
