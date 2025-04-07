'use client';

import { useNavigationLoading } from '@/hooks/useNavigationLoading';
import LoadingBar from '@/components/atoms/LoadingBar';

export default function GlobalLoading() {
  const { isLoading } = useNavigationLoading();

  if (!isLoading) return null;

  return <LoadingBar />;
}
