import React from "react";
import { TrendingUp, TrendingDown, Circle } from "lucide-react";
import type { Opportunity } from "../types";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  const isBuySignal = opportunity.action === "buy";
  const isPositive = opportunity.diffPercent >= 0;

  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${
        isBuySignal
          ? "bg-green-50 border-green-200 shadow-sm"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-gray-900">
            {opportunity.symbol.replace("USDT", "")}
          </span>
          {isBuySignal && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <Circle size={6} className="fill-current" />
              BUY
            </div>
          )}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {opportunity.diffPercent}%
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Preço atual:</span>
          <span className="font-mono">${opportunity.price}</span>
        </div>
        <div className="flex justify-between">
          <span>Menor preço:</span>
          <span className="font-mono">${opportunity.lowestPrice}</span>
        </div>
      </div>
    </div>
  );
};
