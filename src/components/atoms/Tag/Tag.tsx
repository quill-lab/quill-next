import React from 'react';

type TagProps = {
  text: string;
};

export const Tag = ({ text }: TagProps) => {
  return (
    <div className={'bg-white rounded py-[6.5px] px-[18px] flex justify-center'}>
      <span className={`text-[#333] font-spoqa text-[12px] font-[400]`}>{`#${text}`}</span>
    </div>
  );
};
