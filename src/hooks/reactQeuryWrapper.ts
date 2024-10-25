import {
  DefaultError,
  MutationOptions,
  QueryKey,
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';

// type UseMutationWrap<
//   TData = unknown,
//   TError = DefaultError,
//   TVariables = void,
//   TContext = unknown
// > = MutationOptions<TData, TError, TVariables, TContext>;
export function useMutationWrap<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>({ onSuccess, onError, ...props }: MutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation({
    ...props,
    onSuccess,
    onError(error, variable, context) {
      console.log(error);
      if (!onError) {
        return;
      }
      onError(error, variable, context);
    },
  });
}

export function useQueryWrap<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & {
    cacheTime?: number;
  }
): UseQueryResult<TData, TError> {
  const querys = useQuery<TQueryFnData, TError, TData, TQueryKey>(options);

  useEffect(() => {
    // console.log('useQueryWrap');
    // console.log(options.queryKey);
    if (!querys.isError) {
      return;
    }
    // console.log('query err');
    // console.log(querys.error);
  }, [querys.isError]);

  return querys;
}
