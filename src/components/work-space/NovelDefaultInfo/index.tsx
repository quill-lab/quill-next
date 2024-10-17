import Image from 'next/image';
import { useState } from 'react';

import { config } from '@/config/config';
import { novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';

import { ScrollTextBox } from '@/components';
import Skel from '../../Skel/Skel';

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

  const toggleEditMode = () => setEditMode(prev => !prev);
  const offEditMode = () => setEditMode(false);

  return (
    <div className={`flex-col w-full mt-2 ${isShow ? 'flex' : 'hidden'}`} aria-hidden={!isShow}>
      <div className="flex flex-row">
        {isSuccess ? (
          <Image
            className="object-cover"
            width={270}
            height={202}
            src={novelInfo?.data?.bookCover ?? '/images/book-cover-2.png'}
            alt="북커버"
          />
        ) : (
          <Skel sx={{ width: 270, height: 202 }} />
        )}

        <div className="flex flex-col ml-2">
          {isSuccess ? (
            <ScrollTextBox
              disabled={!editMode}
              title="소개"
              content={novelInfo.data.subTitle}
              style={{ width: '718px', height: '138px' }}
            />
          ) : (
            <Skel sx={{ width: 718, height: 138 }} />
          )}

          {isSuccess ? (
            <div
              className={`flex flex-row justify-between items-center w-[718px] h-14 mt-2 ml-2 px-8 py-3 rounded-lg bg-white/50 ${
                editMode ? 'bg-white' : ''
              }`}
            >
              <div className="flex flex-wrap">
                <div className="flex items-center justify-center px-4 py-1 bg-white rounded-lg mr-2 text-gray-800 text-sm font-normal">
                  #{novelInfo?.data.category.name}
                </div>
              </div>
            </div>
          ) : (
            <Skel sx={{ width: 718, height: 56, marginLeft: 8, marginTop: 8 }} />
          )}
        </div>
      </div>

      {isSuccess ? (
        <>
          <ScrollTextBox
            content={novelInfo.data.character}
            disabled={!editMode}
            title="등장인물"
            style={{ width: '996px', height: '186px', marginTop: '8px' }}
          />
          <ScrollTextBox
            content={novelInfo.data.summary}
            disabled={!editMode}
            title="줄거리"
            style={{ width: '996px', height: '186px', marginTop: '8px' }}
          />
        </>
      ) : (
        <>
          <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />
          <Skel sx={{ width: '996px', height: '186px', marginTop: '8px' }} />
        </>
      )}

      {editMode ? (
        <div className="flex justify-center mt-8 gap-[2.87rem]">
          <button onClick={offEditMode} className="blue-btn w-48 h-12" type="button">
            수정완료
          </button>
          <button onClick={offEditMode} className="white-btn w-48 h-12" type="button">
            취소
          </button>
        </div>
      ) : (
        <button
          onClick={toggleEditMode}
          type="button"
          className="white-btn w-48 h-12 self-center mt-8"
        >
          기본정보 수정
        </button>
      )}
    </div>
  );
};
