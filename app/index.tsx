import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
   <SafeAreaView>
        <View style={style.container}>
          <Text style={style.text}> WisdomEnigma Connect </Text>
          <Text style={style.text}> Be alchemist </Text>
          <Link href={'/(tabs)/home'} style={style.button}> Welcome Guest </Link>
        </View>
   </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text:{
    color: '#fff',
    fontSize: 20
  },
  button:{
    fontSize: 20,
    color: 'gold',
    position: 'relative',
    top: 180,
  }
})
