import { authOptions } from '@/authOptions';
import NovelTemplate from '@/components/templates/NovelTemplate';
import { Chapter } from '@/shared/interface/chapter';
import callApi from '@/shared/utils/fetchWrapper';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getServerSession } from 'next-auth';
import React from 'react';

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

  const formattedEpisodes = episodes.chaptersConnection.nodes.map((episode: Chapter) => {
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

  return <NovelTemplate episodes={formattedEpisodes} />;
};

export default NovelPage;
