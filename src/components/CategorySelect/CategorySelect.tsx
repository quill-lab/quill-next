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
  const { category, setNovel } = useCreateNovelPost();

  return (
    <TooltipTextField style={props.style} compulsory={props.compulsory} categoryText="카테고리">
      <div>
        <div className={st.container}>
          {config.categorys.map(
            (item: { name: string; alias: string }): ReactElement => (
              <label className={`${st.mt16} ${st.inputBox}`} key={item.name}>
                <input
                  type="radio"
                  name="category"
                  onClick={() => setNovel({ category: item.alias })}
                />
                <p className={st.ml8}>{item.name}</p>
              </label>
            )
          )}
        </div>
        {props.isError ? <p className={st.text1}>{props.errorText}</p> : null}
      </div>
    </TooltipTextField>
  );
}
