import { useState } from "react";
import { View, Image, StyleSheet , ActivityIndicator } from "react-native";
import { Button} from "../Buttons";
import InputText from "../TextInput";
import logo from "../../assets/images/logo.png";
import { SignupStyle as styles } from "../../styles";
import { COLORS  } from "../../constants/theme";




const Signup = ({nameSubmitions , loading}) => {
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

      <Button style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 80,
          alignSelf: 'center',
          borderRadius: 10
        }} disabled={loading} onPress={handlePress}>
        {loading ? <ActivityIndicator color="#fff" /> : "Submit"}
      </Button>
    </View>
  );
};


export default Signup;
