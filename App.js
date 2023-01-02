import { View, StyleSheet, SafeAreaView, StatusBar , Modal } from "react-native";
import { useState } from "react";
import "react-native-gesture-handler";
import { Background } from "./components";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from "./components/NavBar";

import {
  Checkout,
  ConfirmUploadPhoto,
  FilteredProduct,
  Home,
  Loading,
  Login,
  Notification,
  Otp,
  Payment,
  ProductDetailsScreen,
  Profile,
  ProfileOrders,
  ProfileUpdate,
  Ready,
  Signup,
  Shipping,
  ThankYou,
  UploadPhoto
} from './screens'



const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    background: 'rgba(255, 255, 255, 0)',
  },
};

const App = () => {

  // state for checking Login Status
  const [isLogged, setIsLogged] = useState(false)


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0D0D0D" barStyle="light-content" />
      <Background />
      
        <View style={styles.container}>
          
          <NavigationContainer theme={MyTheme}>
          {/* {productDetailsUiForAddToCard && (productDetailsUiForAddToCard) } */}

            <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="Loading" component={Loading} />
              <Stack.Screen name="Ready" component={Ready} />
              {/* <Stack.Screen name="Login" component={Login} initialParams={{
                title: 'My App',
                description: 'This is my app'
              }} /> */}
              <Stack.Screen name="Login">
                {() => <Login setIsLogged={setIsLogged} />}
              </Stack.Screen>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="Shipping" component={Shipping} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="ThankYou" component={ThankYou} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="FilteredProduct" component={FilteredProduct} />
              <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="ProfileOrders" component={ProfileOrders} />
              <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
              <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
              <Stack.Screen name="ConfirmUploadPhoto" component={ConfirmUploadPhoto} />
            </Stack.Navigator>
            {isLogged && <NavBar/>}
            
          </NavigationContainer>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
})

export default App;
