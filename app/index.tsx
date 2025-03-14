import { Link } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApolloProviderComponent from "./apolloprovider";

export default function Index() {
  return (
    <ApolloProviderComponent>
        <SafeAreaView>
        <View style={style.container}>
          <Text style={style.text}> WisdomEnigma Connect </Text>
          <Link href={'/(tabs)/home'} style={style.button}> Allure the Enigma </Link>
        </View>
      </SafeAreaView>
    </ApolloProviderComponent>
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
