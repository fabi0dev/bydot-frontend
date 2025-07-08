import type { Opportunity, Position } from "../types";

const mainCoins = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "AVAXUSDT",
  "LINKUSDT",
];

// Gerador de oportunidades mock
export const generateMockOpportunities = (): Opportunity[] => {
  return mainCoins.map((symbol) => {
    const basePrice = Math.random() * 1000 + 100;
    const lowestPrice = basePrice * (0.95 + Math.random() * 0.1);
    const price = lowestPrice * (0.98 + Math.random() * 0.04);
    const diff = price - lowestPrice;
    const diffPercent = parseFloat(((diff / lowestPrice) * 100).toFixed(2));
    const action: Opportunity["action"] =
      diffPercent < 0 && Math.abs(diffPercent) >= 0.4 ? "buy" : "none";

    return {
      symbol,
      price: parseFloat(price.toFixed(4)),
      lowestPrice: parseFloat(lowestPrice.toFixed(4)),
      diffPercent,
      action,
    };
  });
};

// Gerador de posições mock
export const generateMockPositions = (): Position[] => {
  const positions: Position[] = [];
  const positionCount = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < positionCount; i++) {
    const symbol = mainCoins[Math.floor(Math.random() * mainCoins.length)];
    const buyPrice = Math.random() * 1000 + 100;
    const currentPrice = buyPrice * (0.98 + Math.random() * 0.06);
    const quantity = parseFloat((Math.random() * 10 + 0.1).toFixed(4));
    const profitPercent = parseFloat(
      (((currentPrice - buyPrice) / buyPrice) * 100).toFixed(2)
    );
    const profitUSD = parseFloat(
      (quantity * (currentPrice - buyPrice)).toFixed(2)
    );

    positions.push({
      id: `pos_${i}`,
      symbol,
      buyPrice: parseFloat(buyPrice.toFixed(4)),
      currentPrice: parseFloat(currentPrice.toFixed(4)),
      quantity,
      profitPercent,
      profitUSD,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
    });
  }

  return positions;
};
