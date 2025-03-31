import { authOptions } from '@/authOptions';
import ContributerList from '@/components/organisms/ContributerList';
import { NovelTitle } from '@/components/work-space/detail/NovelTitle/NovelTitle';
import { Member, NovelItem } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import MobileContributerList from '@/components/organisms/MobileContributerList';

export default async function DetailRoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomId: string };
}) {
  const roomId = params.roomId;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const novelRoomInfo: NovelItem & callApiResponse = await callApi({
    url: `/api/v1/novel-rooms/${roomId}`,
    method: 'GET',
    token: session?.user?.token,
  });

  if (novelRoomInfo.statusCode && novelRoomInfo.statusCode === 401) {
    redirect('/');
  }

  const members: Member[] & callApiResponse = await callApi({
    url: `/api/v1/novel-rooms/${roomId}/participants`,
    method: 'GET',
    token: session?.user?.token,
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col  sm:flex-row gap-[40px] w-full max-w-[1400px]">
        <div className="w-full max-w-[300px] hidden sm:flex items-start">
          <ContributerList members={members} />
        </div>
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-4 w-full">
            <NovelTitle
              title={novelRoomInfo.title}
              status={novelRoomInfo.status}
              category={{ name: novelRoomInfo.category.name, alias: novelRoomInfo.category.alias }}
            />
          </div>
          {children}
        </div>
        <div className="block sm:hidden w-full mb-[50px] px-[16px]">
          <MobileContributerList members={members} />
        </div>
      </div>
    </div>
  );
}
