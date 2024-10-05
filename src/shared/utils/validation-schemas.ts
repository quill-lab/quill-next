import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 일치하지 않습니다.'),
  password: yup
    .string()
    .test('email-or-password', '로그인 정보를 모두 입력해 주세요.', function (value) {
      const { email } = this.parent;
      return value && email;
    }),
});
