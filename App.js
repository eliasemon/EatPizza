import { View } from "react-native";
import "react-native-gesture-handler";
import Background from "./components/Background";
import Otp from "./screens/Otp";

const App = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Background />
      <Otp />
    </View>
  );
};

export default App;
