export interface Opportunity {
  symbol: string;
  price: number;
  lowestPrice: number;
  diffPercent: number;
  action: "buy" | "none";
}

export interface Position {
  id: string;
  symbol: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  profitPercent: number;
  profitUSD: number;
  timestamp: Date;
}

export interface BotConfig {
  buyThresholdPercent: number;
  profitTargetPercent: number;
  maxOpenTrades: number;
  minutesToCheck: number;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
