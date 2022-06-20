import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
// import LoginButton from './components/LoginButton';
const image = require('./assets/backgroundCover.jpg');

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode="cover" source={image}>
        {/* <Text style={styles.text}>vaTerra</Text> */}
        {/* <LoginButton style={styles.loginbutton} /> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
});
