import Image from 'next/image';
import { useState } from 'react';

import { config } from '@/config/config';
import { novelRoomInfo } from '@/fetch/get';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { DescriptionContainer } from '@/components';

interface NovelDefaultInfoProps {
  isShow: boolean;
  isCurrentUserHost?: boolean;
}

export const NovelDefaultInfo = ({
  isShow = false,
  isCurrentUserHost = false,
}: NovelDefaultInfoProps) => {
  const roomId = useUrlDatas<number>('room');
  const [editMode, setEditMode] = useState(false);

  const { data: novelInfo, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
    enabled: !!roomId,
  });

  if (!novelInfo) {
    //TODO: loading ui
    return <div>loading...</div>;
  }

  const toggleEditMode = () => setEditMode(prev => !prev);
  const offEditMode = () => setEditMode(false);

  return (
    <div
      className={`flex-col w-full mt-2 ${isShow ? 'flex' : 'hidden'} gap-2`}
      aria-hidden={!isShow}
    >
      <div className="flex gap-2">
        <Image
          className="rounded-[10px]"
          width={270}
          height={202}
          src={novelInfo?.data?.bookCover ?? '/images/book-cover-2.png'}
          alt="북커버"
        />
        <div className="flex flex-col w-full gap-2">
          <div>
            <DescriptionContainer
              isEditable={editMode}
              title="한줄소개"
              content={novelInfo.data.subTitle}
            />
          </div>
          <div className={'flex-1'}>
            <DescriptionContainer
              content={novelInfo.data.character}
              isEditable={editMode}
              title="등장인물"
            />
          </div>
        </div>
      </div>
      <div
        className={`flex flex-row justify-between items-center w-full] h-14 px-8 py-3 rounded-[10px] bg-white/50 ${
          editMode ? 'bg-white' : ''
        } rounded-[10px]`}
      >
        <div className="flex items-center justify-center px-4 py-1 bg-white rounded-lg mr-2 text-xs font-normal text-black2">
          #{novelInfo?.data.category.name}
        </div>
      </div>

      <DescriptionContainer content={novelInfo.data.summary} isEditable={editMode} title="줄거리" />
      {/*{isCurrentUserHost && (*/}
      <>
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
            className="white-btn px-14 py-4 self-center mt-4 outline-0"
          >
            기본정보 수정
          </button>
        )}
      </>
      {/*)}*/}
    </div>
  );
};
