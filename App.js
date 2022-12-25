import { View, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Background from "./components/Background";
import Home from "./screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from "./screens/Notification";
import NavBar from "./components/NavBar";
import Checkout from "./screens/Checkout";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import ThankYou from "./screens/ThankYou";

const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    background: 'rgba(255, 255, 255, 0)',
  },
};

const App = () => {
  return (
    <View>
      <Background />
      <View style={styles.container}>
        <NavigationContainer theme={MyTheme}>
          <NavBar />
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="ThankYou" component={ThankYou} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Shipping" component={Shipping} />
            <Stack.Screen name="Payment" component={Payment} />
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
