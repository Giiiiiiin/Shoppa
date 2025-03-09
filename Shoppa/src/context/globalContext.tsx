import React, { createContext, useState, ReactNode } from 'react';

// Define the types for your global state
interface CartItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
}

interface GlobalContextType {
    cart: CartItem[]; 
    cartCount: number; 
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

// Create the context
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    // Compute cart count dynamically
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Function to add items to cart
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                return [...prevCart, item];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <GlobalContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
            {children}
        </GlobalContext.Provider>
    );
};
