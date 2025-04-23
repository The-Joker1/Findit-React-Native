import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface Product {
  title: string;
  price: string;
  seller: string;
  thumbnail: string;
}

interface Favorite {
  productId: string;
  product: Product;
}

interface Props {
  favorite: Favorite;
  onRemove?: (productId: string) => void; // Callback to notify parent (optional)
}

const FavoriteItemCard: React.FC<Props> = ({ favorite, onRemove }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch('?/delete', {
        method: 'POST',
        body: `productId=${encodeURIComponent(favorite.productId)}`,
      });

      if (response.ok) {
        Alert.alert('Removed', 'Product removed from favorites.');
        if (onRemove) onRemove(favorite.productId);
      } else {
        Alert.alert('Error', 'Failed to remove product.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: favorite.product.thumbnail }} style={styles.thumbnail} />
        <View>
          <Text style={styles.title}>{favorite.product.title}</Text>
          <Text style={styles.price}>Price: €{favorite.product.price}</Text>
          <Text style={styles.seller}>Seller: {favorite.product.seller}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRemove}>
        <Text style={styles.buttonText}>Remove</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#4B5563',
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FavoriteItemCard;
