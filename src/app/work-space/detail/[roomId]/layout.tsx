import { authOptions } from '@/authOptions';
import { NovelTitle } from '@/components/work-space/detail/NovelTitle/NovelTitle';
import { Member, NovelItem } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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
    <div className="flex gap-[40px] w-full">
      <div
        style={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
        className="relative mt-[70px] w-[25%] h-[468px] bg-[#fff] rounded-[20px] flex flex-col items-center max-w-[300px]"
      >
        <div className="py-[16px]">
          <p className="text-[#2D2D2D] text-[16px] font-[400]">참여 작가 (5/5)</p>
        </div>

        <div className="pt-[21.5px] pl-[32px] flex flex-col gap-[24px] items-left w-full h-full">
          {members.map(member => (
            <div className="flex gap-[12px]">
              <Image src={'/images/avatar.png'} width={24} height={24} alt="avatar" />
              <p>{member.nickname}</p>
              {member.role === 'MAIN' && (
                <Image src={'/images/novel-room-admin.svg'} width={16} height={16} alt="admin" />
              )}
            </div>
          ))}
        </div>

        <button className="w-full stiky bottom-0 left-0 bg-[#F8F8F8] py-[20px] text-center text-[#059EAF] text-[14px] font-[500] font-spoqa rounded-bl-[20px] rounded-br-[20px]">
          작가 순서 관리
        </button>
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
    </div>
  );
}
