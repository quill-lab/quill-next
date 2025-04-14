import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://gow-jvm-graphql-dev.cd80.run/graphiql ',
  cache: new InMemoryCache(),
});

export default client;
