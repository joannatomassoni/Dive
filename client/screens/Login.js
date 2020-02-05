import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  KeyboardAvoidingView ,
  Animated
} from 'react-native';
import LoginForm from '../components/LoginForm'
import MenuButton from '../components/MenuButton'
import { SignedInContext } from '../context/UserContext'
import Welcome from '../components/Welcome'

export default function Login (props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  // welcome animation state
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  // start of animated welcome view
  const startFade = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 2500
    }).start();
  };

  useEffect(() => {
    startFade();
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <MenuButton navigation={props.navigation} />
      {/* Show different views if user is signed in */}
      {userInfo.signedIn ?
        // welcome screen when user logs in
        <Welcome />
        //login screen if user is not logged in
        :
        <View style={styles.container}>
          <View style={styles.title}>
            <Animated.View style={{ opacity: fadeValue }} >
              <Text style={styles.text}>DIVE</Text>
            </Animated.View>
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
    backgroundColor: '#222',
  },
  title: {
    alignItems: 'center',
  },
  text: {
    fontSize: 110,
    color: '#59C3D1',
    fontWeight: 'bold',
    marginTop: 230,
    fontFamily: 'AvenirNext-Bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: '#AA8181',
    textShadowRadius: 15
  },
})