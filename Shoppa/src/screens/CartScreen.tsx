import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { GlobalContext } from '../context/globalContext';

const CartScreen = ({ navigation }) => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) return null;

  const { cart, addToCart, removeFromCart } = globalContext;

  // Update quantity: if change is negative and quantity is 1, remove the item.
  const updateQuantity = (item, change) => {
    if (change < 0) {
      if (item.quantity === 1) {
        removeFromCart(item.id);
      } else {
        // Decrease quantity by 1
        addToCart({ ...item, quantity: change });
      }
    } else {
      // Increase quantity by 1
      addToCart({ ...item, quantity: change });
    }
  };

  // Calculate total for each product
  const calculateItemTotal = (item) => item.price * item.quantity;

  // Calculate grand total
  const grandTotal = cart
    .reduce((total, item) => total + calculateItemTotal(item), 0)
    .toFixed(2);

  // Render each cart item with image on left
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.quantityButtonPressed,
            ]}
            onPress={() => updateQuantity(item, -1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.quantityButtonPressed,
            ]}
            onPress={() => updateQuantity(item, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.itemTotal}>
          Total: ${calculateItemTotal(item).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Sticky Footer */}
      <View style={styles.footer}>
        {cart.length > 0 ? (
          <Pressable
            style={({ pressed }) => [
              styles.checkoutButton,
              pressed && styles.checkoutButtonPressed,
            ]}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutButtonText}>
              Proceed to Checkout (${grandTotal})
            </Text>
          </Pressable>
        ) : (
          <Text style={styles.emptyMessageText}>Your cart is empty</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dominant color (60%)
    padding: 10,
  },
  list: {
    paddingBottom: 120, // Extra padding so the list isn't hidden by the footer
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#FF4500', // Accent color (10%)
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#E03D00',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTotal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#6A0DAD', // Thin purple line (secondary color)
    alignItems: 'center',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#FF4500', // Accent color (10%)
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#E03D00',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;
