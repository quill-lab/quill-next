import React from 'react';

const NovelTag = ({ text }: { text: string }) => {
  return (
    <div className="bg-[#F3F3F3] rounded-[5px] py-[8px] px-[18px] text-[#6C6C6C] text-[12px] font-[400]">
      {text}
    </div>
  );
};

export default NovelTag;
