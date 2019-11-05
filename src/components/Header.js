import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';

const Header = ({navigation}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{navigation.state.routeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: iOSColors.blue,
    justifyContent: 'center',
  },
  headerText: {
    ...robotoWeights.thin,
    color: iOSColors.white,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default Header;
