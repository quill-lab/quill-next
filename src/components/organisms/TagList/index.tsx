// import { Tag } from '@/components/atoms/Tag/Tag';
// import { useNovelRoom } from '@/stores';

// interface TagListProps {
//   tags: string[];
// }

// export default function TagList({ tags }: TagListProps) {
//   const { editMode, editTags, setEditTags } = useNovelRoom();

//   return (
//     <div
//       className={
//         'bg-white-opacity-50 rounded-[10px] py-4 px-5 relative w-full overflow-y-hidden overflow-x-auto min-h-[58px] flex items-center'
//       }
//     >
//       <div className={'flex gap-3.5'}>
//         {tags.map(tag => (
//           <Tag key={tag} text={tag} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Tag } from '@/components/atoms/Tag/Tag';
import { useNovelRoom } from '@/stores';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const { editMode, editTags, addTags, updateTags, removeTags } = useNovelRoom();

  return (
    <div
      className={
        'bg-white-opacity-50 rounded-[10px] py-4 px-5 relative w-full overflow-y-hidden overflow-x-auto min-h-[58px] flex items-center'
      }
    >
      <div className="flex gap-3.5 flex-wrap">
        {!editMode && tags.map(tag => <Tag key={tag} text={tag} />)}

        {editMode && (
          <>
            {editTags.map((tag: string, index: number) => (
              <div className="flex items-center gap-2 flex-wrap">
                <div>
                  <input
                    type="text"
                    value={tag}
                    onChange={e => updateTags(index, e.target.value)}
                    placeholder="새 태그 입력"
                    className="border border-gray-300 px-2 py-1 rounded-md text-sm"
                  />
                  <button
                    onClick={() => {
                      removeTags(index);
                    }}
                    className="bg-[gray] text-center border border-[1px] border-[gray] px-[12px] py-[4px]"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}

            <button onClick={addTags} className="text-[20px] font-bold">
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
}
