import { useRouter } from 'next/router';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { tempPassword } from '@/fetch/post';
import FormInput from '@/components/FormInput/FormInput';
import { emailRegex } from '@/constants/regex';
import { TempPasswordFormValues } from './types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const FindPasswordForm = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const { formState, handleSubmit, getValues, trigger, setError } =
    useFormContext<TempPasswordFormValues>();

  const { mutate, status, isError } = useMutation({
    mutationKey: ['api/temp-password'],
    mutationFn: tempPassword,
    onError: (error: any) => {
      if (error === 409) {
        setErrorMessage('가입된 이메일 계정이 없습니다.');
      }
    },
    onSuccess: data => {
      setModal(true);
    },
  });

  const { isDirty, isValid } = formState;

  const onSubmit: SubmitHandler<TempPasswordFormValues> = data => {
    if (isValid) {
      mutate({
        email: data.email,
      });
    }
  };

  return (
    <div className={'flex flex-col content-center items-center'}>
      <p className={'text-xl font-medium text-blue1 pb-2'}>비밀번호 찾기</p>
      <span className={'text-sm whitespace-pre-wrap text-center text-gray6 pb-11'}>
        {`회원 가입 시 사용한 이메일과 입력하신 이메일이\n동일하여야 인증번호를 받으실 수 있습니다.`}
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col content-center items-center min-w-[384px]'}
      >
        <div className={'pb-10 w-full'}>
          <span className={'text-sm'}>회원 가입 시 사용한 이메일을 입력해주세요</span>
          <FormInput<TempPasswordFormValues>
            regex={emailRegex}
            valuePayload="email"
            requiredMessage="이메일을 입력해주세요."
            validateErrorMessage="이메일 형식에 맞지 않습니다."
            placeholder="이메일"
            label=""
          />
          {isError && errorMessage && <p className={'text-error text-xs'}>{errorMessage}</p>}
        </div>

        <button
          type="submit"
          className={'text-center text-white bg-blue1 px-8 py-3 rounded-[62px]'}
        >
          임시비밀번호 발급 받기
        </button>
      </form>
    </div>
  );
};
