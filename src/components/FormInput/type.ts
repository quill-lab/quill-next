import { ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> {
  type?: string;
  regex?: RegExp;
  valuePayload: Path<T>;
  requiredMessage?: string;
  validateErrorMessage?: string;
  validateSuccessMessage?: string;
  label: string;
  disabled?: boolean;
  placeholder: string;
  validate?: (value: string) => boolean;
  children?: ReactNode;
}
