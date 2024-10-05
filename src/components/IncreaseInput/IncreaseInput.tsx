import Image from 'next/image';
import React from 'react';
import {
  ArrayPath,
  Controller,
  FieldArray,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import PlusCircle from '@/images/plus-circle.svg';

import styles from './IncreateInput.module.scss';

interface IncreateInputProps<T extends FieldValues> {
  type?: string;
  valuePayload: ArrayPath<T>;
  label: string;
  placeholder: string;
}

export const IncreaseInput = <T extends FieldValues>({
  type = 'text',
  valuePayload,
  label,
  placeholder,
}: IncreateInputProps<T>) => {
  const { control } = useFormContext<T>();
  const { fields, append, update } = useFieldArray({
    control,
    name: valuePayload,
  });

  const addInput = () => {
    if (fields.length < 3) {
      append({ link: '' } as FieldArray<T, ArrayPath<T>>);
    }
  };

  return (
    <div>
      <div className={styles.formItemContainer}>
        <p className={styles.formLabel}>{label}</p>
        <div className={styles.inputWithButtonContainer}>
          {fields.map((item: any, index: number) => (
            <Controller
              key={index}
              name={`${valuePayload}[${index}][link]` as Path<T>}
              control={control}
              defaultValue={item.link}
              render={({ field }) => (
                <input
                  className={styles.input}
                  placeholder="나를 소개할 수 있는 링크 (SNS, 블로그, 웹소설 등)"
                  type={type}
                  {...field}
                  onBlur={e => {
                    field.onBlur();
                    update(index, { link: e.target.value } as FieldArray<T, ArrayPath<T>>);
                  }}
                />
              )}
            />
          ))}
        </div>
      </div>
      <button type="button" className={styles.button} onClick={addInput}>
        <Image src={PlusCircle} alt="plus" />
      </button>
    </div>
  );
};
