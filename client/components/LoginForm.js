import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  Alert
  } from 'react-native';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext';
import * as Google from "expo-google-app-auth";
import SignUpModal from '../modals/SignUpModal'

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
        axios.get(`http://localhost:8080/users/${user.email}`)
          .then(res => setUserInfo(userInfo => ({
            ...userInfo,
            signedIn: true,
            name: user.name,
            userType: res.data.id_type === 1 ? 'fan' : 'band',
            photoUrl: res.data.photo,
            id: res.data.id
          })))
          .catch(error => console.log('failed to find user', error));
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
        onPress={() => {
          axios.get(`http://localhost:8080/users/${usernameValue}`)
            .then(res => setUserInfo(userInfo => ({
              ...userInfo,
              signedIn: true,
              name: res.data.name,
              userType: res.data.id_type === 1 ? 'fan' : 'band',
              photoUrl: res.data.photo,
              id: res.data.id
            })))
            .catch(error => console.log('failed to find user', error));
        }}
      >
      <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      {/* google login button */}
      <TouchableOpacity
        onPress={() => {googleSignIn()}}
        style={styles.googleLoginContainer}
      >
        <Text style={styles.buttonText}>Login w/ GOOGLE </Text>
      </TouchableOpacity>
      {/* button to open modal */}
      <SignUpModal />
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
    backgroundColor: '#C70039',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  }
})