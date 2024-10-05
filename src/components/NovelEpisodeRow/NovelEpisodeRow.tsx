import Image from 'next/image';
import { ReactElement } from 'react';

import commentIcon from '@/images/comment.svg';
import novelLike from '@/images/novel-like-icon.svg';
import viewIcon from '@/images/view-icon.svg';

import st from './NovelEpisodeRow.module.scss';
import { NovelEpisodeRowProps } from './type';

export default function NovelEpisodeRow({
  commentCount,
  episodeNumber,
  likeCount,
  title,
  viewCount,
  date,
}: NovelEpisodeRowProps): ReactElement {
  return (
    <button className={st.row} type="button">
      {/* 윗 줄 start */}
      <div className={st.row_top}>
        <p className={st.row_number}>{episodeNumber}</p>
        <p className={st.row_title}>{title}</p>

        {/* 댓글, 좋아요, 방문수 start */}
        <div className={st.row_scope}>
          <div>
            <Image src={viewIcon} alt="방문자 수 아이콘" />
            <p>{viewCount}</p>
          </div>

          <div>
            <Image src={commentIcon} alt="댓글 아이콘" />
            <p>{commentCount}</p>
          </div>

          <div>
            <Image src={novelLike} alt="좋아요 아이콘" />
            <p>{likeCount}</p>
          </div>
        </div>
        {/* 댓글, 좋아요, 방문수 end */}
      </div>
      {/* 윗 줄 end */}
      <p className={st.row_date}>{date}</p>
    </button>
  );
}
