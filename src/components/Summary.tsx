import React from "react";
import { RefreshCw, Circle } from "lucide-react";
import type { Opportunity } from "../types";

interface SummaryProps {
  opportunities: Opportunity[];
  buyOpportunities: Opportunity[];
  positionsCount: number;
}

export const Summary: React.FC<SummaryProps> = ({
  opportunities,
  buyOpportunities,
  positionsCount,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {opportunities.length} moedas monitoradas
          </span>
        </div>
        {buyOpportunities.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
            <Circle size={8} className="fill-current" />
            <span className="text-sm font-medium">
              {buyOpportunities.length} oportunidade
              {buyOpportunities.length > 1 ? "s" : ""} de compra
            </span>
          </div>
        )}
        {positionsCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            <Circle size={8} className="fill-current" />
            <span className="text-sm font-medium">
              {positionsCount} posição{positionsCount > 1 ? "ões" : ""} aberta
              {positionsCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {buyOpportunities.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Oportunidades:</strong>{" "}
            {buyOpportunities
              .map((o) => `${o.symbol.replace("USDT", "")}(${o.diffPercent}%)`)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};
