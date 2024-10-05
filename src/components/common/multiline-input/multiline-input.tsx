import { ChangeEvent } from 'react';
import st from './multiline-input.module.scss';
import { TooltipTextField, TooltipTextFieldProps } from '@/components/';

export interface MultipleLineInputProps extends Omit<TooltipTextFieldProps, 'children'> {
  placeholder: string;
  errorText: string;
  isError: boolean;
  onChange: (value: string) => void;
}

export const MultilineInput = ({
  style,
  compulsory,
  categoryText,
  tooltipText,
  placeholder,
  onChange,
  isError,
  errorText,
}: MultipleLineInputProps) => (
  <TooltipTextField
    style={style}
    compulsory={compulsory}
    categoryText={categoryText}
    tooltipText={tooltipText}
  >
    <div className={st.container}>
      <textarea
        placeholder={placeholder}
        className={st.inputBox}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          onChange(event.target.value);
        }}
      />
      {isError && <p>{errorText}</p>}
    </div>
  </TooltipTextField>
);
