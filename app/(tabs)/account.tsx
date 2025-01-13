import { Link, Redirect } from 'expo-router';
import { IconButton, MD3Colors } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <IconButton icon={'camera'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{}} style={styles.button}></IconButton>
      <IconButton icon={'facebook'} iconColor={MD3Colors.primary50} size={50} style={styles.button}></IconButton>
      <IconButton icon={'bitcoin'} iconColor={MD3Colors.neutral80} size={50} style={styles.button}></IconButton>
      <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} style={styles.button}></IconButton>
      <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} style={styles.button}></IconButton>
      <IconButton icon={'message'} iconColor={MD3Colors.tertiary80} size={50} style={styles.button}></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button:{
    position: 'relative',
    left: -600,
    top: -30
  }
});
