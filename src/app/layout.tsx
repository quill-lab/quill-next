// RootLayout.tsx
import '../styles/global.css';
import 'tailwindcss/tailwind.css';
import { ClientProviders } from './clientProvider';
import { getSession, SessionProvider } from 'next-auth/react';
import AuthProvider from '@/context/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <AuthProvider session={session}>
          <ClientProviders>{children}</ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
