import express from "express";
import { fetchBaseFeedWithRetry } from "./fetchBaseFeedWithRetry.js";

const app = express();
const PORT = 3001;

let cachedTokens = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

app.get("/api/tokens.json", async (req, res) => {
  const now = Date.now();

  if (!cachedTokens.length || now - lastFetchTime > CACHE_DURATION) {
    try {
      cachedTokens = await fetchBaseFeedWithRetry();
      lastFetchTime = now;
    } catch (err) {
      return res.status(500).json({ error: "Gagal mengambil data Base Feed", detail: err.message });
    }
  }

  res.json({ tokens: cachedTokens });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`🗂️  Endpoint tokens: http://localhost:${PORT}/api/tokens.json`);
});
