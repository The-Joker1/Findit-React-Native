import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/API/auth';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // Store the token and userId securely
      await SecureStore.setItemAsync('token', data.token);
      await SecureStore.setItemAsync('userId', data.userId);

      Alert.alert('Success', 'Login successful!');
      router.replace('/');
      // You can also navigate to the main page here
      // or update your authentication context
    },
    onError: (error) => {
      if (error instanceof Error) {
        setErrors({ password: error.message });
      }
    },
  });

  const handleSubmit = () => {
    setErrors({});

    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      });
      return;
    }

    loginMutation.mutate({ email: email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      
      {/* Register Button */}
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => router.push('/(pages)/Register')}
      >
        <Text style={styles.linkText}>No account yet? Create one</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: '#e11d48',
    marginTop: 6,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
