import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Alert
  } from 'react-native';
  import { SignedInContext } from '../App';
import * as Google from "expo-google-app-auth";

export default function LoginForm (props) {
  //pull signedin boolean from glabal context
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //set username to text in username textInput
  const [usernameValue, setUsernameValue] = useState('');
  
  //function to sign in with google auth
  const googleSignIn = async () => {
    try {
      const { type, user, accessToken } = await Google.logInAsync({
        iosClientId: '453096591840-naqf4nslt86oor0avi1t97717v3c3bld.apps.googleusercontent.com',
        androidClioentId: '453096591840-s4924si2rd6moneqt77laoss6q28o1kp.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })
      if (type === "success") {
        console.log('User Info: ', user, 'Access Token: ', accessToken);
        //key values to add to the userInfo global state
        setUserInfo(userInfo => 
          ({ 
            ...userInfo, 
            signedIn: true,
            name: user.name,
            photoUrl: user.photoUrl
          }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* username text box */}
      <TextInput 
      placeholder="username or email"
      placeholderTextColor="#75A4AD"
      returnKeyType="next"
      onChangeText={setUsernameValue}
      keyboardType="email-address"
      style={styles.input} 
      />
      {/* password text box */}
      <TextInput 
      placeholder="password"
      placeholderTextColor="#75A4AD"
      returnKeyType="go"
      secureTextEntry
      style={styles.input}
      />
      {/* login button */}
      <TouchableOpacity 
        style={styles.loginContainer}
        onPress={() => setUserInfo(userInfo => ({ ...userInfo, signedIn: true }))}
      >
      <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      {/* google login button */}
      <TouchableOpacity
        onPress={() => {googleSignIn()}}
        style={styles.googleLoginContainer}
      >
        <Text style={styles.buttonText}>GOOGLE  LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
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