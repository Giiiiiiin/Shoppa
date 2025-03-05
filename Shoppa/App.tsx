import { Text, View, Image, ScrollView, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './src/styles/globalStyles';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <AppNavigator />
    </SafeAreaView>
    // <View style={styles.container}>
    //   {/* <View style={styles.imageContainer}>
    //     <Image
    //       source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    //       style={styles.image}
    //     />
    //     <Image
    //       source={require('../assets/favicon.png')}
    //       style={styles.image}
    //     />
    //     <Text>Open up App.tsx to start working on your app!</Text>
    //   </View> */}
    // </View>

    // <ScrollView showsVerticalScrollIndicator={false}>
    //   {[...Array(50)].map((_, i) => (
    //     <Text key={i} style={{ fontSize: 18 }}>Scrollable content {i + 1}</Text>
    //   ))}
    // </ScrollView>
  );
}