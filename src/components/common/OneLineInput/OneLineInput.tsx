import { ChangeEvent } from 'react';

import { TooltipTextFieldProps, TooltipTextField } from '@/components';
import st from './OneLineInput.module.scss';

export interface OneLineInputProps extends Omit<TooltipTextFieldProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;
  onChange(value: string): void;
}

export const OneLineInput = ({
  placeholder,
  errorText,
  isError,
  style,
  compulsory,
  categoryText,
  tooltipText,
  onChange,
}: OneLineInputProps) => (
  <TooltipTextField
    style={style}
    compulsory={compulsory}
    categoryText={categoryText}
    tooltipText={tooltipText}
  >
    <div className={st.container}>
      <input
        placeholder={placeholder}
        className={st.inputBox}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
      />
      {isError && <p className="mt-1">{errorText}</p>}
    </div>
  </TooltipTextField>
);
