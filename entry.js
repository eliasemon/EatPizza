import "expo/build/Expo.fx";
import { Platform } from "react-native";
import { registerRootComponent } from "expo";
import { activateKeepAwake } from "expo-keep-awake";
import { createRoot } from "react-dom/client";
import App from "./App"; /* CHANGE THE PATH BASED ON WHERE YOURS IS LOCATED */
import { StoreProvider } from 'easy-peasy';
import { store } from "./globalState/store";
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = () => {
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyDv-e-HYg7o3wo5gJ5d12g4dXpleg_R-IE",
      authDomain: "eliasemondevs.firebaseapp.com",
      projectId: "eliasemondevs",
      storageBucket: "eliasemondevs.appspot.com",
      messagingSenderId: "327352270248",
      appId: "1:327352270248:web:1b2f927660b3d61f0f719d",
      measurementId: "G-EDQB4BS2XB"
    });

    initializeAuth(firebaseApp , {
      persistence: getReactNativePersistence(AsyncStorage)
    })
    return (
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    )
}
if (__DEV__) {
  activateKeepAwake();
}

if (Platform.OS === "web") {
  const root = createRoot(
    document.getElementById("root") ?? document.getElementById("main")
  );
  root.render(<Main />);
} else {
  registerRootComponent(Main);
}