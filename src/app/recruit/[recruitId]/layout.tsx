'use client';

import { Suspense } from 'react';
import LoadingBar from '@/components/atoms/LoadingBar';

export default function RecruitDetailLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
}
