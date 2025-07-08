import React, { useState, useEffect } from "react";
import {
  Header,
  ActionButtons,
  Summary,
  OpportunityCard,
  BuyDialog,
  SellDialog,
  SettingsPanel,
} from "./components";
import {
  useOpportunities,
  usePositions,
  useConfig,
  useUpdateConfig,
  useBuyOpportunity,
  useSellPosition,
} from "./hooks/useCryptoData";

import type { BotConfig } from "./types";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Hooks do React Query
  const { data: opportunities = [], isLoading: opportunitiesLoading } =
    useOpportunities();
  const { data: positions = [], isLoading: positionsLoading } = usePositions();
  const { data: config, isLoading: configLoading } = useConfig();

  // Mutations
  const updateConfigMutation = useUpdateConfig();
  const buyOpportunityMutation = useBuyOpportunity();
  const sellPositionMutation = useSellPosition();

  // Configuração padrão caso não carregue da API
  const defaultConfig: BotConfig = {
    buyThresholdPercent: 0.4,
    profitTargetPercent: 1,
    maxOpenTrades: 3,
    minutesToCheck: 30,
    isActive: true,
  };

  const currentConfig = config || defaultConfig;

  // Simular dados mock para desenvolvimento (quando não há API)
  useEffect(() => {
    const updateMockData = () => {
      // Em desenvolvimento, simular dados mock
      if (process.env.NODE_ENV === "development") {
        // Os dados mock são gerados automaticamente pelos hooks
        setLastUpdate(new Date());
      }
    };

    updateMockData();
    const interval = setInterval(updateMockData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filtrar oportunidades de compra
  const buyOpportunities = opportunities.filter((o) => o.action === "buy");

  // Handlers
  const handleToggleActive = () => {
    if (currentConfig) {
      updateConfigMutation.mutate({
        ...currentConfig,
        isActive: !currentConfig.isActive,
      });
    }
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleSaveConfig = (newConfig: BotConfig) => {
    updateConfigMutation.mutate(newConfig);
  };

  const handleBuy = (symbol: string) => {
    // Quantidade padrão para compra (pode ser ajustada)
    const quantity = 0.1;
    buyOpportunityMutation.mutate({ symbol, quantity });
    setShowBuyDialog(false);
  };

  const handleSell = (positionId: string) => {
    sellPositionMutation.mutate(positionId);
    setShowSellDialog(false);
  };

  // Loading states
  if (opportunitiesLoading || positionsLoading || configLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        lastUpdate={lastUpdate}
        config={currentConfig}
        onToggleActive={handleToggleActive}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Action Buttons */}
        <ActionButtons
          buyOpportunitiesCount={buyOpportunities.length}
          positionsCount={positions.length}
          onOpenBuyDialog={() => setShowBuyDialog(true)}
          onOpenSellDialog={() => setShowSellDialog(true)}
        />

        {/* Summary */}
        <Summary
          opportunities={opportunities}
          buyOpportunities={buyOpportunities}
          positionsCount={positions.length}
        />

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.symbol}
              opportunity={opportunity}
            />
          ))}
        </div>
      </main>

      {/* Modals */}
      <SettingsPanel
        isOpen={showSettings}
        config={currentConfig}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveConfig}
      />

      <BuyDialog
        isOpen={showBuyDialog}
        buyOpportunities={buyOpportunities}
        onClose={() => setShowBuyDialog(false)}
        onBuy={handleBuy}
      />

      <SellDialog
        isOpen={showSellDialog}
        positions={positions}
        onClose={() => setShowSellDialog(false)}
        onSell={handleSell}
      />
    </div>
  );
}

export default App;
