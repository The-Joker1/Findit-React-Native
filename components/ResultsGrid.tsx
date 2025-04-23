import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importation de useRouter

interface Result {
  position: number;
  product_id: string;
  title: string;
  link: string;
  product_link: string;
  seller: string;
  offers: string;
  extracted_offers: number;
  offers_link: string;
  price: string;
  extracted_price: number;
  rating: number;
  reviews: number;
  delivery: string;
  thumbnail: string;
}

interface ResultsGridProps {
  results: Result[];
  query: string;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, query }) => {
  const router = useRouter();

  return (
    <View style={styles.gridContainer}>
      {results.map((result) => (
        <View key={result.product_id} style={styles.resultItem}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/ProductDetailsScreen', 
                params: {
                    product_id: result.product_id,
                    seller: result.seller,
                  title: result.title,
                  price: result.price,
                  rating: result.rating.toString(),
                  reviews: result.reviews.toString(),
                  delivery: result.delivery,
                  thumbnail: result.thumbnail,
                },
              });
            }}
            style={styles.resultLink}
          >
            <Image source={{ uri: result.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{result.title}</Text>
            <Text style={styles.price}>{result.price} €</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {result.rating}</Text>
              <Text style={styles.reviews}>({result.reviews} reviews)</Text>
            </View>
            <Text style={styles.delivery}>{result.delivery}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resultItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  resultLink: {
    alignItems: 'center',
  },
  thumbnail: {
    width: '90%',
    height: 140,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d6a4f',
    marginTop: 6,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 14,
    color: '#ffd700',
  },
  reviews: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  delivery: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default ResultsGrid;
