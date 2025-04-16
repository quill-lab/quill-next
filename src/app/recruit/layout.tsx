'use client';

import { Suspense } from 'react';
import LoadingBar from '@/components/atoms/LoadingBar';

export default function RecruitLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
}
