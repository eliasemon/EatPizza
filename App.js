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
  const [addToCard , setAddToCard] = useState({});
  const [totalItemCount , setTotalItemCount] = useState(0)
  const [productDetailsUiForAddToCard , setproductDetailsUiForAddToCard] = useState("")

  console.log(JSON.stringify(addToCard))

  const addToCardHandle = (key , data) => {
    const itemCount = Number(data.itemCount)
    setTotalItemCount(totalItemCount + itemCount)
    if(addToCard[key]){ 
      setAddToCard((prv)=>{
        prv[key].itemCount = Number(prv[key].itemCount) + itemCount
        return {...prv} 
      })
    }else{
      setAddToCard((prv)=>{
        prv[key] = data
        return {...prv} 
      })
    }
    setproductDetailsUiForAddToCard("")
  }

  const pdUIAddToCardHandle = (item) => {

    const disCard = () =>{
      setproductDetailsUiForAddToCard("")
    }
    setproductDetailsUiForAddToCard(
      <Modal 
      animationType="fade"
      // transparent={true}
      onRequestClose={() => {
        setproductDetailsUiForAddToCard("")
      }}
      visible={true}
      >
        <ProductDetailsScreen addToCardHandle={addToCardHandle} disCard={disCard} addToCard={addToCard}  setAddToCard={setAddToCard}  item={item}/>
      </Modal>

    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#0D0D0D" barStyle="light-content" />
      <Background />
      <View style={styles.container}>
        
        <NavigationContainer theme={MyTheme}>
        {productDetailsUiForAddToCard && (productDetailsUiForAddToCard) }

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
            <Stack.Screen name="Home">
                {() => <Home pdUIAddToCardHandle={pdUIAddToCardHandle} />}
            </Stack.Screen>
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Shipping" component={Shipping} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="ThankYou" component={ThankYou} />

            <Stack.Screen name="Checkout">
                {() => <Checkout setTotalItemCount={setTotalItemCount} addToCard={addToCard}  setAddToCard={setAddToCard} />}
            </Stack.Screen>

            <Stack.Screen name="FilteredProduct">
                {() => <FilteredProduct pdUIAddToCardHandle={pdUIAddToCardHandle} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileOrders" component={ProfileOrders} />
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
            <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
            <Stack.Screen name="ConfirmUploadPhoto" component={ConfirmUploadPhoto} />
          </Stack.Navigator>
          {isLogged && <NavBar totalItemCount={totalItemCount} />}
          
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
