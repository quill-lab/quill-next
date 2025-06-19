import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://ec2-15-165-72-124.ap-northeast-2.compute.amazonaws.com:8081/graphiql',
  cache: new InMemoryCache(),
});

export default client;
