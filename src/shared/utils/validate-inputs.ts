import { Checks } from '@/shared/';

export const validateField = <T>(field: Checks<T>, value: any): Checks<T> => {
  return field.essential && !value ? { ...field, isError: true } : { ...field, isError: false };
};

export const validateAllFields = <T>(checks: { [K in keyof T]: Checks<T> }, data: Partial<T>) => {
  return (Object.keys(checks) as Array<keyof T>).map(key => {
    const field = checks[key];
    const value = data[field.key as keyof T];
    return { key, updatedCheck: validateField(field, value) };
  });
};
