import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import BandsScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Shows'
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  { Links: BandsScreen },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Bands'
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  { Settings: SettingsScreen },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Venues'
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
