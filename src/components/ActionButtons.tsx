import React from "react";
import { ShoppingCart, DollarSign } from "lucide-react";

interface ActionButtonsProps {
  buyOpportunitiesCount: number;
  positionsCount: number;
  onOpenBuyDialog: () => void;
  onOpenSellDialog: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  buyOpportunitiesCount,
  positionsCount,
  onOpenBuyDialog,
  onOpenSellDialog,
}) => {
  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={onOpenBuyDialog}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        <ShoppingCart size={18} />
        Oportunidades de Compra
        {buyOpportunitiesCount > 0 && (
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            {buyOpportunitiesCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenSellDialog}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <DollarSign size={18} />
        Posições Abertas
        {positionsCount > 0 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {positionsCount}
          </span>
        )}
      </button>
    </div>
  );
};
