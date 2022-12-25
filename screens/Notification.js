import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Heading from '../components/Heading'
import BackgroundContainer from "../components/NavBar";

const icons = {
  done: {
    keyword: "check-circle",
    color: "green"
  },
  warning: {
    keyword: "exclamation-circle",
    color: "yellow"
  },
  failed: {
    keyword: "times-circle",
    color: "red"
  }
}

const notifications = [
  {
    id: 0,
    message: "Your order has been taken by the driver",
    status: 'done',
    isRecently: true,
    time: '10.00 AM',
    date: '22 November 2022',
  },
  {
    id: 1,
    message: "Your desired food is unavailable now",
    status: 'warning',
    isRecently: false,
    time: '10.00 AM',
    date: '22 November 2022',
  },
  {
    id: 2,
    message: "Your order has been canceled",
    status: 'failed',
    isRecently: false,
    time: '10.00 AM',
    date: '22 November 2022',
  },
  {
    id: 3,
    message: "Your order has been taken by the driver",
    status: 'done',
    isRecently: true,
    time: '10.00 AM',
    date: '22 November 2022',
  },
  {
    id: 4,
    message: "Your desired food is unavailable now",
    status: 'warning',
    isRecently: false,
    time: '10.00 AM',
    date: '22 November 2022',
  },
  {
    id: 5,
    message: "Your order has been canceled",
    status: 'failed',
    isRecently: false,
    time: '10.00 AM',
    date: '22 November 2022',
  },
];

const Notification = ({navigation}) => {
  return (
      <ScrollView>
        <Heading navigation={navigation} title="Notification" />
        <View>
          {
            notifications.map((item) => (
              <View key={item.id} style={styles.card} >
                <View style={styles.statusBox}>
                  <FontAwesome name={icons[item.status].keyword} size={45} color={icons[item.status].color} />
                </View>
                <View style={styles.messageBox}>
                  <View><Text style={styles.message}>{item.message}</Text></View>
                  <View><Text style={styles.time}>{item.time}</Text></View>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 100,
    backgroundColor: '#333333',
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  statusBox: {
    width: '15%',
  },
  messageBox: {
    width: '80%',
    margin: 10
  },
  message: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 20
  },
  time: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 15
  }
});

export default Notification;
