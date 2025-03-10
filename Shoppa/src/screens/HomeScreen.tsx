import React, { useContext, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import { GlobalContext } from '../context/globalContext';
import ProductCard from '../components/productCard';
import { products } from '../data/products';


const HomeScreen = ({ navigation }) => {
  const globalContext = useContext(GlobalContext);
    if (!globalContext) {
      throw new Error("GlobalContext must be used within a GlobalProvider");
    }

  const { addToCart, cartCount } = globalContext; // cartCount from context

  // State for modal visibility and selected product details
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const opacityAnim = useRef(new Animated.Value(0)).current;

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    opacityAnim.setValue(0);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedProduct(null);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => showProductDetails(item)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <ProductCard item={item} onAddToCart={addToCart} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Sticky Footer */}
      <View style={styles.footer}>
        {cartCount > 0 ? (
          <Pressable
            onPress={() => navigation.navigate('Cart')}
            style={({ pressed }) => [
              styles.cartButton,
              pressed && styles.cartButtonPressed,
            ]}
          >
            <Text style={styles.cartButtonText}>
              Go to Cart ({cartCount})
            </Text>
          </Pressable>
        ) : (
          <Text style={styles.emptyMessageText}>Your cart is empty</Text>
        )}
      </View>

      {/* Modal for Product Details */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.modalContainer}>
          <Animated.View style={[modalStyles.modalContent, { opacity: opacityAnim }]}>
            <ScrollView contentContainerStyle={modalStyles.modalScrollContent}>
              {selectedProduct && (
                <>
                  <Text style={modalStyles.modalTitle}>
                    {selectedProduct.name}
                  </Text>
                  <Image
                    source={{ uri: selectedProduct.image }}
                    style={modalStyles.modalImage}
                  />
                  <Text style={modalStyles.modalDescription}>
                    {selectedProduct.description}
                  </Text>
                </>
              )}
            </ScrollView>
            <View style={modalStyles.stickyContainer}>
              <View style={modalStyles.priceContainer}>
                {selectedProduct && (
                  <Text style={modalStyles.modalPrice}>
                    ${selectedProduct.price.toFixed(2)}
                  </Text>
                )}
              </View>
              <Pressable
                style={({ pressed }) => [
                  modalStyles.closeButton,
                  pressed && modalStyles.closeButtonPressed,
                ]}
                onPress={closeModal}
              >
                <Text style={modalStyles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  list: {
    paddingVertical: 20,
    paddingBottom: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1C1C1C',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#6A0DAD',
  },
  cartButton: {
    width: '100%',
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#E03D00',
  },
  cartButtonText: {
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

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: 600,
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6A0DAD',
    overflow: 'hidden',
  },
  modalScrollContent: {
    paddingBottom: 100,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  priceContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: '100%',
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#E03D00',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
