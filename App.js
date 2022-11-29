import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Everythings Working well!</Text>
      <StatusBar style="auto" />
      <TextInput
      label="Label"
      leading={props => <Icon name="account" {...props} />}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App
