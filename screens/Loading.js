import { View, Image, StyleSheet } from "react-native";
import logo from "../assets/images/logo.png";
import { LoadingStyle as styles } from '../styles'

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



export default Loading;
