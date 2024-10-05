import { ReactElement } from 'react';

import TopFiveCard from '../TopFiveCard/TopFiveCard';
import st from './NovelAllList.module.scss';
import { NovelAllList } from './type';

export default function NovelAllList({
  listModifier,
  listTitle,
  datas,
}: NovelAllList): ReactElement {
  return (
    <div className={st.main}>
      <p className={st.main_title}>
        {listModifier}
        <span className={st.main_title_point}>{listTitle}</span>
      </p>

      <div className={st.main_novelList}>
        {datas.map(i => (
          <div key={i.title}>
            <TopFiveCard leader={i.leader} member={i.member} status={i.status} title={i.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
