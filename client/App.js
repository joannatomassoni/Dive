import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      signedIn: false,
    }

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn() {
    this.setState({
      signedIn: !this.state.signedIn,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerNavigator screenProps={() => this.handleSignIn()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})