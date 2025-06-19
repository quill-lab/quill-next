import { authOptions } from '@/authOptions';
import EpisodeTemplate from '@/components/templates/EpisodeTemplate';
import { Chapter, ChapterFormatted } from '@/shared/interface/chapter';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';

interface EpisodeInterface {
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
        approvedAt
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

export default async function EpisodePage({ params, searchParams }: EpisodeInterface) {
  const session = await getServerSession(authOptions);
  const roomId = params?.roomId;
  const sort = searchParams?.sort;

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: 'http://ec2-15-165-72-124.ap-northeast-2.compute.amazonaws.com:8081/graphiql',
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data: episodes } = await client.query({
    query: GET_EPISODES,
    variables: {
      contributorGroupId: roomId,
    },
  });

  const formattedEpisodes = episodes.chaptersConnection.nodes.map((episode: Chapter) => {
    return {
      id: episode.id,
      episode: episode.episode,
      title: episode.title,
      editedAt: episode.editedAt ?? new Date(),
      status: episode.status,
      approvedAt: episode.approvedAt,
      currentAuthor: episode.currentAuthor ?? null,
      metadata: episode.metadata,
    };
  });

  const sortedFormattedEpisodes =
    sort === 'asc'
      ? formattedEpisodes.sort((a: ChapterFormatted, b: ChapterFormatted) => a.episode - b.episode)
      : formattedEpisodes.sort((a: ChapterFormatted, b: ChapterFormatted) => b.episode - a.episode);

  return <EpisodeTemplate episodes={sortedFormattedEpisodes} />;
}
