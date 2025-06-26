import { authOptions } from '@/authOptions';
import WritingTemplate from '@/components/templates/WritingTemplate';
import { Member } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import { ChapterText, DraftText } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getChapter } from './action';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface WritingPageProps {
  searchParams: {
    episode: string;
  };
  params: {
    roomId: string;
  };
}

const GET_CURRENT_AUTHOR = gql`
  query getChapter($id: ID!) {
    chapter(id: $id) {
      currentAuthor {
        id
        name
        accountId
      }
    }
  }
`;

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

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: 'https://graphql.writergarden.co.kr',
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const [chapterTexts, draftText, members, chapterInfo, currentAuthor] = await Promise.all([
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
    await client.query({
      query: GET_CURRENT_AUTHOR,
      variables: {
        id: chapterId,
      },
    }),
  ]);

  if (chapterTexts.statusCode && chapterTexts.statusCode === 401) {
    redirect('/');
  }

  if (chapterInfo?.status !== 'DRAFT') {
    redirect(`/work-space/detail/${roomId}/episode`);
  }

  const adminAccount = members.find(member => member.role === 'MAIN');

  const chapterText = chapterTexts.items.sort(
    (a: ChapterText, b: ChapterText) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const mappingChapter = {
    title: chapterInfo?.novels.title || '',
    chapterTitle: chapterInfo?.title || '',
    chapterNumber: chapterInfo?.chapter_number || 0,
    description: chapterInfo?.description || '',
    chapters: chapterText.map(chapter => ({
      id: chapter.id,
      content: chapter.content,
      authorName: chapter.authorName,
      createdAt: chapter.createdAt,
    })),
  };

  const formattedCurrentAuthor = {
    id: currentAuthor.data.chapter.currentAuthor.id,
    name: currentAuthor.data.chapter.currentAuthor.name,
    accountId: currentAuthor.data.chapter.currentAuthor.accountId,
  };

  return (
    <WritingTemplate
      chapter={mappingChapter}
      draftText={draftText}
      adminAccount={adminAccount!}
      currentAuthor={formattedCurrentAuthor}
    />
  );
};

export default WritingPage;
