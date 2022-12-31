import { View, Image, Text, StyleSheet } from "react-native";
import { NextButton } from "./../components/Buttons";
import foods from "../assets/images/foods.png";
import { styles } from "../styles/Ready.style";


const Ready = ({ navigation }) => {

  // onClick this button change screen to Login screen
  const handlePress = () => {
    navigation.navigate('Login')
  };

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


export default Ready;
