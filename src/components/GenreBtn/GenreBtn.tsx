import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';

import BottomArrow from '@/images/bottom-arrow.svg';

import st from './GenreBtn.module.scss';
import { GenreBtnProps } from './type';

export default function GenreBtn({ disabled, category }: GenreBtnProps): ReactElement {
  const [openPenel, setOpenPanel] = useState<boolean>(false);
  useEffect(() => {
    if (disabled) {
      setOpenPanel(false);
    }
  }, [disabled]);
  return (
    <button type="button" className={`${!disabled ? st.btn : st.disableBtn}`} onClick={opener}>
      {category?.name}
      <Image src={BottomArrow} alt="아래방향 화살표 버튼" />
      {openPenel ? (
        <div className={st.btn_panel}>
          {[
            '11111',
            '2222',
            '33333',
            '444444',
            '5555555',
            '6666666',
            '77777777',
            '888888',
            '999999',
          ].map(i => (
            <label className={st.btn_panel_label} key={i}>
              <input type="radio" name="genre" />
              <p>시/수필/에세이</p>
            </label>
          ))}
        </div>
      ) : null}
    </button>
  );
  function opener() {
    setOpenPanel(p => !p);
  }
}
