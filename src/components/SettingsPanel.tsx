import React, { useState } from "react";
import { X } from "lucide-react";
import type { BotConfig } from "../types";

interface SettingsPanelProps {
  isOpen: boolean;
  config: BotConfig;
  onClose: () => void;
  onSave: (config: BotConfig) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  config,
  onClose,
  onSave,
}) => {
  const [localConfig, setLocalConfig] = useState<BotConfig>(config);

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Configurações</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limite para compra (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={localConfig.buyThresholdPercent}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  buyThresholdPercent: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta de lucro (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={localConfig.profitTargetPercent}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  profitTargetPercent: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Máximo de trades abertos
            </label>
            <input
              type="number"
              value={localConfig.maxOpenTrades}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  maxOpenTrades: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minutos para verificar
            </label>
            <input
              type="number"
              value={localConfig.minutesToCheck}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  minutesToCheck: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
