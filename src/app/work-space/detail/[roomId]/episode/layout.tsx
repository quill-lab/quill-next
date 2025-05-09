import LoadingBar from '@/components/atoms/LoadingBar';
import React, { Suspense } from 'react';

const EpisodeLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
};

export default EpisodeLayout;
