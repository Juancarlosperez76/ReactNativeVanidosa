import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, Text, StyleSheet } from 'react-native';

const PreloadAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // Simula una solicitud a una API o carga de datos asincrónica
    setTimeout(() => {
      const fetchedData = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
      setData(fetchedData);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default PreloadAnimation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});