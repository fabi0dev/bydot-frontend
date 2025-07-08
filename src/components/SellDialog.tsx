import React from "react";
import { DollarSign, X } from "lucide-react";
import type { Position } from "../types";

interface SellDialogProps {
  isOpen: boolean;
  positions: Position[];
  onClose: () => void;
  onSell: (positionId: string) => void;
}

export const SellDialog: React.FC<SellDialogProps> = ({
  isOpen,
  positions,
  onClose,
  onSell,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign size={20} className="text-blue-600" />
            Posições Abertas
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {positions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhuma posição aberta
            </p>
          ) : (
            positions.map((position) => (
              <div
                key={position.id}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono font-semibold text-gray-900">
                    {position.symbol.replace("USDT", "")}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      position.profitPercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {position.profitPercent >= 0 ? "+" : ""}
                    {position.profitPercent}%
                  </div>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>Quantidade:</span>
                    <span>{position.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preço compra:</span>
                    <span>${position.buyPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preço atual:</span>
                    <span>${position.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P&L:</span>
                    <span
                      className={
                        position.profitUSD >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {position.profitUSD >= 0 ? "+" : ""}${position.profitUSD}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSell(position.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Vender
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
