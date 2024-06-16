let score = 0;
const targetScore = 1000;
const elements = {
  bastikImg: document.getElementById("bastik"),
  scoreDisplay: document.getElementById("score"),
  progressBar: document.getElementById("progress-bar"),
  container: document.querySelector(".game"),
  withdrawButton: document.getElementById("withdraw-button"),
  popup: document.getElementById("popup"),
  restartButton: document.getElementById("restart-button"),
  reverseCounter: document.getElementById("reverse-counter"),
  introPopup: document.getElementById("intro-popup"),
  boostButton: document.getElementById("boostButton"),
  boostModal: document.getElementById("boostModal"),
  closeButton: document.querySelector(".close-button"),
  multitapButton: document.getElementById("multitapButton"),
  fullEnergyButton: document.getElementById("fullEnergyButton"),
  changeCoinButton: document.getElementById("changeCoinButton"),
  currentScoreDisplay: document.getElementById("current-score"),
};

let gameActive = true;
let hasInteracted = false;
let lastBoostTime = 0;
let pointsPerClick = 3;
let decreaseInterval = 1500;
let decreaseIntervalId;
let changeCoinBackground = false;

window.addEventListener("load", () => {
  elements.reverseCounter.textContent = `⚡ 0/${targetScore.toLocaleString()}`;
  setTimeout(() => elements.introPopup.remove(), 3000);
});

document.addEventListener("touchstart", () => (hasInteracted = true));

elements.bastikImg.addEventListener("touchstart", (event) => {
  if (gameActive && hasInteracted) {
    event.preventDefault();
    handleTouch(event);
    tiltImage(event);
  }
});
elements.bastikImg.addEventListener("click", (event) => {
  if (gameActive) {
    event.preventDefault();
    handleClick(event);
    tiltImage(event);
  }
});

const handleTouch = (event) => {
  Array.from(event.touches).forEach((touch) => {
    score += pointsPerClick;
    showClickScore(touch);
    triggerVibration();
  });
  updateScoreDisplay();
  updateProgressBar();
  if (score >= targetScore) endGame();
};

const handleClick = (event) => {
  score += pointsPerClick;
  showClickScore(event);
  updateScoreDisplay();
  updateProgressBar();
  if (score >= targetScore) endGame();
};

const updateScoreDisplay = () => {
  elements.scoreDisplay.textContent = score.toLocaleString();
  elements.reverseCounter.textContent = `⚡ ${score.toLocaleString()}/${targetScore.toLocaleString()}`;
};

const updateProgressBar = () => {
  const progress = (score / targetScore) * 100;
  elements.progressBar.innerHTML = `<div style="width: ${progress}%"></div>`;
};

const showClickScore = (event) => {
  const clickScore = document.createElement("div");
  clickScore.className = `game__click-score ${
    changeCoinBackground
      ? "game__click-score-alternate"
      : "game__click-score-default"
  }`;
  clickScore.textContent = `+${pointsPerClick}`;
  elements.container.appendChild(clickScore);

  const containerRect = elements.container.getBoundingClientRect();
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  clickScore.style.left = `${
    clientX - containerRect.left + elements.container.scrollLeft
  }px`;
  clickScore.style.top = `${
    clientY - containerRect.top + elements.container.scrollTop
  }px`;
  clickScore.style.display = "block";

  setTimeout(() => clickScore.remove(), 1000);
};

const triggerVibration = () => {
  if (navigator.vibrate && hasInteracted) navigator.vibrate(100);
};

elements.withdrawButton.addEventListener(
  "click",
  () => (elements.popup.style.display = "flex")
);
elements.restartButton.addEventListener("click", () => {
  elements.popup.style.display = "none";
  resetGame();
});

const endGame = () => {
  gameActive = false;
  elements.withdrawButton.classList.add("game__withdraw-button--visible");
};

const resetGame = () => {
  score = 0;
  gameActive = true;
  pointsPerClick = 3;
  decreaseInterval = 1000;
  clearInterval(decreaseIntervalId);
  decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);
  updateScoreDisplay();
  updateProgressBar();
  elements.withdrawButton.classList.remove("game__withdraw-button--visible");
  elements.bastikImg.src = "./img/bastik.png";
  elements.container.style.background =
    "linear-gradient(to top, #ff8000, #f7be5b, #7b5900, #000000)";
};

const decreaseScore = () => {
  if (gameActive && score > 0) {
    score = Math.max(0, score - 3);
    updateScoreDisplay();
    updateProgressBar();
  }
};

decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);

const tiltImage = (event) => {
  const imgRect = elements.bastikImg.getBoundingClientRect();
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const x = clientX - imgRect.left - imgRect.width / 2;
  const y = clientY - imgRect.top - imgRect.height / 2;
  const rotateX = (y / (imgRect.height / 2)) * 20;
  const rotateY = (x / (imgRect.width / 2)) * 20;

  elements.bastikImg.style.transition = "transform 0.2s";
  elements.bastikImg.style.transform =
    Math.abs(rotateX) > Math.abs(rotateY)
      ? `rotateX(${rotateX > 0 ? 25 : -35}deg)`
      : `rotateY(${rotateY > 0 ? 42 : -33}deg)`;

  setTimeout(() => (elements.bastikImg.style.transform = ""), 200);
};

document.addEventListener("DOMContentLoaded", () => {
  elements.boostButton.addEventListener("click", () => {
    if (gameActive) {
      gameActive = false;
      elements.currentScoreDisplay.textContent = score.toLocaleString();
      elements.boostModal.style.display = "block";
    }
  });

  elements.closeButton.addEventListener("click", () => {
    elements.boostModal.style.display = "none";
    gameActive = true;
  });

  window.addEventListener("click", (event) => {
    if (event.target === elements.boostModal) {
      elements.boostModal.style.display = "none";
      gameActive = true;
    }
  });

  elements.multitapButton.addEventListener("click", () => handleBoost(200, 1));
  elements.fullEnergyButton.addEventListener("click", () =>
    handleBoost(300, 2)
  );
  elements.changeCoinButton.addEventListener(
    "click",
    handleChangeCoinBackground
  );
});

const canUseBoost = () => {
  const now = Date.now();
  if (now - lastBoostTime < 15000) {
    alert("Бусты можно использовать не чаще, чем раз в 15 секунд!");
    return false;
  }
  lastBoostTime = now;
  return true;
};

const showInsufficientFundsMessage = () =>
  alert("У вас недостаточно монет для буста!");

const handleBoost = (cost, clickIncrease) => {
  if (score >= cost) {
    if (canUseBoost()) {
      score -= cost;
      pointsPerClick += clickIncrease;
      elements.boostModal.style.display = "none";
      gameActive = true;
      updateScoreDisplay();
    }
  } else {
    showInsufficientFundsMessage();
  }
};

const handleChangeCoinBackground = () => {
  if (canUseBoost()) {
    changeCoinBackground = !changeCoinBackground;
    elements.container.style.background = changeCoinBackground
      ? "linear-gradient(to top, #599eff, #2132cd, #2c026c, #000000)"
      : "linear-gradient(to top, #ff8000, #f7be5b, #7b5900, #000000)";
    elements.bastikImg.src = changeCoinBackground
      ? "./img/boryan.png"
      : "./img/bastik.png";
    elements.container.classList.toggle("game__click-score-alternate");
    elements.boostModal.style.display = "none";
    gameActive = true;
  }
};

const openModal = (modal) => {
  pauseGame();
  modal.style.display = "flex";
};

const closeModal = (modal) => {
  modal.style.display = "none";
  resumeGame();
};

const pauseGame = () => {
  gameActive = false;
  clearInterval(decreaseIntervalId);
};

const resumeGame = () => {
  gameActive = true;
  decreaseIntervalId = setInterval(decreaseScore, decreaseInterval);
};

document.addEventListener("DOMContentLoaded", () => {
  const rulesLink = document.getElementById("rules-link");
  const sobakensLink = document.getElementById("sobakens-link");
  const helpLink = document.getElementById("help-link");

  const rulesModal = document.getElementById("rules-modal");
  const sobakensModal = document.getElementById("sobakens-modal");
  const helpModal = document.getElementById("help-modal");

  const closeModalButtons = document.querySelectorAll(".close-button");

  rulesLink.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(rulesModal);
  });

  sobakensLink.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(sobakensModal);
  });

  helpLink.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(helpModal);
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal"));
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const copyableElements = document.querySelectorAll(".copyable");

  copyableElements.forEach((element) => {
    element.addEventListener("click", () => {
      const textToCopy = element.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("Скопировано в буфер обмена: " + textToCopy);
        })
        .catch((err) => {
          console.error("Ошибка копирования: ", err);
        });
    });
  });
});
