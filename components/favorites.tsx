import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import {DeleteFavorite} from '../app/services/API/favorites'; // Assurez-vous que le chemin est correct
interface Product {
  id: string;
  title: string;
  price: string;
  seller: string;
  thumbnail?: string;
}

interface Favorite {
  productId: string;
  product: Product;
}

interface Props {
  favorite: Favorite;
  userId: string;
  onRemove?: (productId: string) => void;
}


const FavoriteItemCard: React.FC<Props> = ({ favorite, userId, onRemove }) => {
  const deleteMutation = useMutation({
    mutationFn: () => DeleteFavorite(userId, favorite.productId),
    onSuccess: () => {
      Alert.alert('Success', 'Product removed from favorites');
      if (onRemove) onRemove(favorite.productId);
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message || 'Failed to remove product');
    },
  });

  const handleRemove = () => {
    deleteMutation.mutate();
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Image 
          source={{ uri: favorite.product.thumbnail || 'https://via.placeholder.com/96' }} 
          style={styles.thumbnail} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{favorite.product.title}</Text>
          <Text style={styles.price}>Price: €{favorite.product.price}</Text>
          <Text style={styles.seller}>Seller: {favorite.product.seller}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.button, deleteMutation.isPending && styles.buttonDisabled]} 
        onPress={handleRemove}
        disabled={deleteMutation.isPending}
      >
        <Text style={styles.buttonText}>
          {deleteMutation.isPending ? 'Removing...' : 'Remove'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: '#4B5563',
    marginBottom: 4,
  },
  seller: {
    color: '#6B7280',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FavoriteItemCard;