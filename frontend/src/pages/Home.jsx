import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const res = await fetch("http://localhost:3001/api/tokens.json");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const json = await res.json();
      setTokens(json);
    } catch (err) {
      console.error("Gagal memuat data token:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🛡️ Warrior: Daftar Token</h1>

      {loading ? (
        <p>🔄 Memuat data token...</p>
      ) : tokens.length === 0 ? (
        <p>❌ Tidak ada data token ditemukan.</p>
      ) : (
        <ul className="space-y-2">
          {tokens.map((token, i) => (
            <li key={i} className="border p-3 rounded">
              <strong>{token.tokenName}</strong> <br />
              {token.tokenAddress} <br />
              <span className="text-xs text-gray-500">Created: {token.createdAt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
