import { authOptions } from '@/authOptions';
import NovelTemplate from '@/components/templates/NovelTemplate';
import { NovelItem } from '@/shared';
import { callApiResponse } from '@/shared/interface/api';
import { Chapter, ChapterFormatted } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getNovelAuthorList } from './action';

interface Novel {
  params: {
    roomId: string;
  };
  searchParams: {
    sort: string;
  };
}

const GET_EPISODES = gql`
  query GET_EPISODES($contributorGroupId: ID!) {
    chaptersConnection(contributorGroupId: $contributorGroupId) {
      nodes {
        id
        episode
        title
        status
        currentAuthor {
          id
          name
        }
        metadata {
          viewCount
          commentCount
          likeCount
        }
      }
    }
  }
`;

const NovelPage = async ({ params, searchParams }: Novel) => {
  const session = await getServerSession(authOptions);
  const roomId = params?.roomId;
  const sort = searchParams?.sort;

  if (!session?.user?.token) {
    redirect('/');
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
    uri: 'https://graphql.writergarden.co.kr/graphql',
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  try {
    const [episodes, novelInfo, novelAuthorList] = await Promise.all([
      await client.query({
        query: GET_EPISODES,
        variables: {
          contributorGroupId: roomId,
        },
      }),
      await callApi<NovelItem & callApiResponse>({
        url: `/api/v1/novel-rooms/${roomId}`,
        method: 'GET',
        token: session?.user?.token,
      }),
      await getNovelAuthorList(roomId),
    ]);

    if (novelInfo.statusCode && novelInfo.statusCode === 401) {
      redirect('/');
    }

    const formattedEpisodes = episodes.data.chaptersConnection.nodes
      .filter((chapter: Chapter) => chapter.status === 'APPROVED')
      .map((episode: Chapter) => {
        return {
          id: episode.id,
          episode: episode.episode,
          title: episode.title,
          editedAt: episode.editedAt ?? new Date(),
          status: episode.status,
          approvedAt: episode.approvedAt ?? new Date(),
          currentAuthor: episode.currentAuthor ?? null,
          metadata: episode.metadata,
        };
      });

    const sortedFormattedEpisodes =
      sort === 'asc'
        ? formattedEpisodes.sort(
            (a: ChapterFormatted, b: ChapterFormatted) => a.episode - b.episode
          )
        : formattedEpisodes.sort(
            (a: ChapterFormatted, b: ChapterFormatted) => b.episode - a.episode
          );

    return (
      <NovelTemplate
        episodes={sortedFormattedEpisodes}
        novelInfo={novelInfo}
        authorList={novelAuthorList!}
      />
    );
  } catch (e) {
    console.log('graphQL Error: ' + e);
    // redirect('/');
  }
};

export default NovelPage;
