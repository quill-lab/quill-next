import { useParams, useRouter } from 'next/navigation';

interface WorkSpaceTabHeaderProps {
  currentTab: string;
}

export default function WorkSpaceTabHeader({ currentTab }: WorkSpaceTabHeaderProps) {
  const router = useRouter();
  const params = useParams();
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
      name: '글쓰기',
      alias: 'writing',
      url: `/work-space/detail/${roomId}/writing`,
    },
    {
      name: '작품 회차',
      alias: '',
      url: '/',
    },
    {
      name: '작가 관리',
      alias: '',
      url: '/',
    },
  ];

  return (
    <div className="w-full flex gap-[14px] justify-center items-center">
      {tabHeader.map(tab => (
        <div
          onClick={() => router.push(tab.url)}
          className={`cursor-pointer w-full py-[15px] rounded-tl-[20px] rounded-tr-[20px] text-center font-spoqa text-[#2D2D2D] text-[14px] font-[500] ${
            tab.alias === currentTab ? 'bg-[#fff]' : 'bg-white/80'
          }`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
