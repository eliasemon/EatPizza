
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSpring, animated } from 'react-spring/native';


const dateStr = (ms) => {
  const newDate = new Date(ms)
  return newDate.toLocaleDateString()
}


const defaultProps = {
  contentHeight: "auto",
};

const CollapsibleCard = ({
  children,
  contentHeight,
  defaultCollapsed,
  style,
  Header,
  item,
  ...props
}) => {
  const [isCollapsed, setCollapsed] = useState(
    defaultCollapsed ? defaultCollapsed : true
  );

  const animationConfig = {
    height: isCollapsed ? 0 : contentHeight,
    progress: isCollapsed ? 0 : 100,
    rotation: isCollapsed ? `0deg` : `-180deg`,
    // config: config.stiff,
  };


  const animation = useSpring(animationConfig);
  const AnimatedView = animated(View);

  return (
    <View {...props} style={[styles.card, style]}>
      {/* Card Top */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setCollapsed(c => !c)}
        style={styles.cardTop}>
        <View>
          <Text style={styles.cardText}> OrderId : {item.id} </Text>
          <Text style={styles.cardText}> TotalAmmount : {item.TotalOrderAmmount} </Text>
        </View>
        <View>
          <Text style={styles.cardText}> CreationTime : {dateStr(item.creationTime)} </Text>
          <Text style={styles.cardText}> Status : {item.status} </Text>
        </View>
        <AnimatedView style={{ transform: [{ rotate: animation.rotation }] }}>
          {/* arrow button by condition  */}
        </AnimatedView>
      </TouchableOpacity>

      {/* Card Content */}
      <AnimatedView
        style={[
          styles.cardContent,
          {
            height: animation.height,
            borderTopWidth: animation.progress.interpolate({
              range: [0, 25, 50, 75, 100],
              output: [0, 0, 0, 0, 1],
            }),
            opacity: animation.progress.interpolate({
              range: [0, 85, 95, 100],
              output: [0, 0, 0.5, 1],
            }),
          },
        ]}>
        {/* Inner */}
        <AnimatedView
          style={{
            transform: [
              {
                translateY: animation.progress.interpolate({
                  range: [0, 85, 95, 100],
                  output: [7.5, 5, 2.5, 0],
                }),
              },
            ],
          }}>
          {children}
        </AnimatedView>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTop: {
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 8,
  },
  cardContent: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  cardText: {
    color: '#fff'
  }
});

CollapsibleCard.defaultProps = defaultProps;

export default CollapsibleCard;
