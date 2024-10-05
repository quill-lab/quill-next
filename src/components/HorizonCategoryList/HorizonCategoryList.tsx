import { ReactElement, useState } from 'react';

import st from './HorizonCategoryList.module.scss';
import { HorizonCategoryListProps } from './type';

export default function HorizonCategoryList({
  categoryNames,
}: HorizonCategoryListProps): ReactElement {
  const [sect, setSect] = useState<string>(categoryNames[0]);
  return (
    <div className={st.list}>
      {categoryNames.map(i => (
        <button className={sect === i ? st.active : ''} type="button" key={i}>
          {i}
        </button>
      ))}
    </div>
  );
}
