import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { toggleFavorite } from '../services/API/favorites'; 

type Product = {
    id : string;
    seller: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
  thumbnail: string;
  delivery: string;
  
};

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();

  const product: Product = {
    id: params.product_id as string,
    seller: params.seller as string,
    title: params.title as string,
    price: params.price as string,
    rating: params.rating as string,
    reviews: params.reviews as string,
    thumbnail: params.thumbnail as string,
    delivery: params.delivery as string,
  };

  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await SecureStore.getItemAsync('userId');
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  const handleToggleFavorite = async () => {
    // console.log('Toggling favorite for product:', product);
    // console.log('User ID:', userId);
    // setUserId('cm92kkiyu0000qw6oieeerkp8'); // Simulate userId for testing
    // console.log('snapshotuserid:', userId);
    if (!userId || loading) return;

    setLoading(true);
    const result = await toggleFavorite(product, userId);
    if (result.success) {
      setIsFavorite((prev) => !prev);
    }
    setLoading(false);
  };

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <TouchableOpacity onPress={handleToggleFavorite} style={styles.heartIcon} disabled={loading}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Text style={styles.rating}>⭐ {product.rating} ({product.reviews} reviews)</Text>
      <Text style={styles.delivery}>Livraison: {product.delivery}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  price: {
    fontSize: 18,
    color: '#2d6a4f',
    marginTop: 8,
  },
  rating: {
    marginTop: 8,
    fontSize: 16,
  },
  delivery: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});
