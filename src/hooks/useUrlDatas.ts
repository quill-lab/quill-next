import { isNaN } from 'lodash';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

// 문자열을 숫자로 변환하는 유틸리티 함수
function parseValue<T>(value: string): T {
  if (typeof value === 'string') {
    if (!isNaN(Number(value))) {
      return Number(value) as unknown as T;
    }
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return value as unknown as T;
    }
  }
  return value as T;
}
/**
 * url에서 데이터를 가져올 때 사용함
 * @code  useUrlDatas<number>("roomid")
 * @param dataName 가져올 url data의 이름
 * @returns T 타입의 dataName
 */
export function useUrlDatas<T>(dataName: string) {
  const router = useRouter();
  return useMemo(() => {
    const data = router.query[dataName];
    // if (data === undefined) {
    //   return undefined;
    // }
    return parseValue<T>(data as string);
  }, [router.isReady, router.query, dataName]);
}
