import st from './WorkspaceCreationModal.module.scss';
import CusModal from '@/components/CusModal/CusModal';

export interface WorkspaceCreationModalProps {
  nextStep: () => void;
  cancel: () => void;
}

export const WorkspaceCreationModal = ({ nextStep, cancel }: WorkspaceCreationModalProps) => (
  <CusModal>
    <div className={st.contents}>
      <p className={st.contents_title}>소설공방을 개설 하시겠습니까?</p>
      <span
        className={'text-sm text-gray6 whitespace-pre-wrap text-center'}
      >{`소설공방은 한 번 개설하면 이후 삭제가\n
        어려우니 신중하게 개설해 주세요.`}</span>
      <div className={st.contents_btnBox}>
        <button onClick={nextStep} type="button">
          개설하기
        </button>
        <button onClick={cancel} type="button">
          취소
        </button>
      </div>
    </div>
  </CusModal>
);
