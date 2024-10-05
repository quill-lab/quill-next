import { ReactElement } from 'react';

import st from './PeopleCount.module.scss';
import { PeopleCountProps } from './type';
/**
 * 공방 개설 페이지에서 여러명이서 작성 하기일 경우에 화면에 그려지는 인원 선택 component
 * @param props PeopleCountProps
 * @returns component
 */
export default function PeopleCount(props: PeopleCountProps): ReactElement {
  return (
    <div className={st.container}>
      <div className={st.rowBox}>
        <label className={st.inputBox}>
          <input type="radio" name="count" onInput={() => props.onChange(2)} defaultChecked />
          <p className={'ml-4 text-sm text-gray2'}>2명(최소)</p>
        </label>

        <label className={st.inputBox}>
          <input type="radio" name="count" onInput={() => props.onChange(3)} />
          <p className={'ml-4 text-sm text-gray2'}>3명</p>
        </label>
      </div>
      <div className={`${st.rowBox} ${st.mt32}`}>
        <label className={st.inputBox}>
          <input type="radio" name="count" onInput={() => props.onChange(4)} />
          <p className={'ml-4 text-sm text-gray2'}>4명</p>
        </label>

        <label className={st.inputBox}>
          <input type="radio" name="count" onInput={() => props.onChange(5)} />
          <p className={'ml-4 text-sm text-gray2'}>5명</p>
        </label>
      </div>
    </div>
  );
}
