import Image from 'next/image';
import { ReactElement } from 'react';

import NovelEpisodeRow from '@/components/NovelEpisodeRow/NovelEpisodeRow';
import NovelTabsGreenAndSelect from '@/components/NovelTabsGreenAndSelect/NovelTabsGreenAndSelect';

import novelLike from '../../../images/novel-like-icon.svg';
import viewIcon from '../../../images/view-icon.svg';
import st from './NovelDetail.module.scss';

const data = [
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구1',
    viewCount: 123,
  },
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구2',
    viewCount: 123,
  },
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구3',
    viewCount: 123,
  },
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구4',
    viewCount: 123,
  },
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구5',
    viewCount: 123,
  },
  {
    commentCount: 123,
    date: '23.23.23',
    episodeNumber: 12,
    likeCount: 123,
    title: '여긴 어디...난 누구6',
    viewCount: 123,
  },
];
export default function NovelDetail(): ReactElement {
  return (
    <div className={st.main}>
      <div className={st.main_center}>
        {/* 이미지, 설명 영역 start */}
        <div className={st.main_infos}>
          <div className={st.main_img} />
          <div className={st.main_infoText}>
            <p className={st.main_status}>연재중</p>
            <p className={st.main_title}>
              재벌집 아이들<span> 일반소설</span>
            </p>
            {/* 좋아요, 방문자 수 아이콘 박스 start */}
            <div className={st.main_scope}>
              <div className={st.main_scope_row}>
                <Image src={viewIcon} alt="방문자 수 아이콘" />
                <p>233</p>
              </div>
              <div className={st.main_scope_row}>
                <Image src={novelLike} alt="즐겨찾기 아이콘" />
                <p>233</p>
              </div>
            </div>
            {/* 좋아요, 방문자 수 아이콘 박스 end */}

            <p className={st.main_writer}>오른팔 외 2명</p>
            <p className={st.main_text1}>한줄소개</p>
            <textarea
              disabled
              value="오직, 때때로 어떤 불분명하고 희미한 종얼거림이 벽을 통해서 내게 알려주고 있었다, 사비나가 안드레스에게 마시막 충고와 경고를 주고 있음이 분명하다는 것."
            />
            <div className={st.main_tags}>
              {['111', '2222', '33333'].map(i => (
                <div key={i}>{i}</div>
              ))}
            </div>
          </div>
        </div>
        {/* 이미지, 설명 영역 end */}

        <div className={st.mt44}>
          <NovelTabsGreenAndSelect
            currentTab="회차정보"
            handleCurrentTab={e => {
              console.log(e);
            }}
            tabs={['회차정보']}
            data={['첫화부터', '마지막화부터']}
          />
        </div>

        <div className={st.main_list}>
          {data.map(i => (
            <div className={st.rowCover} key={i.title}>
              <NovelEpisodeRow {...i} />
            </div>
          ))}
        </div>

        <div>{/* <PaginationBar type="dark" /> */}</div>
      </div>
    </div>
  );
}
