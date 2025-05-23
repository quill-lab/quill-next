import { CharacterInfoCard } from '@/components/work-space/detail/CharacterInfoCard/CharacterInfoCard';
import { useNovelRoom } from '@/stores';
import { useCharacterStore } from '@/stores/useCharacter';
import Image from 'next/image';
import './custom-scrollbar.scss';

export default function CharacterCardList() {
  const { editMode } = useNovelRoom();
  const { list, addCharacter, removeCharacter, updateCharacter } = useCharacterStore();

  return (
    <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap'}>
      {editMode && list?.length ? (
        list?.map((character, index) => (
          <div
            key={character.id}
            className="w-full min-h-[200px] p-[20px] bg-white-opacity-50 focus-within:bg-[#FFFFFFCC] flex flex-col items-center justify-start rounded-xl"
          >
            <div className="w-full flex justify-end " onClick={() => removeCharacter(character.id)}>
              <Image src={'/images/close.svg'} alt="close" width={18} height={18} />
            </div>
            <div className="w-full flex items-center gap-[8px]">
              <div
                contentEditable
                className="w-full bg-[transparent] px-[4px] py-[4px] outline-none break-words whitespace-pre-wrap text-[#2D2D2D] text-[14px] font-[500]"
                onBlur={e => {
                  console.log('===================:', e.currentTarget.textContent);
                  updateCharacter(index, 'name', e.currentTarget.textContent || '');
                }}
              >
                {character.name}
              </div>
            </div>
            <textarea
              value={character.description}
              onChange={e => updateCharacter(index, 'description', e.target.value)}
              className="text-[#2D2D2D] text-[14px] font-[400] w-full h-full bg-[transparent] px-[4px] py-[4px] resize-none text-[14px] font-[400] border-none outline-none custom-scrollbar"
            />
          </div>
        ))
      ) : list?.length ? (
        list?.map(character => (
          <CharacterInfoCard
            key={character.id}
            id={character.id}
            name={character.name}
            description={character.description}
          />
        ))
      ) : (
        <></>
      )}

      {editMode && (
        <div
          onClick={addCharacter}
          className={
            'cursor-pointer w-full sm:w-[238px] min-h-[200px] p-[20px] bg-white-opacity-50 flex items-center justify-center rounded-xl'
          }
        >
          <Image src={'/images/add.png'} width={24} height={24} alt="add" />
        </div>
      )}
    </div>
  );
}
