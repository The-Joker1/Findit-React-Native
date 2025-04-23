import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface SearchBarProps {
  query?: string;
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query = "", onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSubmit = () => {
    onSubmit(searchQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Text style={styles.iconText}>🔍</Text>
      </View>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for products..."
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>🔍 Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
  },
  iconText: {
    color: '#a0aec0',
  },
  input: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 24,
    marginRight: 8,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4299e1',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SearchBar;
