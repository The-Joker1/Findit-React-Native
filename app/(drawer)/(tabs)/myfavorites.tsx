import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FavoriteItemCard from '../../../components/favorites';
import { GetUserFavorites } from '../../services/API/favorites';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      const id = await SecureStore.getItemAsync('userId');
      setUserId(id);
      setAuthChecked(true);
      
      if (!id && isFocused) {
        Alert.alert(
          'Login Required',
          'You need to be logged in to access your favorites.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            }
          ],
          { cancelable: false }
        );
      }
    };

    checkAuth();
  }, [isFocused]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => {
      if (!userId) throw new Error('No user ID available');
      return GetUserFavorites(userId);
    },
    enabled: !!userId && authChecked,
  });

  const handleRemoveSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
  };

  if (!authChecked) {
    return null; 
  }

  if (!userId) {
    return (
      <View style={styles.center}>
        <Text style={styles.loginMessage}>Redirecting to login page...</Text>
      </View>
    );
  }

  if (isLoading || isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Loading your favorites...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <FavoriteItemCard
              favorite={item}
              userId={userId}
              onRemove={handleRemoveSuccess}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.placeholder}>You don't have any favorites yet.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  listContainer: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  placeholder: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  loginMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
