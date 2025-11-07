import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="donate" />
      <Stack.Screen name="find" />
      <Stack.Screen name="map" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}