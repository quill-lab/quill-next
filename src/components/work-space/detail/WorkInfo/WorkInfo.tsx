'use client';

import React, { useEffect, useState } from 'react';
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
  const roomId = params?.roomId;
  const { data: session } = useSession();

  const { list: characterList, toggleEditingCharacters } = useCharacterStore();
  const {
    editMode,
    editDescription,
    editSynopsis,
    editTitle,
    editTags,
    initEditSynopsis,
    initEditDescription,
    initEditTags,
    toggleEditMode,
  } = useNovelRoom();

  useEffect(() => {
    initEditTags(novelRoomInfo.tags);
    initEditSynopsis(novelRoomInfo.synopsis || '작품의 줄거리를 적어주세요.');
    initEditDescription(novelRoomInfo.description || '작품의 소개글을 적어주세요.');
  }, []);

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
          description:
            editDescription || novelRoomInfo.description || '작품의 소개글을 적어주세요.',
          tags: validateTags,
          category: novelRoomInfo.category.name,
          synopsis: editSynopsis || novelRoomInfo.synopsis || '작품의 줄거리를 적어주세요.',
        },
        method: 'PATCH',
        token: session?.user?.token,
      });

      // await callApi({
      //   url: `/api/v1/novel-rooms/${roomId}/characters`,
      //   body: {
      //     characters: characterList.map(character => {
      //       return {
      //         id: character.id,
      //         name: character.name,
      //         description: character.description,
      //       };
      //     }),
      //   },
      //   method: 'PUT',
      //   token: session?.user?.token,
      // });
      toggleEditMode();
      toggleEditingCharacters();

      return;
    }

    toggleEditMode();
    toggleEditingCharacters();
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
              content={novelRoomInfo.description || editDescription}
            />
            <TagList tags={editTags || []} />
          </div>
        </div>
        <CharacterCardList characters={characters} />

        <div className={'flex-1'}>
          <DescriptionContainer title="줄거리" content={novelRoomInfo.synopsis || editSynopsis} />
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
