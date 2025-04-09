'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface WorkSpaceTabHeaderProps {
  currentTab: string;
}

const MobileTabHeader = ({ currentTab }: WorkSpaceTabHeaderProps) => {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId;
  const [isPending, startTransition] = useTransition();

  const tabHeader: { [key: string]: { name: string; url: string; index: number } } = {
    info: {
      name: '작품 정보',
      url: `/work-space/detail/${roomId}/info`,
      index: 0,
    },
    plan: {
      name: '작품 기획',
      url: `/work-space/detail/${roomId}/plan`,
      index: 1,
    },
    writing: {
      name: '글쓰기',
      url: `/work-space/detail/${roomId}/writing`,
      index: 2,
    },
    episode: {
      name: '작품 회차',
      url: `/work-space/detail/${roomId}/episode`,
      index: 3,
    },
    author: {
      name: '작가 관리',
      url: `/work-space/detail/${roomId}/author`,
      index: 4,
    },
  };

  const transition = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const handlePrevTab = (index: number) => {
    if (index === 0) {
      transition(`/work-space/detail/${roomId}/author`);
    } else {
      transition(`/work-space/detail/${roomId}/${Object.keys(tabHeader)[index - 1]}`);
    }
  };

  const handleNextTab = (index: number) => {
    if (index === Object.keys(tabHeader).length - 1) {
      transition(`/work-space/detail/${roomId}/info`);
    } else {
      transition(`/work-space/detail/${roomId}/${Object.keys(tabHeader)[index + 1]}`);
    }
  };

  return (
    <div className="relative flex justify-between items-center py-[8px] px-[24px] bg-[#fff] rounded-[10px]">
      {isPending && <LoadingBar />}
      <Image
        onClick={() => handlePrevTab(tabHeader[currentTab].index)}
        src={'/images/left-shevron.svg'}
        alt="left-shevron"
        className="cursor-pointer"
        width={6}
        height={10}
      />
      <h3 className="text-[#2D2D2D] text-[14px] font-[500] font-spoqa">
        {tabHeader[currentTab].name}
      </h3>
      <Image
        onClick={() => handleNextTab(tabHeader[currentTab].index)}
        src={'/images/right-shevron.svg'}
        alt="right-shevron"
        className="cursor-pointer"
        width={6}
        height={10}
      />
    </div>
  );
};

export default MobileTabHeader;
