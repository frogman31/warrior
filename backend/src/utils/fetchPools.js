import fetch from 'node-fetch';

const ALCHEMY_RPC = 'https://base-mainnet.g.alchemy.com/v2/4a3c0583-7563-4e1c-9373-3a68f48f6b5d';

export async function fetchUniswapPools(tokenAddresses = []) {
  const pools = [];

  for (const address of tokenAddresses) {
    const logs = await fetch(ALCHEMY_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getLogs",
        params: [{
          fromBlock: "0x0",
          toBlock: "latest",
          address: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
          topics: [
            "0xddf252ad..."
          ]
        }]
      })
    });

    const result = await logs.json();
    pools.push({
      tokenAddress: address,
      liquidityUSD: Math.random() * 10000,
      volumeUSD: Math.random() * 3000
    });
  }

  return pools;
}
