import React from 'react';
import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { useQueryWrap } from '@/hooks/reactQeuryWrapper';
import { getCharactersInfo } from '@/fetch/get';

export const WorkInfo = () => {
  const roomId = 2;

  // const { data: characters } = useQueryWrap({
  //   queryKey: [`getCharactersInfo`, roomId],
  //   queryFn: () => getCharactersInfo({ roomId }),
  // });

  const dummys = [
    {
      name: '1',
      description: '111111111222222233333',
      updatedAt: '240120123',
      lastModifier: '춘보',
    },
    {
      name: '1',
      description:
        '윤현우\n' +
        '순양그룹 기획조정본부 산하 미래자산관리팀장 (남/40대 중반)\n' +
        '\n' +
        '흙수저. 없는 집 장남이며 가장. 오너일가의 리스크를 관리하는 해결사. 오너일가의 지시라면 거절도, 질문도, 판단도 하지 않는 충성스런 순양맨. 그런 그가 해외에 숨겨진 자산을 순양에 귀속시키라는 특명과 함께 재무팀장으로 승진이 된다.',
      updatedAt: '240120123',
      lastModifier: '춘보',
    },
    {
      name: '1sdsdsad',
      description: '111111111222222233333',
      updatedAt: '240120123',
      lastModifier: '춘보',
    },
    {
      name: '11sdsdsad1sdsdsad',
      description: '111111111222222233333',
      updatedAt: '240120123',
      lastModifier: '1sdsdsad',
    },
  ];

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-4'}>
        {dummys?.map(character => (
          <CharacterInfoCard key={character.name} {...character} />
        ))}
      </div>
    </div>
  );
};
