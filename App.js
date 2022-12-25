import { View, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Background from "./components/Background";
import BackgroundContainer from "./components/NavBar";
import Home from "./screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from "./screens/Notification";
import NavBar from "./components/NavBar";

const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    background: 'rgba(255, 255, 255, 0)',
  },
};

const App = () => {
  return (
    <View>
      <NavBar/>
      <Background />
      <View style={styles.container}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notification" component={Notification} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30
  }
})

export default App;
