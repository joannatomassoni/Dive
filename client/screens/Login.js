import React, { Component } from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView 
} from 'react-native';

import LoginForm from '../components/LoginForm'
import MenuButton from '../components/MenuButton'

export default function Login (props) {

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.title}>
      <Text style={styles.text}>DIVE</Text>
      </View>
        <LoginForm />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A'
  },
  title: {
    flex: 1,
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
    flex: 1
  }
})