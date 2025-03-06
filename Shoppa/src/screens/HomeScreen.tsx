import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Props } from '../navigation/props';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Sscreen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
            <Button title="Go to Checkout" onPress={() => navigation.navigate('Checkout')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;
