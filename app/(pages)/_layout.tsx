import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        // Options par défaut pour tous les écrans
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
      }}
    >
      {/* Configuration spécifique pour Login */}
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
      
      {/* Configuration pour les autres pages si nécessaire */}
      <Stack.Screen name="Register" options={{ title: 'Inscription' }} />
    </Stack>
  );
}