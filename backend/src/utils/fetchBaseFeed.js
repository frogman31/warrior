import fetch from 'node-fetch';
import AbortController from 'abort-controller';

export default async function fetchBaseFeed(retries = 5, delay = 1500) {
  const url = 'https://api.zora.co/baseapp/feed';

  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; WarriorBot/1.0)',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
