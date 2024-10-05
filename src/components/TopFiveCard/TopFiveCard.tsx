import Image from 'next/image';
import { ReactElement } from 'react';

import novelLike from '../../images/novel-like-icon.svg';
import viewIcon from '../../images/view-icon.svg';
import st from './TopFiveCard.module.scss';
import { TopFiveCardProp } from './type';

export default function TopFiveCard({
  leader,
  member,
  status,
  title,
}: TopFiveCardProp): ReactElement {
  if (false) {
    return (
      <div className={`${st.card} ${st.gray}`}>
        <div className={st.card_img} />

        <p className={st.card_status} />
        <p className={st.card_title} />
        <p className={st.card_writer} />

        <div className={st.card_scope} />
      </div>
    );
  }
  return (
    <div className={st.card}>
      <div className={st.card_img} />

      <p className={st.card_status}>{status ? '연재중' : '완결'}</p>
      <p className={st.card_title}>{title}</p>
      <p className={st.card_writer}>
        {leader} 외 {member}명
      </p>

      <div className={st.card_scope}>
        <div className={st.card_scope_row}>
          <Image src={viewIcon} alt="방문자 수 아이콘" />
          <p>233</p>
        </div>
        <div className={st.card_scope_row}>
          <Image src={novelLike} alt="방문자 수 아이콘" />
          <p>233</p>
        </div>
      </div>
    </div>
  );
}
