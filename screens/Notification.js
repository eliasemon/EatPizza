import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Heading from '../components/Heading'
import BackgroundContainer from "../components/NavBar";
import { NotificationStyle as styles } from '../styles'
import { GlobalStyle } from "../styles"


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

const Notification = () => {
  return (
      <ScrollView>
      <Heading title="Notification" />
      <View style={GlobalStyle.sidePadding}>
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


export default Notification;
