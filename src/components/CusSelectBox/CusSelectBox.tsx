import Image from 'next/image';
import { ReactElement, useState } from 'react';

import colorBottomArrow from '@/images/color-bottom-arrow.svg';

import st from './CusSelectBox.module.scss';
import { CusSelectBoxProps } from './type';

export default function CusSelectBox({ data }: CusSelectBoxProps): ReactElement {
  const [selectItem, setSelectItem] = useState<string>('선택된');
  const [show, setShow] = useState<boolean>(false);
  return (
    <div onClick={showToggle} role="presentation" className={st.selectBox}>
      {selectItem}
      <Image src={colorBottomArrow} alt="정렬 방식을 선택하는 리스트 버튼" />
      <div className={`${st.selectBox_list} ${!show ? st.hidden : ''}`}>
        {data.map((item: string, index: number) => (
          <button
            key={item}
            onClick={() => {
              selectBtn(item);
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  function selectBtn(item: string) {
    if (selectItem !== item) {
      setSelectItem(item);
    }
  }

  function showToggle() {
    setShow(p => !p);
  }
}
