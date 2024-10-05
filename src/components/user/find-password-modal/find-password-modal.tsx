import st from './find-password-modal.module.scss';
import CusModal from '@/components/CusModal/CusModal';
import { useRouter } from 'next/router';

export const FindPasswordModal = () => {
  const route = useRouter();

  const handleClickConfirm = () => {
    route.push('/');
  };

  return (
    <CusModal>
      <div className={'flex flex-col h-[240px]'}>
        <div className={'flex-grow flex flex-col gap-4 justify-center items-center'}>
          <span
            className={'whitespace-pre-wrap text-center text-xl font-medium'}
          >{`가입된 이메일로\n임시 비밀번호를 발송하였습니다.`}</span>
          <span className={'text-sm text-gray2 font-normal'}>
            임시 비밀번호가 포함된 이메일을 확인해주세요.
          </span>
        </div>

        <button
          onClick={handleClickConfirm}
          type="button"
          className={'w-full bg-blue1 text-white py-[14px] rounded-b-lg'}
        >
          확인
        </button>
      </div>
    </CusModal>
  );
};
