import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

type ModalScreenProps = {
  title?: string;
};

export default function ModalScreen({ title = "Terms of service" }: ModalScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Text style={styles.welcomeText}>
          Welcome to Findit! These Terms of Service outline the rules and regulations
          for the use of our website and services. By accessing our platform, you
          agree to comply with these terms.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By using Findit!, you agree to these Terms of Service and our Privacy
            Policy. If you do not agree to these terms, please do not use our
            services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Use of Services</Text>
          <Text style={styles.sectionText}>
            You must use our services in accordance with all applicable laws and
            regulations. You are responsible for your use of our platform and any
            content you provide.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.sectionText}>
            All content on Findit! is protected by intellectual property laws. You may
            not use, copy, or distribute our content without our prior written
            consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.sectionText}>
            Findit! is not liable for any direct, indirect, incidental, consequential,
            or punitive damages arising out of your use of our services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions about these Terms of Service, please contact us
            at terms@findit.com.
          </Text>
        </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    maxWidth: 800, // Pour les tablettes
    width: '100%',
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb', // blue-600
  },
  welcomeText: {
    color: '#4b5563', // gray-600
    marginBottom: 32,
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#1f2937', // gray-800
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionText: {
    color: '#4b5563', // gray-600
    fontSize: 16,
    marginBottom: 16,
  },
});