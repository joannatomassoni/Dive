import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MenuButton from '../components/MenuButton';

import MenuDrawer from '../components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({ navigation }) => {
    return (<MenuDrawer />)
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Links: {
      screen: LinksScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator)