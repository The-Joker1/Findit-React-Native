import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/API/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Alert.alert('Success', 'Login successful!');
      console.log('Login successful:', data);
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
      setErrors({ email: !email ? 'Email is required' : undefined, password: !password ? 'Password is required' : undefined });
      return;
    }

    loginMutation.mutate({ email: email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre mot de passe"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Se connecter</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
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
});
