import BookCard from '@/components/molecules/BookCard';
import Image from 'next/image';
import React from 'react';

interface BookContainerProps {
  title: string;
  strongTitle: string;
}

const BookContainer = ({ title, strongTitle }: BookContainerProps) => {
  return (
    <>
      <h4 className="text-[#059EAF] text-[24px] font-[400] font-spoqa">
        {title} <span className="font-[700]">{strongTitle}</span>
      </h4>
      <div className="mt-[16px] flex items-center gap-[76px]">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </>
  );
};

export default BookContainer;
