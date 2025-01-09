import Image from 'next/image';
import { useEffect, useState } from 'react';
import BottomArrow from '@/images/bottom-arrow.svg';
import { Categorys } from '@/shared';

type NovelGenreButtonProps = {
  disabled: boolean;
  category?: Categorys;
};

export const NovelGenreButton = ({ disabled, category }: NovelGenreButtonProps) => {
  const [openPanel, setOpenPanel] = useState(false);

  useEffect(() => {
    if (disabled) {
      setOpenPanel(false);
    }
  }, [disabled]);

  const togglePanel = () => {
    if (!disabled) {
      setOpenPanel(prev => !prev);
    }
  };

  return (
    <button
      type="button"
      className={`${
        disabled
          ? 'flex bg-transparent text-gray-900 text-xs font-medium cursor-default'
          : 'flex min-w-[90px] h-[30px] bg-blue-500 text-white rounded-full px-3 py-2 items-center relative text-sm font-medium cursor-pointer'
      }`}
      onClick={togglePanel}
    >
      {category?.name}
      <Image src={BottomArrow} alt="novel-genre-select-box-open" className="ml-2" />
      {openPanel && (
        <div className="absolute w-[440px] min-h-[152px] top-[50px] flex flex-wrap rounded-md border border-gray-300 bg-white shadow-md pb-6">
          {Array.from({ length: 9 }, (_, idx) => (
            <label key={idx} className="flex items-center w-[121px] mt-5 ml-4 cursor-pointer">
              <input type="radio" name="genre" className="w-6 h-6 accent-blue-500" />
              <p className="ml-2 text-black1 text-sm font-medium">시/수필/에세이</p>
            </label>
          ))}
        </div>
      )}
    </button>
  );
};
