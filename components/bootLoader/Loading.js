import { View, Image, StyleSheet } from "react-native";
import logo from "../../assets/images/logo.png";

import { LoadingStyle as styles } from '../../styles'
import Background from "../Background";

const Loading = () => {
  


  return (
    <View style={styles.container}>
            
      <Image source={logo} style={styles.image} />
      <Background />
    </View>
  );
};



export default Loading;
