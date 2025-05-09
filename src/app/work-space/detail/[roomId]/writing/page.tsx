import { authOptions } from '@/authOptions';
import WritingTemplate from '@/components/templates/WritingTemplate';
import { Member } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import { ChapterText, DraftText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getChapter } from './action';

interface WritingPageProps {
  searchParams: {
    episode: string;
  };
  params: {
    roomId: string;
  };
}

const WritingPage = async ({ params, searchParams }: WritingPageProps) => {
  const session = await getServerSession(authOptions);
  const chapterId = searchParams.episode;
  const roomId = params.roomId;

  if (!roomId) {
    redirect('/work-space');
  }

  if (!chapterId) {
    redirect(`/work-space/detail/${roomId}/info`);
  }

  const [chapterTexts, draftText, members, chapterInfo] = await Promise.all([
    callApi<{ items: ChapterText[] } & callApiResponse>({
      url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/texts`,
      method: 'GET',
      token: session?.user?.token,
    }),
    callApi<DraftText>({
      url: `/api/v1/novel-rooms/${roomId}/chapters/${chapterId}/draft-text`,
      method: 'GET',
      token: session?.user?.token,
    }),
    callApi<Member[]>({
      url: `/api/v1/novel-rooms/${roomId}/participants`,
      method: 'GET',
      token: session?.user?.token,
    }),
    await getChapter(chapterId),
  ]);

  if (chapterTexts.statusCode && chapterTexts.statusCode === 401) {
    redirect('/');
  }

  const adminAccount = members.find(member => member.role === 'MAIN');
  // const authLink = setContext((_, { headers }) => {
  //   return {
  //     headers: {
  //       ...headers,
  //       Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : '',
  //     },
  //   };
  // });

  // const httpLink = new HttpLink({
  //   uri: 'https://gow-jvm-graphql-dev.cd80.run/graphql',
  // });

  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

  // const { data: episodes } = await client.query({
  //   // query: GET_EPISODES,
  //   variables: {
  //     contributorGroupId: roomId,
  //   },
  // });

  const chapterText = chapterTexts.items.sort(
    (a: ChapterText, b: ChapterText) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const mappingChapter = {
    title: chapterInfo?.novels.title || '',
    chapterTitle: chapterInfo?.title || '',
    chapterNumber: chapterInfo?.chapter_number || 0,
    chapters: chapterText.map(chapter => ({
      id: chapter.id,
      content: chapter.content,
      authorName: chapter.authorName,
      createdAt: chapter.createdAt,
    })),
  };

  return (
    <WritingTemplate chapter={mappingChapter} draftText={draftText} adminAccount={adminAccount!} />
  );
};

export default WritingPage;
