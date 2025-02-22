'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { emailRegex, nicknameRegex, passwordRegex } from '@/constants/regex';
import { checkUserEmail, checkUserNickname, signUp } from '@/fetch/post';
import { useTimer } from '@/hooks/useTimer';

import FormInput from '../../FormInput/FormInput';
import FormInputWithButton from '../../FormInputWithButton/FormInputWithButton';
import styles from './SignUpForm.module.scss';
import { storageKey } from '@/constants';

type SignUpFormValueKeys = keyof SignUpFormValues;

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface Portfolio {
  link: string;
}

export type { SignUpFormValueKeys, SignUpFormValues };

export const SignUpForm = () => {
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState<boolean>(false);
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState<boolean>(false);
  const [isPushEmail, setIsPushEmail] = useState<boolean>(false);

  //TODO: 수정
  const isValidEmail = isDuplicatedEmail;
  const isValidNickname = isDuplicatedNickname;

  const route = useRouter();

  const handleTimerComplete = () => {
    setIsPushEmail(false);
  };

  const { time, isActive, startTimer, resetTimer } = useTimer({
    initialTime: 600,
    onTimerComplete: handleTimerComplete,
  });
  const { formState, handleSubmit, getValues, trigger, setError } =
    useFormContext<SignUpFormValues>();
  const { isDirty, isValid } = formState;
  // const { data: userListData } = useQuery({
  //   queryKey: ['api/userList'],
  //   queryFn: () => userList(),
  //   placeholderData: keepPreviousData,
  // });
  const { mutate, status, isError } = useMutation({
    mutationKey: ['auth/joinUser'],
    mutationFn: signUp,
    onSuccess: (data: { data: { accessToken: string } }) => {
      localStorage.setItem(storageKey, `${data.data.accessToken}`);
      route.replace('/join/complete');
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    try {
      if (isValidEmail && isValidNickname) {
        mutate({
          email: data.email,
          password: data.password,
          nickname: data.nickname,
        });

        // route.replace('/join/complete');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailDuplicatedButton = async (): Promise<void> => {
    const email = getValues('email');
    const isDuplicatEmail = (await checkUserEmail(email)).data;
    const { result } = isDuplicatEmail;
    if (result) {
      setIsDuplicatedEmail(true);
    } else {
      setIsDuplicatedEmail(false);
      setError('email', { type: 'custom', message: '중복된 이메일이 있습니다.' });
    }
  };

  const handleNicknameButton = async (): Promise<void> => {
    const nickname = getValues('nickname');
    const isDuplicatedNickname = (await checkUserNickname(nickname)).data;
    const { result } = isDuplicatedNickname;
    if (result) {
      setIsDuplicatedNickname(true);
    } else {
      setIsDuplicatedNickname(false);
      setError('nickname', { type: 'custom', message: '중복된 닉네임 있습니다.' });
    }
  };

  function passwordConfirmValidate() {
    return getValues('password') !== '' && getValues('password') === getValues('passwordConfirm');
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>회원가입</h2>
        <span className={styles.description}>회원가입에 필요한 정보들을 입력해주세요.</span>
      </header>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContents}>
          <h3 className={'text-sm font-medium'}>필수정보</h3>
          <FormInputWithButton<SignUpFormValues>
            regex={emailRegex}
            valuePayload="email"
            requiredMessage="이메일을 입력해주세요."
            validateErrorMessage="이메일 형식에 맞지 않습니다."
            validateSuccessMessage={isValidEmail ? '사용 가능한 이메일입니다.' : undefined}
            label="이메일"
            // disabled={isValidEmail}
            buttonDisabled={!isDuplicatedEmail && isPushEmail}
            placeholder="aaa@aaa.com"
            validateButtonResult={isDuplicatedEmail}
            buttonLabel="중복 확인"
            handleClickButton={handleEmailDuplicatedButton}
          />
          <FormInput<SignUpFormValues>
            type="password"
            regex={passwordRegex}
            valuePayload="password"
            requiredMessage="비밀번호를 입력해주세요."
            validateErrorMessage="8자에서 16자 사이의 길이로, 최소 하나의 알파벳, 하나의 숫자, 하나의 특수 문자(!@#$%^&*)"
            validateSuccessMessage="사용할 수 있는 비밀번호입니다."
            label="비밀번호"
            placeholder="비밀번호"
          />
          <FormInput<SignUpFormValues>
            type="password"
            validate={() => passwordConfirmValidate()}
            valuePayload="passwordConfirm"
            requiredMessage="비밀번호를 확인해주세요."
            validateErrorMessage="비밀번호가 일치하지 않습니다."
            validateSuccessMessage="비밀번호가 일치합니다."
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
          />
          <FormInputWithButton<SignUpFormValues>
            regex={nicknameRegex}
            valuePayload="nickname"
            requiredMessage="닉네임을 입력해주세요."
            validateErrorMessage="닉네임 형식을 지켜주세요."
            validateSuccessMessage={isValidNickname ? '사용할 수 있는 닉네임입니다.' : ''}
            label="닉네임"
            placeholder="닉네임"
            buttonLabel="중복 확인"
            validateButtonResult={isValidNickname}
            // disabled={isValidNickname}
            buttonDisabled={isValidNickname}
            handleClickButton={handleNicknameButton}
            // validate={() => handleDuplicateValidateNickname()}
          />
        </div>
        <button className={styles.submitButton} type="submit" disabled={!isDirty || !isValid}>
          시작하기
        </button>
      </form>
    </div>
  );
};
