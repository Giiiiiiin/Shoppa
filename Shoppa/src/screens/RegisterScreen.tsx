import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Props } from '../navigation/props';
import { Ionicons } from "@expo/vector-icons";

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleRegister = async () => {
        // Log the data when Register button is pressed
        console.log('Register button pressed');
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Username"
                onChangeText={setUsername} placeholderTextColor="white" />
            {/* Password Input with Eye Icon */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    onChangeText={setPassword}
                    placeholderTextColor="white"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                </TouchableOpacity>
            </View>
            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#2C3E50"
    },
    input: {
        width: "100%",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 20,
        fontSize: 16,
        color: "white"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: "#F7B733",
        minWidth: "30%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 20,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "white"
    },
});