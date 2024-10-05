import { ReactElement } from 'react';

import st from './CusModal.module.scss';
import { CusModalProps } from './type';

export default function CusModal({ children }: CusModalProps): ReactElement {
  return (
    <div className={st.background}>
      <div className={st.centerBox}>{children}</div>
    </div>
  );
}
