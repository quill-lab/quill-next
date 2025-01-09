import React from 'react';
import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { getCharactersInfo, novelRoomInfo } from '@/fetch/get';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { config } from '@/config/config';
import { DescriptionContainer } from '@/components';
import { useUrlDatas } from '@/hooks/useUrlDatas';
import { Tag } from '@/components/common/Tag/Tag';

type WorkInfoProps = {
  editMode?: boolean;
};

export const WorkInfo = ({ editMode = false }: WorkInfoProps) => {
  const roomId = useUrlDatas<number>('room');

  const { data: novelInfo, isSuccess } = useQueryWrap({
    queryKey: [config.apiUrl.novelRoomInfo(roomId), roomId],
    queryFn: () => novelRoomInfo(roomId),
    enabled: !!roomId,
  });

  console.log('novelInfo', novelInfo);

  const { data: characters } = useQueryWrap({
    queryKey: [`getCharactersInfo`, roomId],
    queryFn: () => getCharactersInfo({ roomId }),
  });

  if (isEmpty(novelInfo) || isEmpty(characters)) {
    return null; // TODO: loading 처리
  }

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-2 flex-grow'}>
        <div className="relative w-[189px] h-[267px]">
          <Image
            src={novelInfo.data.bookCover ?? '/images/default-book-cover.svg'}
            alt="북커버"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
        <div className={'flex flex-col gap-2 w-full'}>
          <DescriptionContainer
            title="작품 소개"
            isEditable={editMode}
            content={novelInfo.data.subTitle}
          />
          <div
            className={
              'bg-white-opacity-50 rounded-[10px] py-4 px-8 relative w-full overflow-y-hidden overflow-x-auto min-h-[58px] flex items-center'
            }
          >
            <div className={'flex gap-[14px]'}>
              {novelInfo.data.novelTag.map(tag => (
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
      </div>
      <div className={'flex-1'}>
        <DescriptionContainer
          title="줄거리"
          isEditable={editMode}
          content={novelInfo.data.summary}
        />
      </div>
    </div>
  );
};
