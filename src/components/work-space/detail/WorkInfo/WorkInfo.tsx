import React from 'react';
import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { getCharactersInfo } from '@/fetch/get';
import { isEmpty } from 'lodash';

export const WorkInfo = () => {
  const roomId = 2;

  const { data: characters } = useQueryWrap({
    queryKey: [`getCharactersInfo`, roomId],
    queryFn: () => getCharactersInfo({ roomId }),
  });

  if (isEmpty(characters)) {
    return null; // TODO: loading 처리
  }

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-4'}>
        {characters?.data?.map(character => (
          <CharacterInfoCard key={character.name} {...character} />
        ))}
      </div>
    </div>
  );
};
