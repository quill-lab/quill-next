import { authOptions } from '@/authOptions';
import WritingTemplate from '@/components/templates/WritingTemplate';
import { Member } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import { ChapterText, DraftText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface WritingPageProps {
  searchParams: {
    episode: string;
  };
  params: {
    roomId: string;
  };
}

// const GET_CHAPTER_DATA = gql``;

const WritingPage = async ({ params, searchParams }: WritingPageProps) => {
  const session = await getServerSession(authOptions);
  const chapterId = searchParams.episode;
  const roomId = params.roomId;

  if (!roomId) {
    redirect('/work-space');
  }

  // TODO: chapterId 가 없을 경우 list로 리다이렉트
  if (!chapterId) {
    redirect(`/work-space/detail/${roomId}/info`);
  }

  const [chapterTexts, draftText, members] = await Promise.all([
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

  return (
    <WritingTemplate chapter={chapterText} draftText={draftText} adminAccount={adminAccount!} />
  );
};

export default WritingPage;
