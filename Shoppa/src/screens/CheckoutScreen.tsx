import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, Pressable, Modal } from 'react-native';
import { Props } from '../navigation/props';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutScreenParams {
  cartItems: CheckoutItem[];
  totalAmount?: string;
}

const CheckoutScreen: React.FC<Props> = ({ route, navigation }) => {
  const { cartItems, totalAmount } = route.params as CheckoutScreenParams;
  
  // Compute grand total if not provided
  const computedTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const grandTotal = totalAmount || computedTotal;

  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: CheckoutItem }) => (
    <View style={styles.card}>
      <View style={styles.productNameContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.productPriceContainer}>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.productQuantityContainer}>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.productTotalPriceContainer}>
        <Text style={styles.totalPrice}>
          Total: ${parseFloat((item.price * item.quantity).toFixed(2))}
        </Text>
      </View>
    </View>
  );

  const handleCheckoutItems = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    // Navigate to Home with an empty cart.
    navigation.navigate('Home', { cart: {} });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
      <Text style={styles.header}>Order Summary</Text>
      {cartItems && cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Grand Total: ${grandTotal}</Text>
          </View>
          <View style={styles.checkoutItemsContainer}>
            <Pressable style={styles.checkoutItemsButton} onPress={handleCheckoutItems}>
              <Text style={styles.buttonText}>Checkout Items</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>No items in your order.</Text>
      )}

      {/* Custom Modal for Checkout Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Checkout Successful!</Text>
            <Text style={styles.modalMessage}>
              Your order has been placed successfully!
            </Text>
            <Pressable style={styles.modalButton} onPress={handleOk}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#2575fc',
    borderRadius: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkblue',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
    width: '100%',
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    width: '100%',
  },
  productNameContainer: {
    marginBottom: 10,
  },
  productPriceContainer: {
    marginBottom: 10,
  },
  productQuantityContainer: {
    marginBottom: 10,
  },
  productTotalPriceContainer: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
  },
  totalPrice: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#6a11cb',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  totalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkoutItemsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  checkoutItemsButton: {
    padding: 15,
    backgroundColor: '#2575fc',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#2575fc',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
