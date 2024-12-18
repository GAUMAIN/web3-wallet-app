import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

// Configuration des wallets avec RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'My Web3 App',
  projectId: '8d06195ba5434c13a15981b35f24fde7',
  chains: [mainnet],
});

// Configuration wagmi
const config = createConfig({
  chains: [mainnet],
  connectors,
  transports: {
    [mainnet.id]: http('https://rpc.ankr.com/eth'),
  },
});

// Render de l'application React
ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
