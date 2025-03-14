import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartScreen from '../screens/CartScreen';
import { customTheme } from '../themes/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: customTheme.colors.primary },
          headerTintColor: customTheme.colors.text, 
          headerTitleStyle: { fontWeight: 'bold' }, 
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
