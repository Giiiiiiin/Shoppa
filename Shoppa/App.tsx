
import { SafeAreaView } from 'react-native';
import { styles } from './src/styles/globalStyles';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
}
