'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginApi } from '@/fetch/post';
import useLoginData from '@/stores/useLoginData.zst';

import st from './login.module.scss';
import { storageKey } from '@/constants';
import { loginSchema } from '@/shared/utils/validation-schemas';
import { useLoginUser } from '@/stores/useLoginUser';
import { signIn } from 'next-auth/react';
import callApi from '@/shared/utils/fetchWrapper';
import { useState } from 'react';

interface IFormInput {
  email?: string;
  password?: string;
}

export default function Login() {
  const route = useRouter();
  const { email, password } = useLoginData();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { setUser } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email,
      password,
    },
  });

  const { mutate, status } = useMutation({
    mutationKey: ['api/login'],
    mutationFn: loginApi,
    async onSuccess(data) {
      localStorage.setItem(storageKey, `${data.data.accessToken}`);
      const user = data.data.user;
      setUser({ id: user.id, nickname: user.nickname, email: user.email });
      route.replace('/work-space');
    },
    onError(err) {
      setError('password', { type: 'manual', message: '로그인 정보가 일치하지 않습니다.' });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (data.email && data.password) {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/work-space', // 로그인 성공 시 리다이렉트할 경로
      });

      if (res?.error) {
        alert('로그인에 실패하였습니다. 다시 시도해주세요.'); // 로그인 실패 시 알림 표시
      } else {
        route.replace('/work-space');
      }
      // mutate({ email: data.email, password: data.password });
    }
  };

  return (
    <div className={st.container}>
      <div className={st.inputContainer}>
        <Image src={'/images/login-logo.svg'} width={30} height={30} alt="작가의 정원 메인 로고" />
        <p className={st.text1}>
          <span>이야기에 상상력을 더하고</span>
          <br />
          <span>더 높은 가치를 공유하세요</span>
        </p>
        <form className={st.formWapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${st.inputWrapper} ${st.mt18}`}>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력해 주세요."
              {...register('email')}
            />
            {errors.email && (
              <span className={'text-error text-xs pt-1'}>{errors.email.message}</span>
            )}
          </div>
          <div className={`${st.mt18} ${st.inputWrapper}`}>
            <div className="relative">
              <input
                id="password"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요."
                {...register('password')}
              />
              <button
                onClick={() => setIsShowPassword(prev => !prev)}
                className="bg-red-500 absolute right-[20px] top-1/2 transform -translate-y-1/2"
              >
                {isShowPassword ? <FaIcons.FaEye size={20} /> : <FaIcons.FaEyeSlash size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className={'text-error text-xs pt-1'}>{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'pending'}
            className={`${st.loginBtn} ${st.mt21}`}
          >
            {status === 'pending' ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className={`${st.linkContainer} ${st.mt32}`}>
          <p className={st.text2}>
            아직 계정이 없으신가요? <Link href="/join">회원가입</Link>
          </p>
          <p className={st.text2}>
            계정이 기억나지 않으시나요? <Link href="user/find-password">비밀번호 찾기</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
