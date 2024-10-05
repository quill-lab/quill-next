import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import styles from './InputField.module.scss';

interface Props<T extends FieldValues> {
  type: string;
  name: Path<T>;
  placeholder: string;
  disabled: boolean;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

const InputField = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  disabled,
  rules,
}: Props<T>) => (
  <input
    className={styles.input}
    disabled={disabled}
    type={type}
    {...register(name, rules)}
    placeholder={placeholder}
  />
);

export default InputField;
