import { StyleSheet, Text, SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { styles } from './src/styles/globalStyles';
import { GlobalProvider } from './src/context/globalContext';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <GlobalProvider>
          <AppNavigator />
        </GlobalProvider>
      </SafeAreaView>
      <FlashMessage position="bottom" /> 
    </>
  );
}