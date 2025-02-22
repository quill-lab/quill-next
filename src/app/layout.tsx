// RootLayout.tsx
import '../styles/global.css';
import 'tailwindcss/tailwind.css';
import { ClientProviders } from './clientProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
