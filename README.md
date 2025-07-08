# Crypto Bot Frontend

Interface de usuário para um bot de trading de criptomoedas, desenvolvido com React, TypeScript, Tailwind CSS e React Query.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Query (TanStack Query)** - Gerenciamento de estado e cache de dados
- **Axios** - Cliente HTTP para requisições à API
- **Lucide React** - Ícones modernos
- **Vite** - Build tool e dev server

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ActionButtons.tsx
│   ├── BuyDialog.tsx
│   ├── Header.tsx
│   ├── OpportunityCard.tsx
│   ├── SellDialog.tsx
│   ├── SettingsPanel.tsx
│   ├── Summary.tsx
│   └── index.ts
├── hooks/              # Hooks customizados
│   └── useCryptoData.ts
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Definições de tipos TypeScript
│   └── index.ts
├── utils/              # Utilitários e helpers
│   └── mockData.ts
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🏗️ Arquitetura

### Componentes

- **Header**: Cabeçalho com status do bot e configurações
- **ActionButtons**: Botões para acessar oportunidades e posições
- **Summary**: Resumo das informações principais
- **OpportunityCard**: Card individual para cada oportunidade
- **BuyDialog**: Modal para oportunidades de compra
- **SellDialog**: Modal para posições abertas
- **SettingsPanel**: Modal de configurações

### Hooks Customizados

- **useOpportunities**: Busca oportunidades de trading
- **usePositions**: Busca posições abertas
- **useConfig**: Busca configurações do bot
- **useUpdateConfig**: Atualiza configurações
- **useBuyOpportunity**: Executa compra de oportunidade
- **useSellPosition**: Executa venda de posição

### Serviços

- **cryptoService**: Cliente HTTP configurado com Axios
- Interceptors para tratamento de erros
- Fallback para dados mock em desenvolvimento

## 🚀 Como Executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**

   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api
```

### API Backend

O projeto espera uma API backend com os seguintes endpoints:

- `GET /api/opportunities` - Lista oportunidades
- `GET /api/positions` - Lista posições abertas
- `GET /api/config` - Busca configurações
- `PUT /api/config` - Atualiza configurações
- `POST /api/buy` - Executa compra
- `POST /api/sell` - Executa venda

## 🎨 Funcionalidades

### ✅ Implementadas

- [x] Interface responsiva com Tailwind CSS
- [x] Gerenciamento de estado com React Query
- [x] Componentes modulares e reutilizáveis
- [x] Dados mock para desenvolvimento
- [x] Loading states e tratamento de erros
- [x] Configurações do bot
- [x] Visualização de oportunidades e posições
- [x] Simulação de compra e venda

### 🔄 Em Desenvolvimento

- [ ] Integração com API real
- [ ] Notificações em tempo real
- [ ] Gráficos de performance
- [ ] Histórico de trades
- [ ] Autenticação de usuário

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎯 Padrões de Código

- **TypeScript**: Tipagem forte em todo o projeto
- **Componentes Funcionais**: Uso de hooks modernos
- **Props Interface**: Tipagem explícita de props
- **Error Boundaries**: Tratamento de erros
- **Loading States**: Estados de carregamento
- **Mock Data**: Dados simulados para desenvolvimento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
