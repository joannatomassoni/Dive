import React, { useContext } from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView 
} from 'react-native';
import LoginForm from '../components/LoginForm'
import MenuButton from '../components/MenuButton'
import { SignedInContext } from '../App'

export default function Login (props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* Show different views if user is signed in */}
      {userInfo.signedIn ?
        // welcome screen when user logs in
        <View style={styles.title}>
          <MenuButton navigation={props.navigation} />
          <Text style= {styles.text}>WELCOME</Text>
        </View>
        //login screen if user is not logged in
        :<View style={styles.container}>
        <MenuButton navigation={props.navigation} />
        <View style={styles.title}>
        <Text style={styles.text}>DIVE</Text>
        </View>
        <LoginForm />
        </View>
      }
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
    fontSize: 70,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  formContainer: {
    flex: 1
  }
})