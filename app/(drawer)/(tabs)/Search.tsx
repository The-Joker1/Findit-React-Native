import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../../../components/SearchBar';
import { SearchQuery } from '../../services/API/search';
import ResultsGrid from '../../../components/ResultsGrid';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => SearchQuery(searchQuery),
    enabled: triggerSearch && searchQuery.length > 0,
  });

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setTriggerSearch(true);
    refetch();
  };

  return (
    <View style={styles.container}>
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading || isFetching ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : error ? (
        <Text style={styles.error}>Erreur : {error.message}</Text>
      ) : data && data.results && data.results.length > 0 ? (
        <ResultsGrid results={data.results} query={searchQuery} />
      ) : (
        <Text style={styles.placeholder}>Aucun résultat trouvé. Essayez une autre recherche.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  placeholder: {
    marginTop: 30,
    textAlign: 'center',
    color: '#999',
  },
});
