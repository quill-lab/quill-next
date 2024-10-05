import Image from 'next/image';
import { ReactElement } from 'react';

import commentIcon from '@/images/comment-white.svg';
import heartIcon from '@/images/heart-red.svg';
// import heartWhiteIcon from '@/images/heart-white.svg';
import leftArrow from '@/images/left-white-arrow.svg';
import rightArrow from '@/images/right-white-arrow.svg';

import st from './NovelReaderNavi.module.scss';
import { NovelReaderNaviProps } from './type';

export default function NovelReaderNavi({ isDown, isUp }: NovelReaderNaviProps): ReactElement {
  return (
    <div className={`${st.navi} ${isDown ? st.naviDown : ''} ${isUp ? st.naviUp : ''}`}>
      <div className={st.navi_center}>
        <button type="button" className={st.leftBtn}>
          <Image src={leftArrow} alt="이전회차 버튼" />
          <p className={st.ml8}>이전회차</p>
        </button>

        <button type="button">
          <p>댓글</p>
          <Image className={st.ml8} src={commentIcon} alt="댓글 아이콘" />
          <p className={st.ml4}>{3}</p>
        </button>

        <button type="button">목록가기</button>

        <button type="button">
          <p>좋아요</p>
          <Image className={st.ml8} src={heartIcon} alt="좋아요 아이콘" />
          <p className={st.ml4}>{101}</p>
        </button>

        <button type="button" className={st.rightBtn}>
          <p>다음회차</p>
          <Image className={st.ml8} src={rightArrow} alt="다음회차 버튼" />
        </button>
      </div>
    </div>
  );
}
