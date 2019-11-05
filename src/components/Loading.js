import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {iOSColors} from 'react-native-typography';

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={iOSColors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
