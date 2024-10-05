import { ReactElement } from 'react';

import { config } from '@/config/config';
import { updateWriterState } from '@/fetch/put';
import { GetWriterListAdmin } from '@/shared';
import { useMutationWrap } from '@/hooks/reactQeuryWrapper';

import { dateChanger } from '../../../util/dateChange';
import st from './WriterListOneRow.module.scss';

const joninStatus = {
  attending: '참여중',
  reject: '참여 반려',
  review: '참여 검토',
  exit: '퇴장',
} as const;
export default function WriterListOneRow({
  category,
  createdAt,
  exitAt,
  id,
  notifiedAt,
  status,
  user,
}: GetWriterListAdmin): ReactElement {
  const { mutate: writerStateUpdate } = useMutationWrap({
    mutationKey: [config.apiUrl.updateWriterState(id)],
    mutationFn: updateWriterState,
  });
  const join = () => {
    writerStateUpdate({ userId: id, status: 'attending' });
  };
  const reject = () => {
    writerStateUpdate({ userId: id, status: 'reject' });
  };
  const kick = () => {
    writerStateUpdate({ userId: id, status: 'exit' });
  };
  return (
    <div className={st.writerRow}>
      <p className={st.main_writerlist_Number}>{id}</p>
      <p className={st.main_writerlist_nickName}>{user.nickname}</p>
      <p className={st.main_writerlist_textAmount}>??</p>
      <p className={st.main_writerlist_dateForParticipation}>{dateChanger(createdAt)}</p>
      <p className={st.main_writerlist_approvalStatus}>{dateChanger(notifiedAt) ?? '-'}</p>
      <p className={st.main_writerlist_exitDate}>{exitAt ?? '-'}</p>
      <p className={st.main_writerlist_participationStatus}>{joninStatus[status]}</p>

      <div className={st.row_btns}>
        {category === 'attendee' &&
          (status === 'attending' ? (
            <button className={st.reject} onClick={kick} type="button">
              퇴장
            </button>
          ) : (
            <>
              <button className={st.resolve} onClick={join} type="button">
                승인
              </button>
              <button className={st.reject} onClick={reject} type="button">
                반려
              </button>
            </>
          ))}
      </div>
    </div>
  );
}
