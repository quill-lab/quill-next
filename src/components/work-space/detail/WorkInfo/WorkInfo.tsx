'use client';

import React, { useState } from 'react';
import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { getCharactersInfo, novelRoomInfo } from '@/fetch/get';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { config } from '@/config/config';
import { DescriptionContainer } from '@/components';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { Tag } from '@/components/common/Tag/Tag';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { NovelItem } from '@/shared';
import callApi from '@/shared/utils/fetchWrapper';

interface WorkInfoTemplateProps {
  novelRoomInfo: NovelItem;
}

export const WorkInfo = ({ novelRoomInfo }: WorkInfoTemplateProps) => {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId;
  const { data: session } = useSession();

  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState(novelRoomInfo.description);
  const [editSynopsis, setEditSynopsis] = useState(novelRoomInfo.synopsis);

  const onClickEdit = async () => {
    if (editMode) {
      await callApi({
        url: `/api/v1/novel-rooms/${roomId}`,
        body: {
          title: novelRoomInfo.title,
          description: editDescription,
          tags: novelRoomInfo.tags,
          category: novelRoomInfo.category.name,
          synopsis: editSynopsis,
        },
        method: 'PATCH',
        token: session?.user?.token,
      });
      router.refresh();
    }

    setEditMode(prev => !prev);
  };

  const characters = {
    data: [
      { name: '로미오', description: '남 주인공' },
      { name: '줄리엣', description: '여 주인공' },
    ],
  };

  return (
    <div className={'flex flex-col gap-[18px] items-center w-full'}>
      <div className={'flex flex-col gap-[10px] w-full'}>
        <div className={'flex gap-4 flex-grow'}>
          <div className="relative w-full max-w-[189px] h-full min-h-[267px]">
            <Image
              src={'/images/default-book-cover.svg'}
              alt="북커버"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
          <div className={'flex flex-col gap-3 w-full'}>
            <DescriptionContainer
              title="작품 소개"
              isEditable={editMode}
              content={novelRoomInfo.description}
              onChangeDescription={setEditDescription}
            />
            <div
              className={
                'bg-white-opacity-50 rounded-[10px] py-4 px-5 relative w-full overflow-y-hidden overflow-x-auto min-h-[58px] flex items-center'
              }
            >
              <div className={'flex gap-3.5'}>
                {novelRoomInfo.tags.map(tag => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={'flex gap-4'}>
          {characters?.data?.map(character => (
            <CharacterInfoCard key={character.name} {...character} />
          ))}
          {editMode && (
            <div
              className={
                'w-[238px] min-h-[200px] p-[20px] bg-white-opacity-50 flex items-center justify-center rounded-xl'
              }
            >
              <Image src={'/images/add.png'} width={24} height={24} alt="add" />
            </div>
          )}
        </div>
        <div className={'flex-1'}>
          <DescriptionContainer
            title="줄거리"
            isEditable={editMode}
            content={novelRoomInfo.synopsis}
            onChangeDescription={setEditSynopsis}
          />
        </div>
      </div>
      {novelRoomInfo?.role === 'MAIN' && (
        <button
          onClick={onClickEdit}
          className={
            'w-fit px-[52px] py-[15px] bg-white3 rounded-[62px] text-sm font-medium text-blue1'
          }
        >
          작품 정보 수정
        </button>
      )}
    </div>
  );
};
