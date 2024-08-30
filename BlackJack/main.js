let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function createCard(cardSrc) {
  let cardImg = document.createElement("img");
  cardImg.src = cardSrc;
  cardImg.classList.add("card-img"); // Добавляем класс card-img
  return cardImg;
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  while (dealerSum < 17) {
    let cardImg = createCard("./img/" + deck.pop() + ".png");
    dealerSum += getValue(cardImg.src);
    dealerAceCount += checkAce(cardImg.src);
    document.getElementById("dealer-cards").append(cardImg);
  }

  for (let i = 0; i < 2; i++) {
    let cardImg = createCard("./img/" + deck.pop() + ".png");
    yourSum += getValue(cardImg.src);
    yourAceCount += checkAce(cardImg.src);
    document.getElementById("your-cards").append(cardImg);
  }

  document.getElementById("your-sum").innerText = yourSum;

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = createCard("./img/" + deck.pop() + ".png");
  yourSum += getValue(cardImg.src);
  yourAceCount += checkAce(cardImg.src);
  document.getElementById("your-cards").append(cardImg);

  document.getElementById("your-sum").innerText = yourSum;

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./img/" + hidden + ".png";

  let message = "";
  if (yourSum > 21) {
    message = "Вы проиграли!";
  } else if (dealerSum > 21) {
    message = "Дилер проиграл, вы выиграли!";
  } else if (yourSum == dealerSum) {
    message = "Ничья!";
  } else if (yourSum > dealerSum) {
    message = "Вы выиграли!";
  } else if (yourSum < dealerSum) {
    message = "Вы проиграли!";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;

  document.getElementById("restart").style.display = "inline-block";
  document.getElementById("restart").addEventListener("click", restartGame);
}

function restartGame() {
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;
  canHit = true;

  document.getElementById("dealer-cards").innerHTML =
    '<img id="hidden" src="./img/back.png" class="card-img">';
  document.getElementById("your-cards").innerHTML = "";
  document.getElementById("dealer-sum").innerText = "0";
  document.getElementById("your-sum").innerText = "0";
  document.getElementById("results").innerText = "";

  buildDeck();
  shuffleDeck();
  startGame();

  document.getElementById("restart").style.display = "none";
}

function getValue(cardSrc) {
  let data = cardSrc.split("/").pop().split("-"); // "4-C.png" -> ["4", "C.png"]
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(cardSrc) {
  if (cardSrc[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
