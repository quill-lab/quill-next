import { authOptions } from '@/authOptions';
import NovelEpisodeTemplate from '@/components/templates/NovelEpisodeTemplate';
import { callApiResponse } from '@/shared/interface/api';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { ChapterText } from '@/shared/interface/chapter';
import { getEpisodeData } from './action';

interface NovelEpisode {
  params: {
    roomId: string;
    episodeId: string;
  };
}

const NovelEpisodePage = async ({ params }: NovelEpisode) => {
  const session = await getServerSession(authOptions);
  const roomId = params?.roomId;
  const episodeId = params?.episodeId;

  const episodeData = await getEpisodeData(roomId, episodeId);

  const episodeTexts: { items: ChapterText[] } & callApiResponse = await callApi({
    url: `/api/v1/novel-rooms/${roomId}/chapters/${episodeId}/texts`,
    method: 'GET',
    token: session?.user?.token,
  });

  const sortedEpisodeTexts = episodeTexts.items.sort(
    (a: ChapterText, b: ChapterText) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return <NovelEpisodeTemplate episodeTexts={sortedEpisodeTexts} episodeData={episodeData} />;
};

export default NovelEpisodePage;
