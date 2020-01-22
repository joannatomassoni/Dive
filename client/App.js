import React, { createContext } from 'react';
import { StyleSheet, View } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator'

export const SignedInContext = createContext(false);

export default function App (props) {

  return (
    <View style={styles.container}>
      <SignedInContext.Provider value={false}>
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