import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Hub from '../screens/Hub'
import Shows from '../screens/Shows'
import Bands from '../screens/Bands';
import Venues from '../screens/Venues';
import Login from '../screens/Login'
import Search from '../screens/Search'
import MenuDrawer from '../components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
  //width for how far menu bar slides out
  drawerWidth: WIDTH * 0.60,
  //menu bar to render
  contentComponent: (props) => {
    return (<MenuDrawer navigation={props.navigation} />)
  }
}
//all possiblke links for menu nav
const DrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: Login
    },
    Shows: {
      screen: Shows
    },
    Bands: {
      screen: Bands
    },
    Venues: {
      screen: Venues
    },
    Hub: {
      screen: Hub
    },
    Search: {
      screen: Search
    }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator)