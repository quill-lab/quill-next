import { authOptions } from '@/authOptions';
import EpisodeTemplate from '@/components/templates/EpisodeTemplate';
import { Chapter } from '@/shared/interface/chapter';
import { ApolloClient, gql, HttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';

interface EpisodeInterface {
  params: {
    roomId: string;
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

export default async function EpisodePage({ params }: EpisodeInterface) {
  const session = await getServerSession(authOptions);
  const roomId = params?.roomId;
  console.log({ token: session?.user?.token });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: session?.user?.token ? `Bearer ${session?.user?.token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: 'https://gow-jvm-graphql-dev.cd80.run/graphql',
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

  const formmatedEpisodes = episodes.chaptersConnection.nodes.map((episode: Chapter) => {
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

  console.log({ episodes: episodes.chaptersConnection.nodes });
  return <EpisodeTemplate episodes={formmatedEpisodes} />;
}
