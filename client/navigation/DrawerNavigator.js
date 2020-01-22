import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Shows from '../screens/Shows'
import Bands from '../screens/Bands';
import Venues from '../screens/Venues';
import Login from '../screens/Login'

import MenuDrawer from '../components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.65,

  contentComponent: (props) => {
    return (<MenuDrawer navigation={props.navigation} />)
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Shows: {
      screen: Shows
    },
    Bands: {
      screen: Bands
    },
    Venues: {
      screen: Venues
    },
    Login: {
      screen: Login
    }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator)