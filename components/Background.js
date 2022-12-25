import { Image, View, StyleSheet } from "react-native";
import background from "../assets/images/background.png";
// import Loading from "./../screens/Loading";

const Background = () => {
  return (
    <View style={styles.container}>
      <Image source={background} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: "100%",
  },
});
export default Background;
