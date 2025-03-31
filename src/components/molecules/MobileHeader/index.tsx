'use client';

import Image from 'next/image';
import React from 'react';

const MobileHeader = () => {
  return (
    <div className="mt-[24px] flex justify-between items-center w-full rounded-[100px] border border-[0.6px] border-[#059EAF] py-[8px] px-[24px]">
      <Image
        src={'/images/login-logo.svg'}
        alt="logo"
        width={30}
        height={30}
        onClick={() => {}}
        className="cursor-pointer"
      />
      <h1 className="text-[#059EAF] font-[spoqa] text-[16px] font-[500]">소설공방</h1>
      <button>
        <Image src={'/images/hamburger.svg'} alt="hamburger" width={14} height={15} />
      </button>
    </div>
  );
};

export default MobileHeader;
