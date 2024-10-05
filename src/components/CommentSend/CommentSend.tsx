import { ReactElement } from 'react';

import st from './CommentSend.module.scss';

export default function CommentSend(): ReactElement {
  return (
    <div className={st.box}>
      <div className={st.box_user}>
        <div className={st.box_thumbnail} />
        <p className={st.box_nickName}>닉넴</p>
      </div>
      <div className={st.box_text}>
        <textarea placeholder="댓글을 입력해 주세요" />
        <button type="button">등록</button>
      </div>
    </div>
  );
}
