import { config } from '@/config/config';

type apiMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
interface CallApi {
  url: string;
  body?: any;
  method: apiMethod;
  token?: string | null;
}
export default async function callApi<T>({ url, body, method, token }: CallApi): Promise<T> {
  const init: RequestInit = {
    credentials: 'include',
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : '',
    },
    body: body ? JSON.stringify(body) : null,
  };
  const res = await fetch(config.apiLink + url, init);
  // 에러면 에러 반환
  if (!res.ok) {
    return { statusCode: res.status } as T;
  }
  // 200이 아닌 성공은 boolean 반환
  if (res.status !== 200 && res.status !== 201) {
    return res.ok as T;
  }
  // 200인 성공은 body반환
  return res.json();
}
