import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const router = useRouter();
  
  const navigateToSearch = () => {
    router.push('/Search');
  };

  const navigateToLogin = () => {
    router.push('/(pages)/Login');
  };

  const TrustBadge = ({ icon, text }: { icon: string; text: string }) => (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{icon} {text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Findit!</Text>
          <Text style={styles.subtitle}>Compare. Track. Save.</Text>
        </View>

        {/* CTA Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={navigateToSearch}>
            <Text style={styles.buttonText}>🔍 Explore Deals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>🔑 Login</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Findit! lets you compare prices across your favorite stores and receive real-time price drop alerts. 
          Save money and shop smarter today.
        </Text>

        {/* Trust Badges */}
        <View style={styles.badgeContainer}>
          <TrustBadge icon="⚡" text="Fast Comparison" />
          <TrustBadge icon="🔔" text="Price Alerts" />
          <TrustBadge icon="💰" text="Save Money" />
        </View>

        {/* Testimonial */}
        <Text style={styles.testimonial}>
          "Findit! helped me save 30% on my last purchase! Highly recommend." - Alex D.
        </Text>

        {/* Partner Logos */}
        <View style={styles.partnerSection}>
          <Image source={require('../../../assets/images/amazon-logo.png')} style={styles.logo} />
          <Image source={require('../../../assets/images/ebay-logo.jpg')} style={styles.logo} />
          <Image source={require('../../../assets/images/walmart-logo.png')} style={styles.logo} />
          <Text style={styles.morePartners}>and many more...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginTop: 6,
  },
  actions: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 999,
    marginBottom: 12,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 500,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  badge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 5,
  },
  badgeText: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '500',
  },
  testimonial: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    fontStyle: 'italic',
    color: '#374151',
    textAlign: 'center',
    maxWidth: 500,
    marginBottom: 20,
  },
  partnerSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
  },
  logo: {
    height: 28,
    width: 70,
    resizeMode: 'contain',
    marginHorizontal: 6,
  },
  morePartners: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 10,
  },
});

export default HomeScreen;
