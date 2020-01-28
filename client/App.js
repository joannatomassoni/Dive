import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { SignedInContext } from './context/UserContext';
import {MAP_KEY} from 'react-native-dotenv'

export default function App (props) {
  //initial login state of app
  const [userInfo, setUserInfo] = useState({});
  //disable yellow error boxes
  console.disableYellowBox = true;

  console.log(MAP_KEY);

  return (
    <View style={styles.container}>
      {/* pass signIn state to all children components*/}
      <SignedInContext.Provider value={[userInfo, setUserInfo]}>
        <DrawerNavigator />
      </SignedInContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})