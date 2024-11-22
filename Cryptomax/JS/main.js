async function fetchAndDisplayPrice(symbol, containerId) {
  try {
    const response = await fetch(
      `http://localhost:3001/cryptoprice?symbol=${symbol}`
    );

    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return;
    }

    const { price } = await response.json();
    const formattedPrice = parseFloat(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    document.getElementById(containerId).innerText = formattedPrice;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchAndDisplayPrice("BTCUSDT", "cryptoPriceBTC");
fetchAndDisplayPrice("ETHUSDT", "cryptoPriceETH");
fetchAndDisplayPrice("SOLUSDT", "cryptoPriceSOL");
