import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const ProductCard = ({ item, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(item);
    showMessage({
      message: "+ Added to Cart!",
      type: "success",
      duration: 1000, // Duration in milliseconds
    });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.price}>
          ${item.price.toFixed(2)}
        </Text>
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 150,
    overflow: 'hidden', 
  },
  image: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#E03D00',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ProductCard;
