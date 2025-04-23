import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';  // Importer useRouter

const TrustBadge = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{icon} {text}</Text>
  </View>
);

const HeroContent = () => {
  const router = useRouter(); // Initialiser useRouter

  // Fonction pour naviguer vers la page Search
  const navigateToSearch = () => {
    router.push('/(tabs)/Search'); // Naviguer vers la page Search.tsx
  };

  // Fonction pour naviguer vers la page Login
  const navigateToLogin = () => {
    router.push('/(pages)/Login'); // Naviguer vers la page Login.tsx
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroBox}>
        <Text style={styles.title}>Findit!</Text>
        <Text style={styles.subtitle}>Your Ultimate Price Comparison & Deal Hunter</Text>
        <Text style={styles.description}>
          Looking for the best deals? Compare prices across multiple sites and get
          real-time price drop alerts. Start shopping smarter today!
        </Text>

        {/* Bouton Explore Deals */}
        <TouchableOpacity style={styles.button} onPress={navigateToSearch}>
          <Text style={styles.buttonText}>🔍 Explore Deals Now</Text>
        </TouchableOpacity>

        {/* Nouveau bouton Login */}
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>🔑 Login</Text>
        </TouchableOpacity>

        <View style={styles.badgeContainer}>
          <TrustBadge icon="⚡" text="Fast Comparison" />
          <TrustBadge icon="🔔" text="Price Alerts" />
          <TrustBadge icon="💰" text="Save Money" />
        </View>

        <Text style={styles.testimonial}>
          "Findit! helped me save 30% on my last purchase! Highly recommend." - Alex D.
        </Text>

        <View style={styles.partnerLogos}>
          <Image source={require('../assets/images/amazon-logo.png')} style={styles.logo} />
          <Image source={require('../assets/images/ebay-logo.jpg')} style={styles.logo} />
          <Image source={require('../assets/images/walmart-logo.png')} style={styles.logo} />
          <Text>and a lot more!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9fafb',
  },
  heroBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,  // Réduit la taille de la police
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,  // Réduit la taille de la police
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,  // Taille de texte plus petite pour une meilleure lisibilité sur mobile
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 15, // Réduit l'espace entre les boutons
  },
  loginButton: {
    marginBottom: 20,  // Réduit l'espace entre le bouton "Login" et le reste du contenu
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,  // Réduit la taille du texte sur les boutons
    fontWeight: '600',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  badge: {
    backgroundColor: '#e0f2fe',
    padding: 8,
    borderRadius: 12,
    margin: 5,
  },
  badgeText: {
    fontSize: 12,  // Réduit la taille du texte dans les badges
    color: '#1e3a8a',
  },
  testimonial: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#374151',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 14,  // Ajuste la taille du texte pour qu'il soit plus lisible
  },
  partnerLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  logo: {
    height: 28,  // Ajuste la taille des logos pour les petits écrans
    width: 70,  // Ajuste la largeur des logos
    resizeMode: 'contain',
  },
});

export default HeroContent;
