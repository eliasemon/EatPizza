import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Children } from "react";
import phone from "../assets/icons/phone.png";

export const NextButton = ({
  onPress,
  title,
  bgColor,
  radius,
  paddingX,
  paddingY,
}) => {
  return (
    <View style={{ width: '70%', alignSelf: 'center' }}>
      <TouchableOpacity
        onPress={onPress}
        style={
          styles({
            bgColor: bgColor,
            radius: radius,
            paddingX: paddingX,
            paddingY: paddingY,
          }).appButtonContainer
        }
      >
        <Text style={styles().appButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Button = (props) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={{
        fontSize: 18,
        color: '#fff',
        alignSelf: "center",
        textTransform: "uppercase",
      }}>{props.children}</Text>
    </TouchableOpacity>
  )
}

export const IconButton = ({ onPress, src, width, height }) => {
  return (
    <View style={{ width: "100%", marginBottom: 25 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "rgba(255,144,18,0.25)",
          width: 50,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={src} style={{ width: width, height: height }} />
        </View>
        {/* <Text style={styles().appButtonText}>NEXT CONTINUE</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = (...props) => {
  const { bgColor, radius, paddingX, paddingY } = props[0] ?? {};
  return StyleSheet.create({
    appButtonContainer: {
      elevation: 8,
      backgroundColor: bgColor ?? "#15BE77",
      borderRadius: radius ?? 5,
      paddingHorizontal: paddingX ?? 65,
      paddingVertical: paddingY ?? 25,
    },
    appButtonText: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    iconButtonContainer: {
      backgroundColor: "red",
      width: 50,
      height: 50,
    },
  });
};
