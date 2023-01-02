import "expo/build/Expo.fx";
import { Platform } from "react-native";
import { registerRootComponent } from "expo";
import { activateKeepAwake } from "expo-keep-awake";
import { createRoot } from "react-dom/client";
import App from "./App"; /* CHANGE THE PATH BASED ON WHERE YOURS IS LOCATED */
import { StoreProvider } from 'easy-peasy';
import { store } from "./globalState/store";
const Main = () => {
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