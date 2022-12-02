import { View, Image, Text, StyleSheet } from "react-native";
import { NextButton } from "./../components/Buttons";
import foods from "../assets/images/foods.png";

const handlePress = (event) => {
  console.log("Button Clicked");
};

const Ready = () => {
  return (
    <View style={styles.container}>
      <Image source={foods} style={styles.image} />
      <Text style={styles.largeText}>
        Eat Pizza is Where Your Comfort Food Lives
      </Text>
      <Text style={styles.smallText}>
        Enjoy a fast and smooth food delivery at your doorstep
      </Text>
      <NextButton onPress={handlePress} title="Next" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    justifyContent: "space-evenly",
  },
  largeText: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },
  smallText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 380,
    height: 380,
  },
});

export default Ready;
