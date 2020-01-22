import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  } from 'react-native';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      count: 0 
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
        placeholder="username or email"
        placeholderTextColor="#75A4AD"
        returnKeyType="next"
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType="email-address"
        style={styles.input} 
        />
        <TextInput 
        placeholder="password"
        placeholderTextColor="#75A4AD"
        returnKeyType="go"
        secureTextEntry
        style={styles.input}
        ref={(input) => {this.passwordInput = input}}
        />
        <TouchableOpacity 
        style={styles.loginContainer}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.googleLoginContainer}
        >
          <Text style={styles.buttonText}>GOOGLE  LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40, 
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 40,
    fontWeight: 'bold'
  },
  loginContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  googleLoginContainer: {
    backgroundColor: '#9F92A3',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  }
})