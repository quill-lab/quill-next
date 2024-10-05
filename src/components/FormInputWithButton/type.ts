import { FieldValues, Path } from 'react-hook-form';

export interface FormInputWithButtonProps<T extends FieldValues> {
  type?: string;
  regex?: RegExp;
  valuePayload: Path<T>;
  requiredMessage?: string;
  validateErrorMessage?: string;
  validateSuccessMessage?: string;
  label: string;
  placeholder: string;
  buttonLabel: string;
  validateButtonResult: boolean;
  disabled?: boolean;
  buttonDisabled?: boolean;
  validate?: (value: string) => any | Promise<any>;
  handleClickButton?: () => void;
}
