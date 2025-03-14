import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    defaultDataIdFromObject,
    ApolloProvider as Provider,
  } from '@apollo/client'
  import { setContext } from '@apollo/client/link/context'
  import { relayStylePagination } from '@apollo/client/utilities'
  import { supabase } from './supabase';
  import { onError } from '@apollo/client/link/error';
  
  const cache = new InMemoryCache({
    dataIdFromObject(responseObject) {
      if ('nodeId' in responseObject) {
        return `${responseObject.nodeId}`
      }
  
      return defaultDataIdFromObject(responseObject)
    },
    possibleTypes: { Node: ['wenigmaDinner'] }, // optional, but useful to specify supertype-subtype relationships
    typePolicies: {
      Query: {
        fields: {
          todosCollection: relayStylePagination(), // example of paginating a collection
          node: {
            read(_, { args, toReference }) {
              const ref = toReference({
                nodeId: args?.nodeId,
              })
  
              return ref
            },
          },
        },
      },
    },
  })
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:54321/graphql/v1',
  })
  
  const authLink = setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token
  
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
  
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })


  const ApolloProviderComponent = ({children}: any) => {
    return <Provider client={apolloClient}>{children}</Provider>;
  };
  
  export default ApolloProviderComponent;
  