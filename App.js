import { View, StyleSheet, SafeAreaView, StatusBar , Modal } from "react-native";
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
import Profile from "./screens/Profile";
import ProfileOrders from "./screens/ProfileOrders";
import ProfileUpdate from "./screens/ProfileUpdate";
import UploadPhoto from "./screens/UploadPhoto";
import ConfirmUploadPhoto from "./screens/ConfirmUploadPhoto";
import Loading from "./screens/Loading";
import Ready from "./screens/Ready";
import Login from "./screens/Login";
import { useState } from "react";

import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import FilteredProduct from "./screens/FilteredProduct";



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
  const [productDetailsUiForAddToCard , setproductDetailsUiForAddToCard] = useState("")

  console.log(JSON.stringify(addToCard))

  const addToCardHandle = (key , data) => {
    if(addToCard[key]){ 
      setAddToCard((prv)=>{
        prv[key].itemCount = prv[key].itemCount + 1
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
                {() => <Checkout addToCard={addToCard}  setAddToCard={setAddToCard} />}
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
          {isLogged && <NavBar />}
          
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
