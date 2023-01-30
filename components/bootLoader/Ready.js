import { View, Image, Text, StyleSheet } from "react-native";
// import { NextButton } from "./../components/Buttons";
import foods from "../../assets/images/foods.png";
import { Button, NextButton } from "../Buttons";
import { ReadyStyle as styles } from "../../styles";
import { useStoreActions } from "easy-peasy";
import { COLORS } from "../../constants/theme";

// NextButton

const Ready = ({setFirstAttemp}) => {
  const LoadingChanger =   useStoreActions(action => action.LoadingChanger)
  // onClick this button change screen to Login screen
  const handlePress = () => {
    LoadingChanger({status : true , type : "LoginUI"})
    setFirstAttemp(false)
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
      <Button style={
        {
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 80,
          alignSelf: 'center',
          borderRadius: 10
        }
      } onPress={handlePress}>Next</Button>
      {/* <NextButton onPress={handlePress} title="Next" /> */}
    </View>
  );
};


export default Ready;
