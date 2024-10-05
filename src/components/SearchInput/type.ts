import { ChangeEvent } from 'react';

export interface SearchInputProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitSearch: () => void;
  search: string;
  style?: string;
}
