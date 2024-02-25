// запрос API-ключа с сервера и вывод курсов валют на странице

function fetchAndDisplayPrice(symbol, containerId) {
  var alias;

  switch (symbol) {
    case "BTCUSDT":
      alias = "BTC";
      break;
    case "ETHUSDT":
      alias = "ETH";
      break;
    case "SOLUSDT":
      alias = "SOL";
      break;
    default:
      alias = symbol;
  }

  console.log(`Fetching data for symbol: ${symbol}`);

  fetch(`http://localhost:3000/getCryptoPrice/${symbol}`)
    .then((response) => response.json())
    .then((result) => {
      var priceAsNumber = parseFloat(result.price);
      var formattedPrice = priceAsNumber.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      var formattedResult = formattedPrice + "<br>";

      document.getElementById(containerId).innerHTML = formattedResult;
      console.log(`Data fetched for symbol: ${symbol}`);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchAndDisplayPrice("BTCUSDT", "cryptoPriceBTC");
fetchAndDisplayPrice("ETHUSDT", "cryptoPriceETH");
fetchAndDisplayPrice("SOLUSDT", "cryptoPriceSOL");

// скрипт для аккордеона

document.addEventListener("DOMContentLoaded", function () {
  var accordionButtons = document.querySelectorAll(".accordion-btn");

  accordionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      this.classList.toggle("open");
      var content = this.nextElementSibling;

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
});

// генератор случайных чисел

document.addEventListener("DOMContentLoaded", function () {
  const generateFormattedNumber = () => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomValue = (getRandomInt(-9, 9) + Math.random()).toFixed(2);
    const formattedNumber = (randomValue >= 0 ? "+" : "") + randomValue + "%";

    return formattedNumber;
  };

  const cryptoCardDynamicBlocks = document.querySelectorAll(
    ".crypto-card-dynamic"
  );

  cryptoCardDynamicBlocks.forEach((block) => {
    const generatedFormattedNumber = generateFormattedNumber();
    block.textContent = generatedFormattedNumber;

    if (parseFloat(generatedFormattedNumber) >= 0) {
      block.style.color = "green";
    } else {
      block.style.color = "red";
    }
  });
});
