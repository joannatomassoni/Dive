import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { SignedInContext } from './context/UserContext';
import { IOS_AUTH_KEY, ANDROID_AUTH_KEY, AXIOS_URL, MAP_KEY } from 'react-native-dotenv';
import { Header } from './components/Header';

export default function App(props) {
  //initial login state of app
  const [userInfo, setUserInfo] = useState({});
  //disable yellow error boxes
  console.disableYellowBox = true;

  return (
    <View style={styles.container}>

      <Header />

      {/* pass signIn state to all children components*/}
      <SignedInContext.Provider value={[userInfo, setUserInfo]}>
        <DrawerNavigator />
      </SignedInContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})