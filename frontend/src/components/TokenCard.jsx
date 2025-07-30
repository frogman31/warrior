export default function TokenCard({ token }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={token.image_url}
        alt={token.name}
        className="h-12 w-12 object-contain mb-3"
      />
      <h2 className="text-lg font-semibold">{token.name}</h2>
      <p className="text-sm text-gray-600">{token.symbol}</p>

      {token.priceUsd && (
        <p className="text-sm mt-1">💲 {Number(token.priceUsd).toFixed(4)} USD</p>
      )}
      {token.volume24h && (
        <p className="text-sm text-green-600">📈 Vol 24h: ${Math.round(token.volume24h).toLocaleString()}</p>
      )}

      <a
        href={`https://app.uniswap.org/#/swap?outputCurrency=${token.address}&chain=base`}
        target="_blank"
        className="text-blue-600 text-sm underline mt-2 inline-block"
        rel="noreferrer"
      >
        Trade on Uniswap →
      </a>
    </div>
  );
}
