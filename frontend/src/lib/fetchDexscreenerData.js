export async function fetchDexscreenerData(addresses) {
  const results = {};

  const chunks = [];
  for (let i = 0; i < addresses.length; i += 20) {
    chunks.push(addresses.slice(i, i + 20));
  }

  for (const chunk of chunks) {
    const joined = chunk.join(",");
    const url = `https://api.dexscreener.com/latest/dex/search/?chain=base&pairs=${joined}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      data.pairs.forEach(pair => {
        results[pair.baseToken.address.toLowerCase()] = {
          priceUsd: pair.priceUsd,
          volume24h: pair.volume.h24
        };
      });
    } catch (err) {
      console.error("Dexscreener error:", err);
    }
  }

  return results;
}
