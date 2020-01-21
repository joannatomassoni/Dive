import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginForm from '../components/LoginForm'
import MenuButton from '../components/MenuButton'

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>DIVE</Text>
        <View style={styles.formContainer}>
          {/* <LoginForm /> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  formContainer: {

  }
})