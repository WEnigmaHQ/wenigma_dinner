import { Link } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { supabase } from "./supabase";


export default function Index() {

    // apollo provider handler
    // Create an HTTP link to your GraphQL endpoint
    const httpLink = createHttpLink({
      uri: 'http://wkzcdctmgbovszthwmps.supabase.co/graphql/v1',
    });

    // Set up authentication or other headers
    const authLink = setContext(async(_, { headers }) => {
      // Get the authentication token from local storage or some other source if needed
      const token = (await supabase.auth.getSession()).data.session?.access_token

    return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "", // Set the authorization header
      }};});

    const client = new ApolloClient({
      link: authLink.concat(httpLink), // Combine authLink and httpLink
      cache: new InMemoryCache(),
    });

    console.log("Client == ", client)

  return (
        <ApolloProvider client={client}>
          <SafeAreaView>
        <View style={style.container}>
          <Text style={style.text}> WisdomEnigma Connect </Text>
          <Link href={'/(tabs)/home'} style={style.button}> Allure the Enigma </Link>
        </View>
          </SafeAreaView>
        </ApolloProvider>
  );
}

const style = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 400
  },
  text:{
    color: '#fff',
    fontSize: 20,
    paddingBottom: 200,
    top: -50
  },
  button:{
    fontSize: 20,
    color: 'gold',
    top: -120
  }
})
