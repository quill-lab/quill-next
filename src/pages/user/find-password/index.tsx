import { useState } from 'react';
import { TempPasswordFormValues } from '@/components/user/find-password-form/types';
import Form from '@/components/Form/Form';
import { FindPasswordForm, FindPasswordModal } from '@/components';

const initFormValues = {
  email: '',
};

export const FindUserPassword = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Form<TempPasswordFormValues> defaultValues={initFormValues}>
      <FindPasswordForm setModal={setIsModal} />
      {isModal && <FindPasswordModal />}
    </Form>
  );
};

export default FindUserPassword;
