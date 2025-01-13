import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle: 'Home', headerTitleAlign: 'center'}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="not-found" options={{headerTitle: 'Route 404', headerTitleAlign: 'center'}} />
    </Stack>
  );
}
