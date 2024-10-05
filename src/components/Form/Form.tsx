import { ReactNode } from 'react';
import { DeepPartial, DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form';

interface FormProps<T = unknown> {
  defaultValues?: DefaultValues<T>;
  children: ReactNode;
}

const Form = <T extends FieldValues>({ defaultValues, children }: FormProps<T>) => {
  const methods = useForm<T>({
    // validate 결과 달라지는 경우 re-render, mode의 정확한 의미 파악 필요
    // mode: 'onChange',
    defaultValues: (defaultValues as DefaultValues<T>) || undefined,
  });

  return <FormProvider<T> {...methods}>{children}</FormProvider>;
};

export default Form;
