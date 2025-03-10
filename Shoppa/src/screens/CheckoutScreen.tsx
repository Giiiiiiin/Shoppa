import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Pressable, 
  Image, 
  Alert 
} from 'react-native';
import { GlobalContext } from '../context/globalContext';

const CheckoutScreen = ({ navigation }) => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) return null;

  const { cart, clearCart } = globalContext;

  // Calculate each item's total and the grand total
  const calculateItemTotal = (item) => item.price * item.quantity;
  const grandTotal = cart
    .reduce((total, item) => total + calculateItemTotal(item), 0)
    .toFixed(2);

  // Handle the checkout action
  const handleCheckout = () => {
    Alert.alert(
      "Checkout Successful!",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Render each cart item with an image on the left and info on the right
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
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

      {/* Sticky bottom container */}
      <View style={styles.stickyContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.grandTotalText}>Grand Total: ${grandTotal}</Text>
        </View>
        <Pressable 
          style={({ pressed }) => [
            styles.checkoutButton,
            pressed && styles.checkoutButtonPressed,
          ]}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Pressable>
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
    paddingBottom: 140, // Extra space for sticky container
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
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500', // Orange text for item total
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#1C1C1C',
  },
  totalContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#FF4500',
    paddingVertical: 15,
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
    fontSize: 18,
  },
});

export default CheckoutScreen;
