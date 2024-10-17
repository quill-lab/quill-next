import '../styles/global.css';
import 'tailwindcss/tailwind.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';

import { PageHeader } from '@/components/PageHeader/PageHeader';

const theme = createTheme({
  spacing: 1,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/*<SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>*/}

        <PageHeader />
        <Component {...pageProps} />
        {/*</SnackbarProvider>*/}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
