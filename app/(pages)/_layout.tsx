import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen 
        name="Login" 
        options={{ 
          title: 'Sign In',
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen name="Register" options={{ title: 'Register' }} />
    </Stack>
  );
}