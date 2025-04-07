// RootLayout.tsx
import './globals.css';
import { ClientProviders } from './clientProvider';
import { getSession, SessionProvider } from 'next-auth/react';
import AuthProvider from '@/context/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import { Suspense } from 'react';
import LoadingBar from '@/components/atoms/LoadingBar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <AuthProvider session={session}>
          <ClientProviders>
            <Suspense fallback={<LoadingBar />}>{children}</Suspense>
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
