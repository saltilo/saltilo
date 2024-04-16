async function fetchAndDisplayPrice(symbol, containerId) {
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

  try {
    const apiKey = "8sdMh+lOjcw0zSZ/oEXiTw==6erEa9PmhxsEHMsL";

    const response = await fetch(
      `https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

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
    } else {
      console.error("Failed to fetch data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchAndDisplayPrice("BTCUSDT", "cryptoPriceBTC");
fetchAndDisplayPrice("ETHUSDT", "cryptoPriceETH");
fetchAndDisplayPrice("SOLUSDT", "cryptoPriceSOL");

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
