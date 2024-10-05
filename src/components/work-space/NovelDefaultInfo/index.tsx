import Image from 'next/image';
import { useState } from 'react';

import { config } from '@/config/config';
import { novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import { ScrollTextBox } from '@/components';
import Skel from '../../Skel/Skel';
import st from './NovelDefaultInfo.module.scss';

interface NovelDefaultInfoProps {
  isShow: boolean;
}

export const NovelDefaultInfo = ({ isShow = false }: NovelDefaultInfoProps) => {
  const roomId = useUrlDatas<number>('room');
  const [editMode, setEditMode] = useState(false);

  const { data: novelInfo, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
  });

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  const offEditMode = () => {
    setEditMode(false);
  };

  return (
    <div className={st.main} style={{ display: isShow ? 'flex' : 'none' }} aria-hidden={isShow}>
      <div className={st.main_imgAndTextBox}>
        {isSuccess && (
          <Image
            className={'object-cover'}
            width={270}
            height={202}
            src={novelInfo?.data?.bookCover ?? '/images/book-cover-2.png'}
            alt="북커버"
          />
        )}
        {!isSuccess && <Skel sx={{ width: 270, height: 202 }} />}

        <div className={st.main_textColumn}>
          {isSuccess && (
            <ScrollTextBox
              disabled={!editMode}
              title="소개"
              content={novelInfo.data.subTitle}
              style={{ width: '718px', height: '138px', marginLeft: '8px' }}
            />
          )}
          {!isSuccess && <Skel sx={{ width: 718, height: 138, marginLeft: 8 }} />}

          {isSuccess && (
            <div className={`${st.main_tagBox} ${editMode ? st.mdf : ''}`}>
              <div className={st.main_tag_flexWrap}>
                <div className={st.main_tagBox_tag}>#{novelInfo?.data.category.name}</div>
              </div>
            </div>
          )}
          {!isSuccess && <Skel sx={{ width: 718, height: 56, marginLeft: 8, marginTop: 8 }} />}
        </div>
      </div>

      {/* 등장인물 */}
      {isSuccess && (
        <ScrollTextBox
          content={novelInfo.data.character}
          disabled={!editMode}
          title="등장인물"
          style={{ width: '996px', height: '186px', marginTop: '8px' }}
        />
      )}
      {!isSuccess && <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />}

      {/* 줄거리 */}
      {isSuccess && (
        <ScrollTextBox
          content={novelInfo.data.summary}
          disabled={!editMode}
          title="줄거리"
          style={{ width: '996px', height: '186px', marginTop: '8px' }}
        />
      )}
      {!isSuccess && <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />}

      {editMode ? (
        <div className={st.infoChangeBtn}>
          <button onClick={offEditMode} className="blue-btn" type="button">
            수정완료
          </button>
          <button className="white-btn" type="button" onClick={offEditMode}>
            취소
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`white-btn ${st.main_infoModifyBtn}`}
          onClick={toggleEditMode}
        >
          기본정보 수정
        </button>
      )}
    </div>
  );
};
