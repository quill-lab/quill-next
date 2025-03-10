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
import { Tag } from '@/components/atoms/Tag/Tag';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { NovelItem } from '@/shared';
import callApi from '@/shared/utils/fetchWrapper';
import WorkSpaceTabHeader from '@/components/organisms/WorkSpaceTabHeader';
import { CharacterInfo } from '@/interfaces';
import CharacterCardList from '@/components/organisms/CharacterCardList';
import { useCharacterStore } from '@/stores/useCharacter';
import { useNovelRoom } from '@/stores';
import TagList from '@/components/organisms/TagList';

interface WorkInfoTemplateProps {
  novelRoomInfo: NovelItem;
  characters: [CharacterInfo];
}

export const WorkInfo = ({ novelRoomInfo, characters }: WorkInfoTemplateProps) => {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId;
  const { data: session } = useSession();

  const { list: characterList, setEditingCharacters } = useCharacterStore();
  const {
    editMode,
    editDescription,
    editSynopsis,
    editTitle,
    editTags,
    toggleEditMode,
    setEditDescription,
    setEditSynopsis,
  } = useNovelRoom();

  const onClickEdit = async () => {
    if (editMode) {
      let validateTags = editTags.filter(tag => tag !== '');

      if (!validateTags.length) {
        validateTags = novelRoomInfo.tags;
      }

      await callApi({
        url: `/api/v1/novel-rooms/${roomId}`,
        body: {
          title: editTitle || novelRoomInfo.title,
          description: editDescription || novelRoomInfo.description,
          tags: validateTags,
          category: novelRoomInfo.category.name,
          synopsis: editSynopsis || novelRoomInfo.synopsis,
        },
        method: 'PATCH',
        token: session?.user?.token,
      });

      const characterRequests = characterList.map(character =>
        callApi({
          url: `/api/v1/novel-rooms/${roomId}/characters`,
          body: {
            name: character.name,
            description: character.description,
          },
          method: 'POST',
          token: session?.user?.token,
        })
      );

      await Promise.all(characterRequests);

      location.reload();
      return;
    }

    toggleEditMode();
    setEditingCharacters(!editMode);
  };

  return (
    <div className={'flex flex-col gap-[18px] items-center w-full'}>
      <div className={'flex flex-col gap-[10px] w-full'}>
        <WorkSpaceTabHeader currentTab="work-info" />
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
            <TagList tags={novelRoomInfo.tags} />
          </div>
        </div>
        <CharacterCardList characters={characters} />

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
