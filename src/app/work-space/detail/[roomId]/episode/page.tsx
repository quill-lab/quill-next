import { authOptions } from '@/authOptions';
import EpisodeTemplate from '@/components/templates/EpisodeTemplate';
import { ApolloClient, gql, HttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';

interface EpisodeInterface {
  params: {
    roomId: string;
  };
}

const GET_EPISODES = gql`
  query GET_EPISODES {
    chaptersConnection(contributorGroupId: "01956640-6e5c-748e-83a3-4c4c78b7e3e3") {
      nodes {
        id
        episode
        title
        editedAt
        status
        approvedAt
      }
    }
  }
`;

export default async function EpisodePage({ params }: EpisodeInterface) {
  const session = await getServerSession(authOptions);

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

  const { data: episodes } = await client.query({ query: GET_EPISODES });
  console.log({ episodes });
  return <EpisodeTemplate />;
}
