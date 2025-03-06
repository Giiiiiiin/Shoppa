import { StyleSheet, Text, SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { styles } from './src/styles/globalStyles';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <AppNavigator />
      <Text>Open up App.tsx to start working on your app!</Text>
    </SafeAreaView>
  );
};
