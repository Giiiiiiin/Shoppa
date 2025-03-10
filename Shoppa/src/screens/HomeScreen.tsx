import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { GlobalContext } from '../context/globalContext';
import ProductCard from '../components/productCard';

const HomeScreen = () => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) return null;

  const { addToCart } = globalContext;

  const products = [
    {
      id: '1',
      name: 'Light Novel Title 1',
      description: 'An exciting adventure of heroism and magic.',
      image: 'https://picsum.photos/200/300',
      price: 9.99,
    },
    {
      id: '2',
      name: 'Light Novel Title 2',
      description: 'A tale of love and destiny across realms.',
      image: 'https://picsum.photos/id/237/200/300',
      price: 12.99,
    },
    // Add more products as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard item={item} onAddToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dominant color (60%)
  },
  list: {
    paddingVertical: 20,
  },
});

export default HomeScreen;
