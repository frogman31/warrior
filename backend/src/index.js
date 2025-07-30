import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create output directory if not exists
const outputDir = path.join(__dirname, '../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const outputFilePath = path.join(outputDir, 'tokens.json');

// ----------------------------
// ✅ Fungsi: Ambil data Base Feed
// ----------------------------
async function fetchBaseFeed() {
  const url = 'https://api.zora.co/baseapp/feed';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gagal fetch Base Feed: ${res.status}`);
  const json = await res.json();
  return json.feed;
}

// ----------------------------
// ✅ Fungsi: Ambil metadata dari Zora
// ----------------------------
async function fetchZoraMetadata(contract, tokenId) {
  const url = `https://api.zora.co/token/${contract}/${tokenId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return json.token;
}

// ----------------------------
// ✅ Proses utama: Gabungkan data
// ----------------------------
async function processAndSaveTokens() {
  try {
    console.log('🚀 Mengambil data Base Feed...');
    const feed = await fetchBaseFeed();

    const tokens = [];

    for (const post of feed) {
      if (!post.tokenContract || !post.tokenId) continue;

      const metadata = await fetchZoraMetadata(post.tokenContract, post.tokenId);
      if (!metadata) continue;

      tokens.push({
        name: metadata.name || 'Unknown',
        image: metadata.image || '',
        contract: post.tokenContract,
        tokenId: post.tokenId,
        createdAt: post.createdAt,
      });
    }

    // Tulis hasilnya
    fs.writeFileSync(outputFilePath, JSON.stringify(tokens, null, 2));
    console.log(`✅ Sukses menulis ${tokens.length} token ke tokens.json`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Jalankan fetch awal
processAndSaveTokens();

// ----------------------------
// ✅ Serve statis folder output di /api
// ----------------------------
app.use('/api', express.static(outputDir));

app.listen(port, () => {
  console.log(`📡 Server berjalan di http://localhost:${port}`);
  console.log(`📁 File tokens tersedia di http://localhost:${port}/api/tokens.json`);
});
