// src/utils/fetchBaseFeed.js
import fetch from 'node-fetch';

export default async function fetchBaseFeed(retries = 5, delay = 1500) {
  const url = 'https://api.zora.co/baseapp/feed';

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; WarriorBot/1.0)',
        },
        timeout: 10000 // optional: 10 detik timeout
      });

      if (!res.ok) {
        throw new Error(`Status: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (!json.feed) {
        throw new Error('Respons tidak mengandung field feed.');
      }

      return json.feed;
    } catch (err) {
      console.warn(`⏳ Percobaan ${i + 1} gagal: ${err.message}`);
      if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
    }
  }

  throw new Error('❌ Gagal fetch Base Feed setelah beberapa percobaan.');
}
