import React from "react";
import { ShoppingCart, X } from "lucide-react";
import type { Opportunity } from "../types";

interface BuyDialogProps {
  isOpen: boolean;
  buyOpportunities: Opportunity[];
  onClose: () => void;
  onBuy: (symbol: string) => void;
}

export const BuyDialog: React.FC<BuyDialogProps> = ({
  isOpen,
  buyOpportunities,
  onClose,
  onBuy,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={20} className="text-green-600" />
            Oportunidades de Compra
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {buyOpportunities.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhuma oportunidade de compra no momento
            </p>
          ) : (
            buyOpportunities.map((opportunity) => (
              <div
                key={opportunity.symbol}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <div className="font-mono font-semibold text-gray-900">
                    {opportunity.symbol.replace("USDT", "")}
                  </div>
                  <div className="text-sm text-gray-600">
                    ${opportunity.price} ({opportunity.diffPercent}%)
                  </div>
                </div>
                <button
                  onClick={() => onBuy(opportunity.symbol)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Comprar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
