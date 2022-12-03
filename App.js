import { View } from "react-native";
import "react-native-gesture-handler";
import Background from "./components/Background";
import Login from "./screens/Login";

const App = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Background />
      <Login />
    </View>
  );
};

export default App;
