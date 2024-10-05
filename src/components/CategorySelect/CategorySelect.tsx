import { ReactElement } from 'react';

import { config } from '@/config/config';
import { useCreateNovelPost } from '@/stores/useCreateNovelPost.zst';

import { TooltipTextField } from '@/components';
import st from './CategorySelect.module.scss';
import { CategorySelectProps } from './type';

/**
 * 공방 개설 페이지에서 소설의 카테고리를 선택하는 checkbox input component
 * @param props CategorySelectProps
 * @returns component
 */
export default function CategorySelect(props: CategorySelectProps): ReactElement {
  const { setNovel } = useCreateNovelPost();
  return (
    <TooltipTextField style={props.style} compulsory={props.compulsory} categoryText="카테고리">
      <div>
        <div className={st.container}>
          {config.categorys.map(
            (item: string, index): ReactElement => (
              <label className={`${st.mt16} ${st.inputBox}`} key={item}>
                <input
                  type="radio"
                  name="category"
                  onClick={() => setNovel({ category: index + 1 })}
                />
                <p className={st.ml8}>{item}</p>
              </label>
            )
          )}
        </div>
        {props.isError ? <p className={st.text1}>{props.errorText}</p> : null}
      </div>
    </TooltipTextField>
  );
}
