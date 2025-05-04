'use client';

import LoadingBar from '@/components/atoms/LoadingBar';
import { callApiResponse } from '@/shared/interface/api';
import { IParticipatingAuthor } from '@/shared/interface/author';
import callApi from '@/shared/utils/fetchWrapper';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'react-toastify';
import { getAdminAccountId } from './action';

interface WorkSpaceTabHeaderProps {
  currentTab: string;
}

export default function WorkSpaceTabHeader({ currentTab }: WorkSpaceTabHeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const roomId = params?.roomId;

  const tabHeader = [
    {
      name: '작품 정보',
      alias: 'work-info',
      url: `/work-space/detail/${roomId}/info`,
    },
    {
      name: '작품 기획',
      alias: 'plan',
      url: `/work-space/detail/${roomId}/plan`,
    },
    {
      name: '작품 회차',
      alias: 'episode',
      url: `/work-space/detail/${roomId}/episode`,
    },
    {
      name: '작가 관리',
      alias: 'management',
      url: `/work-space/detail/${roomId}/management`,
    },
  ];

  const navigate = (url: string, alias: string) => {
    startTransition(async () => {
      if (alias === 'management') {
        const { adminAccountId } = await getAdminAccountId(roomId);

        if (adminAccountId !== session?.user?.id) {
          toast.error('공방의 관리자만 접근할 수 있는 페이지입니다.');
          return;
        }
      }
      router.push(url);
    });
  };

  return (
    <div className="relative">
      {isPending && <LoadingBar />}
      <div className="w-full flex gap-[14px] justify-center items-center">
        {tabHeader.map(tab => (
          <div
            onClick={() => navigate(tab.url, tab.alias)}
            className={`cursor-pointer w-full py-[15px] rounded-tl-[20px] rounded-tr-[20px] text-center font-spoqa text-[#2D2D2D] text-[14px] font-[500] ${
              tab.alias === currentTab ? 'bg-[#fff]' : 'bg-white/80'
            }`}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  );
}
