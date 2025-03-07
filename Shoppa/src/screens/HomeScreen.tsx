import React, { useState } from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, FlatList, View } from 'react-native';
import { Props } from '../navigation/props';

const products = [
    { id: '1', name: 'Apple', price: 1 },
    { id: '2', name: 'Banana', price: 0.5 },
    { id: '3', name: 'Orange', price: 0.8 },
    { id: '4', name: 'Grapes', price: 2 },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    const addToCart = (id: string) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: (prevCart[id] || 0) + 1,
        }));
    };

    const cartCount = Object.values(cart).reduce((acc, curr) => acc + curr, 0);

    const renderItem = ({ item }: { item: { id: string; name: string; price: number } }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Pressable style={styles.button} onPress={() => addToCart(item.id)}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Pressable
                style={[styles.goToCartButton, cartCount === 0 ? styles.disabledButton : styles.activeButton]}
                onPress={() => navigation.navigate('Cart', { cart })}
                disabled={cartCount === 0}
            >
                <Text style={styles.buttonText}>Go to Cart ({cartCount})</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 20,
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    button: {
        padding: 10,
        backgroundColor: '#6a11cb',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    goToCartButton: {
        padding: 15,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: 'green',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default HomeScreen;
