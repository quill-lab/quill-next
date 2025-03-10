import React from 'react';

type TagProps = {
  text: string;
  editMode?: boolean;
};

export const Tag = ({ text }: TagProps) => {
  return (
    <div className={'bg-white rounded py-[6.5px] px-[18px] w-[109px] flex justify-center'}>
      <span className={'text-sm'}>{`#${text}`}</span>
    </div>
  );
};
