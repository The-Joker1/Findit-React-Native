import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@tanstack/react-query';
import FavoriteItemCard from '../../components/favorites';
import { GetUserFavorites } from '../services/API/favorites';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkAuth = async () => {
      const id = await SecureStore.getItemAsync('userId');
      setUserId(id);
      
      if (!id && isFocused) {
        Alert.alert(
          'Connexion requise',
          'Vous devez être connecté pour accéder à vos favoris',
          [
            {
              text: 'Annuler',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
            {
              text: 'Se connecter',
              onPress: () => navigation.navigate('Login'),
            },
          ],
          { cancelable: false }
        );
      }
    };

    checkAuth();
  }, [isFocused]);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => {
      if (!userId) throw new Error('No user ID available');
      return GetUserFavorites(userId);
    },
    enabled: !!userId, 
  });

  if (!userId) {
    return null; // L'alerte gère déjà la redirection
  }

  if (isLoading || isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Chargement de vos favoris...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erreur : {(error as Error).message}</Text>
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
              onRemove={() => refetch()}
            />
          )}
        />
      ) : (
        <Text style={styles.placeholder}>Vous n'avez aucun favori pour le moment.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  placeholder: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
});