import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.writergarden.co.kr',
  cache: new InMemoryCache(),
});

export default client;
