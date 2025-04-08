// HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeroContent from '@/components/HeroContent';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <HeroContent />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default HomeScreen;
