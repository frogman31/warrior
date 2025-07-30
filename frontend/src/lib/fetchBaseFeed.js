export async function fetchBaseFeed() {
  const res = await fetch("https://api.zora.co/base-app-feed");
  if (!res.ok) throw new Error("Gagal fetch Base Feed");
  const data = await res.json();
  return data.feed.map(item => item.token_address);
}
