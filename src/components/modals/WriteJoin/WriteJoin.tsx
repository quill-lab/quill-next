import { ReactElement } from 'react';

import CusModal from '@/components/CusModal/CusModal';

import { WriteJoinProps } from './type';
import st from './WriteJoin.module.scss';

export default function WriteJoin({ nextStep, cancel }: WriteJoinProps): ReactElement {
  return (
    <CusModal>
      <div className={st.contents}>
        <p className={st.contents_title}>참여작가 신청</p>
        <p>소설공방 작가 참여를 신청하시겠습니까?</p>

        {/* bottom button start */}
        <div className={st.contents_btnBox}>
          <button onClick={nextStep} type="button">
            참여 신청하기
          </button>
          <button onClick={cancel} type="button">
            취소
          </button>
        </div>
        {/* bottom button end */}
      </div>
    </CusModal>
  );
}
