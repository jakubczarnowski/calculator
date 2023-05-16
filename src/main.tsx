import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { HistoryProvider } from './providers/HistoryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
