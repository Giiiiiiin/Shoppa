import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const ProductCard = ({ item, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Pressable style={styles.button} onPress={() => onAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C', // Dark shade for card background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC', // Light gray text
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF4500', // Accent color (red)
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});

export default ProductCard;
