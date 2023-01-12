import { View, Image, Text, StyleSheet } from "react-native";
// import { NextButton } from "./../components/Buttons";
import foods from "../../assets/images/foods.png";
import { NextButton } from "../Buttons";
import { ReadyStyle as styles } from "../../styles";
import { action } from "easy-peasy";
// NextButton

const Ready = () => {
  const LoadingChanger =   useStoreActions(action => action.LoadingChanger)
  // onClick this button change screen to Login screen
  const handlePress = () => {
    LoadingChanger({status : true , type : "LoginUI"})
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
