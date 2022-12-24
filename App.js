import { View, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Background from "./components/Background";
import Home from "./screens/Home";

const App = () => {
  return (
    <>
      <Background />
      <View style={styles.container}>
        <Home />
    </View>
    </>
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
