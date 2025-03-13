import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { CharacterInfo } from '@/interfaces';
import { useNovelRoom } from '@/stores';
import { useCharacterStore } from '@/stores/useCharacter';
import Image from 'next/image';
import './custom-scrollbar.scss';

interface CharacterCardListProps {
  characters: [CharacterInfo];
}

export default function CharacterCardList({ characters }: CharacterCardListProps) {
  const { editMode } = useNovelRoom();
  const { list, addCharacter, removeCharacter, updateCharacter } = useCharacterStore();

  return (
    <div className={'flex gap-4 flex-wrap'}>
      {characters?.map(character => (
        <CharacterInfoCard
          key={character.name}
          name={character.name}
          description={character.description}
        />
      ))}
      {list.map((character, index) => (
        <div
          key={index}
          className="w-[238px] min-h-[200px] p-[20px] bg-[#FFFFFFCC] flex flex-col items-center justify-start rounded-xl"
        >
          <div className="w-full flex items-center gap-[8px]">
            <div
              contentEditable
              className="w-full bg-[transparent] px-[4px] py-[4px] outline-none break-words whitespace-pre-wrap"
              onInput={e => updateCharacter(index, 'name', e.currentTarget.textContent || '')}
            >
              {character.name}
            </div>
            {/* <button
              onClick={() => removeCharacter(index)}
              className="bg-[gray] text-center px-[12px] py-[4px]"
            >
              x
            </button> */}
          </div>
          <textarea
            value={character.description}
            onChange={e => updateCharacter(index, 'description', e.target.value)}
            className="w-full h-full bg-[transparent] px-[4px] py-[4px] resize-none text-[14px] font-[400] border-none outline-none custom-scrollbar"
          />
        </div>
      ))}
      {editMode && (
        <div
          onClick={addCharacter}
          className={
            'cursor-pointer w-[238px] min-h-[200px] p-[20px] bg-white-opacity-50 flex items-center justify-center rounded-xl'
          }
        >
          <Image src={'/images/add.png'} width={24} height={24} alt="add" />
        </div>
      )}
    </div>
  );
}
