import Image from 'next/image';
import { ReactElement } from 'react';

import closeBtn from '@/images/white-close-btn.svg';

import st from './NovelComment.module.scss';
import { NovelCommentProps } from './type';

export default function NovelComment({ comment, date, nickName }: NovelCommentProps): ReactElement {
  return (
    <div className={st.comment}>
      <div className={st.comment_thumbnail} />

      <div className={st.commnet_user}>
        <p>{nickName}</p>
        <p>{date}</p>
      </div>

      <div className={st.comment_text}>{comment}</div>

      <div className={st.comment_otherBtn}>
        <Image src={closeBtn} alt="댓글 삭제 버튼" />
        <Image src={closeBtn} alt="댓글 삭제 버튼" />
      </div>
    </div>
  );
}
