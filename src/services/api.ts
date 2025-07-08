import axios from "axios";
import type { ApiResponse, Opportunity, Position, BotConfig } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error);
    return Promise.reject(error);
  }
);

// Serviços da API
export const cryptoService = {
  // Buscar oportunidades
  getOpportunities: async (): Promise<Opportunity[]> => {
    const response = await api.get<ApiResponse<Opportunity[]>>(
      "/opportunities"
    );
    return response.data.data;
  },

  // Buscar posições
  getPositions: async (): Promise<Position[]> => {
    const response = await api.get<ApiResponse<Position[]>>("/positions");
    return response.data.data;
  },

  // Buscar configurações
  getConfig: async (): Promise<BotConfig> => {
    const response = await api.get<ApiResponse<BotConfig>>("/config");
    return response.data.data;
  },

  // Atualizar configurações
  updateConfig: async (config: BotConfig): Promise<BotConfig> => {
    const response = await api.put<ApiResponse<BotConfig>>("/config", config);
    return response.data.data;
  },

  // Comprar uma oportunidade
  buyOpportunity: async (
    symbol: string,
    quantity: number
  ): Promise<Position> => {
    const response = await api.post<ApiResponse<Position>>("/buy", {
      symbol,
      quantity,
    });
    return response.data.data;
  },

  // Vender uma posição
  sellPosition: async (positionId: string): Promise<void> => {
    await api.post<ApiResponse<void>>("/sell", { positionId });
  },
};

export default api;
