import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, Pressable } from 'react-native';
import { Props } from '../navigation/props';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CartScreen: React.FC<Props> = ({ route, navigation }) => {
    const { cart, setCart } = route.params as { cart: { [key: string]: number }; setCart: (cart: { [key: string]: number }) => void };
    const [cartItems, setCartItems] = useState<CartItem[]>(
        Object.keys(cart).map((id) => {
            const product = products.find((p) => p.id === id);
            return {
                id,
                name: product?.name || 'Unknown',
                price: product?.price || 0,
                quantity: cart[id],
            };
        })
    );

    const updateQuantity = (id: string, change: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                const newQuantity = Math.max(0, item.quantity + change);
                return item.id === id ? { ...item, quantity: newQuantity } : item;
            })
        );

        const updatedCart = { ...cart };
        updatedCart[id] = Math.max(0, cart[id] + change);
        if (updatedCart[id] === 0) {
            delete updatedCart[id];
        }
        setCart(updatedCart);
    };

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.card}>
            <View style={styles.productNameContainer}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.productPriceContainer}>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <View style={styles.productQuantityContainer}>
                <Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
            <View style={styles.productTotalPriceContainer}>
                <Text style={styles.totalPrice}>Total: ${parseFloat((item.price * item.quantity).toFixed(2))}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>{'Remove Items'}</Text>
            </Pressable>
            <Text style={styles.header}>Cart Items</Text>
            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems.filter((item) => item.quantity > 0)}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total Amount: ${calculateTotalAmount()}</Text>
                        <Pressable style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout', { cartItems })}>
                            <Text style={styles.buttonText}>Checkout</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text style={styles.emptyCart}>Your cart is empty</Text>
            )}
        </SafeAreaView>
    );
};

const products = [
    { id: '1', name: 'Apple', price: 1 },
    { id: '2', name: 'Banana', price: 0.5 },
    { id: '3', name: 'Orange', price: 0.8 },
    { id: '4', name: 'Grapes', price: 2 },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'lightyellow',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 10,
        backgroundColor: '#2575fc',
        borderRadius: 10,
        marginBottom: 10,
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
    },
    card: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        elevation: 3,
    },
    productNameContainer: {
        marginBottom: 10,
    },
    productPriceContainer: {
        marginBottom: 10,
    },
    productQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productTotalPriceContainer: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
    },
    totalContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#6a11cb',
        borderRadius: 10,
        alignItems: 'center',
    },
    totalText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    checkoutButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2575fc',
        borderRadius: 10,
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
        marginHorizontal: 10,
    },
    quantityButton: {
        padding: 10,
        backgroundColor: '#6a11cb',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    totalPrice: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyCart: {
        fontSize: 18,
        color: '#888',
    },
});

export default CartScreen;
