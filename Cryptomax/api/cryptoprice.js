import fetch from "node-fetch";

export default async function handler(req, res) {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  try {
    const apiUrl = `https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}`;
    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": process.env.API_KEY },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
