import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const TrustBadge = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{icon} {text}</Text>
  </View>
);

const HeroContent = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroBox}>
        <Text style={styles.title}>Findit!</Text>
        <Text style={styles.subtitle}>Your Ultimate Price Comparison & Deal Hunter</Text>
        <Text style={styles.description}>
          Looking for the best deals? Compare prices across multiple sites and get
          real-time price drop alerts. Start shopping smarter today!
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🔍 Explore Deals Now</Text>
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
    padding: 20,
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
    fontSize: 36,
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
    padding: 10,
    borderRadius: 12,
    margin: 5,
  },
  badgeText: {
    fontSize: 14,
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
    height: 32,
    width: 80,
    resizeMode: 'contain',
  },
});

export default HeroContent;
