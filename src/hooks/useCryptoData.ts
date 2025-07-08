import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cryptoService } from "../services/api";
import {
  generateMockOpportunities,
  generateMockPositions,
} from "../utils/mockData";
import type { BotConfig, Position } from "../types";

// Hook para buscar oportunidades
export const useOpportunities = () => {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      try {
        return await cryptoService.getOpportunities();
      } catch {
        // Em caso de erro (API não disponível), usar dados mock
        console.log("Usando dados mock para oportunidades");
        return generateMockOpportunities();
      }
    },
    refetchInterval: 5000, // Atualiza a cada 5 segundos
    staleTime: 2000, // Considera os dados frescos por 2 segundos
  });
};

// Hook para buscar posições
export const usePositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      try {
        return await cryptoService.getPositions();
      } catch {
        // Em caso de erro (API não disponível), usar dados mock
        console.log("Usando dados mock para posições");
        return generateMockPositions();
      }
    },
    refetchInterval: 5000,
    staleTime: 2000,
  });
};

// Hook para buscar configurações
export const useConfig = () => {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      try {
        return await cryptoService.getConfig();
      } catch {
        // Em caso de erro, retornar configuração padrão
        console.log("Usando configuração padrão");
        return {
          buyThresholdPercent: 0.4,
          profitTargetPercent: 1,
          maxOpenTrades: 3,
          minutesToCheck: 30,
          isActive: true,
        };
      }
    },
    staleTime: 30000, // Configurações mudam menos frequentemente
  });
};

// Hook para atualizar configurações
export const useUpdateConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: BotConfig) => {
      try {
        return await cryptoService.updateConfig(config);
      } catch {
        // Em caso de erro, apenas atualizar o cache local
        console.log("Atualizando configuração localmente");
        return config;
      }
    },
    onSuccess: (updatedConfig) => {
      queryClient.setQueryData(["config"], updatedConfig);
    },
  });
};

// Hook para comprar oportunidade
export const useBuyOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      symbol,
      quantity,
    }: {
      symbol: string;
      quantity: number;
    }): Promise<Position> => {
      try {
        return await cryptoService.buyOpportunity(symbol, quantity);
      } catch {
        // Em caso de erro, simular uma posição criada
        console.log("Simulando compra de oportunidade");
        return {
          id: `pos_${Date.now()}`,
          symbol,
          buyPrice: Math.random() * 1000 + 100,
          currentPrice: Math.random() * 1000 + 100,
          quantity,
          profitPercent: 0,
          profitUSD: 0,
          timestamp: new Date(),
        };
      }
    },
    onSuccess: () => {
      // Invalida e refetch das posições após compra
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    },
  });
};

// Hook para vender posição
export const useSellPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (positionId: string) => {
      try {
        return await cryptoService.sellPosition(positionId);
      } catch {
        // Em caso de erro, apenas logar
        console.log("Simulando venda de posição");
        return Promise.resolve();
      }
    },
    onSuccess: () => {
      // Invalida e refetch das posições após venda
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};
