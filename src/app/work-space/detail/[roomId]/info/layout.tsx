import { authOptions } from '@/authOptions';
import { NovelTitle } from '@/components/work-space/detail/NovelTitle/NovelTitle';
import { NovelItem } from '@/shared';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function DetailRoomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomId: string };
}) {
  const roomId = params.roomId;
  const session = await getServerSession(authOptions);

  const novelRoomInfo: NovelItem = await callApi({
    url: `/api/v1/novel-rooms/${roomId}`,
    method: 'GET',
    token: session?.user?.token,
  });

  return (
    <div className="flex gap-[40px] w-full">
      <div
        style={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
        className="mt-[70px] w-[25%] h-[468px] bg-[#fff] rounded-[20px] flex flex-col items-center"
      >
        <div className="py-[16px]">
          <p className="text-[#2D2D2D] text-[16px] font-[400]">참여 작가 (5/5)</p>
        </div>
        <div className="pt-[21.5px] pl-[32px] flex flex-col gap-[24px] items-start w-full">
          <div className="flex gap-[12px]">
            <Image src={'/images/avatar.png'} width={24} height={24} alt="avatar" />
            <p>용진 726</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] w-full">
        <div className="flex flex-col gap-4 w-full">
          <NovelTitle
            title={novelRoomInfo.title}
            status={novelRoomInfo.status}
            category={{ name: novelRoomInfo.category.name, alias: novelRoomInfo.category.alias }}
            editMode={true}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
