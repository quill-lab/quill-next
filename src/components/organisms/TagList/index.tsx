import { useState } from 'react';
import { Tag } from '@/components/atoms/Tag/Tag';
import { useNovelRoom } from '@/stores';
import Image from 'next/image';
import EditTag from '@/components/atoms/EditTag';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const { editMode, editTags, addTags, removeTags } = useNovelRoom();

  return (
    <div
      className={
        'bg-white-opacity-50 rounded-[10px] py-4 px-5 relative w-full overflow-y-auto overflow-x-auto min-h-[58px] flex items-center'
      }
    >
      <div className="flex gap-3.5 flex-wrap">
        {!editMode && tags.map(tag => <Tag key={tag} text={tag} />)}

        {editMode && (
          <>
            {editTags.map((tag: string, index: number) => (
              <div className="relative">
                <EditTag
                  key={tag}
                  text={tag}
                  index={index}
                  isLast={index === editTags.length - 1}
                />
                <Image
                  src="/images/tag-close.svg"
                  alt="close"
                  width={15}
                  height={15}
                  onClick={() => removeTags(index)}
                  className="absolute top-[-5px] right-[-5px] cursor-pointer"
                />
              </div>
            ))}
            <button onClick={addTags} className="text-[20px] font-bold">
              <Tag text="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
