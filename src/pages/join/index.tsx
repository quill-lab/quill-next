import Form from '@/components/Form/Form';
import { SignUpFormValues, SignUpForm } from '@/components';

const initFormValues: SignUpFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
};

const JoinPage = () => (
  <Form<SignUpFormValues> defaultValues={initFormValues}>
    <SignUpForm />
  </Form>
);

export default JoinPage;
