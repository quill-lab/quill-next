'use client';

import { Suspense } from 'react';
import LoadingBar from '@/components/atoms/LoadingBar';

export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
}
