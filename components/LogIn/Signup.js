import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NextButton } from "../Buttons";
import InputText from "../TextInput";
import logo from "../../assets/images/logo.png";
import { SignupStyle as styles } from "../../styles";



const Signup = ({nameSubmitions}) => {
  const [fullName , setFullName] = useState ("")


  const handlePress = () => {
    nameSubmitions(fullName)
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <InputText 
        fullName ={fullName}
        setFullName= {setFullName}
      />
      <NextButton onPress={handlePress} title="Submit" />
    </View>
  );
};


export default Signup;
