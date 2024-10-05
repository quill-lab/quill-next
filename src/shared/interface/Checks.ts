export interface Checks<T> {
  key: keyof T;
  essential: boolean;
  errorMsg: string;
  isError: boolean;
}
