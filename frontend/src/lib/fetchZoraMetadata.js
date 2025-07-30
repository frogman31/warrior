export async function fetchZoraMetadata(addresses) {
  const res = await fetch("https://api.zora.co/metadata/bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ addresses })
  });

  if (!res.ok) throw new Error("Gagal fetch metadata dari Zora");

  const data = await res.json();
  return data.tokens.map(token => ({
    name: token.name,
    symbol: token.symbol,
    image_url: token.image,
    address: token.address
  }));
}
