import { View, Image, StyleSheet } from "react-native";
import logo from "../assets/images/logo.png";

const Loading = ({ navigation }) => {

  //dummy functionally to change screen after 2 second
  setTimeout(() => {
    navigation.navigate('Ready')
  }, 2000)

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  image: {
    width: 162,
    height: 202,
  },
});

export default Loading;
