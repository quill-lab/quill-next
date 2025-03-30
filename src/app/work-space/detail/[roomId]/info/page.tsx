import { authOptions } from '@/authOptions';
import { WorkInfo } from '@/components/work-space/detail/WorkInfo/WorkInfo';
import { INIT_WORK_INFO } from '@/constants/initWorkInfo';
import { CharacterInfo } from '@/interfaces';
import { NovelChapter, NovelItem } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface WorkInfoPageProps {
  params: {
    roomId: string;
  };
}

const WorkInfoPage = async ({ params }: WorkInfoPageProps) => {
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

  const characters: [CharacterInfo] = await callApi({
    url: `/api/v1/novel-rooms/${roomId}/characters`,
    method: 'GET',
    token: session?.user?.token,
  });

  const mappedNovelRoomInfo = {
    ...novelRoomInfo,
    synopsis: novelRoomInfo.synopsis || INIT_WORK_INFO.synopsis,
    description: novelRoomInfo.description || INIT_WORK_INFO.description,
  };

  return <WorkInfo novelRoomInfo={mappedNovelRoomInfo} characters={characters} />;
};

export default WorkInfoPage;
