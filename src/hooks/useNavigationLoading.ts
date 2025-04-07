import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useNavigationLoading = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Next.js 13 이상에서는 events가 없으므로 window의 popstate 이벤트를 사용
    window.addEventListener('popstate', handleComplete);

    // 페이지 이동 시작 시 로딩 상태를 true로 설정
    const handleBeforeUnload = () => setIsLoading(true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handleComplete);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const push = (url: string) => {
    setIsLoading(true);
    router.push(url);
  };

  return { isLoading, push };
};
