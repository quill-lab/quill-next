import { ReactElement } from 'react';

import { NovelChapter } from '@/shared';

import st from './EpisodeListOneRow.module.scss';

const chaterState = {
  writing: '작성중',
  review: '연재중',
  approve: '승인대기',
  reject: '반려',
} as const;
export default function EpisodeListOneRow({
  no,
  title,
  approvalAt,
  status,
  finalAt,
  viewCount,
  commentCount,
  likeCount,
}: NovelChapter): ReactElement {
  return (
    <button type="button" className={st.row}>
      <p className={st.main_list_episode}>{no}</p>
      <p className={st.main_list_title}>{title}</p>
      <p className={st.main_list_finalRetouchDate}>{finalAt}</p>
      <p className={st.main_list_status}>{chaterState[status]}</p>
      <p className={st.main_list_serialApprovalDate}>{approvalAt}</p>
      <p className={st.main_list_views}>{viewCount}</p>
      <p className={st.main_list_commnents}>{commentCount}</p>
      <p className={st.main_list_likes}>{likeCount}</p>
    </button>
  );
}
