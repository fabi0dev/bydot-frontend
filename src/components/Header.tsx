import React from "react";
import { Bot, Play, Pause, Settings } from "lucide-react";
import type { BotConfig } from "../types";

interface HeaderProps {
  lastUpdate: Date;
  config: BotConfig;
  onToggleActive: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdate,
  config,
  onToggleActive,
  onOpenSettings,
}) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Crypto Bot
              </h1>
              <p className="text-sm text-gray-500">
                Última atualização: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleActive}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                config.isActive
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {config.isActive ? <Play size={16} /> : <Pause size={16} />}
              {config.isActive ? "Ativo" : "Pausado"}
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
