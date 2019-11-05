import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {iOSColors} from 'react-native-typography';

// Component
import Header from './components/Header';

import Login from './screens/Login';
import Room from './screens/Room';
import CheckIn from './screens/CheckIn';
import Customer from './screens/Customer';
import Setting from './screens/Setting';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStack = createBottomTabNavigator(
  {
    Checkin: {
      screen: createStackNavigator({
        Checkin: {
          screen: CheckIn,
          navigationOptions: ({navigation}) => ({
            header: <Header navigation={navigation} />,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: 'Checkin',
        tabBarIcon: ({tintColor}) => (
          <Icon name="check-circle" color={tintColor} size={25} />
        ),
      },
    },
    Room: {
      screen: createStackNavigator({
        Room: {
          screen: Room,
          navigationOptions: ({navigation}) => ({
            header: <Header navigation={navigation} />,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({tintColor}) => (
          <Icon name="bed" color={tintColor} size={25} />
        ),
      },
    },
    Customer: {
      screen: createStackNavigator({
        Customer: {
          screen: Customer,
          navigationOptions: ({navigation}) => ({
            header: <Header navigation={navigation} />,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <Icon name="vcard-o" color={tintColor} size={25} />
        ),
      },
    },
    Setting: {
      screen: createStackNavigator({
        Setting: {
          screen: Setting,
          navigationOptions: ({navigation}) => ({
            header: <Header navigation={navigation} />,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <Icon name="gear" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Room',
    tabBarOptions: {
      activeTintColor: iOSColors.white,
      inactiveTintColor: iOSColors.midGray,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: iOSColors.blue,
        borderTopWidth: 0,
        borderTopColor: iOSColors.white,
        elevation: 6,
        paddingTop: 10,
      },
    },
  },
);

const RootNavigation = createSwitchNavigator({
  AuthStack: AuthStack,
  AppStack: AppStack,
});

export default createAppContainer(RootNavigation);
