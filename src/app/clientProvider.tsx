'use client';

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo-client';

const theme = createTheme({
  spacing: 1,
});
const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          closeOnClick
          hideProgressBar
          theme={'light'}
        />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
