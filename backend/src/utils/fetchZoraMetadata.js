const axios = require("axios");

async function fetchZoraMetadata(addresses) {
  const res = await axios.post("https://api.zora.co/metadata/bulk", {
    addresses
  });
  return res.data.tokens.map(token => ({
    name: token.name,
    symbol: token.symbol,
    image_url: token.image,
    address: token.address
  }));
}

module.exports = fetchZoraMetadata;
