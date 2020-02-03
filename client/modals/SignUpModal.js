import React, { useState, useContext } from 'react';
import { 
  Modal, 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext';
import RadioForm from 'react-native-simple-radio-button';
import { Ionicons } from '@expo/vector-icons';
import * as Google from "expo-google-app-auth";
import * as Calendar from 'expo-calendar';
import { IOS_AUTH_KEY, ANDROID_AUTH_KEY, AXIOS_URL } from 'react-native-dotenv';
import registerforPushNotificationsAsync from '../expoPushFunctions/registerForPushNotificationsAsync';

export default function ModalExample(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //pull signedin boolean from glabal context
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //set username to text in username textInput
  const [usernameValue, setUsernameValue] = useState('');
  //state for fan or band selector
  const [userType, setUserType] = useState('');
  //values for buttons
  const radio_props = [
    { label: 'Fan', value: 'fan' },
    { label: 'Band', value: 'band' }
  ];

  //function to sign in with google auth
  const googleSignIn = async () => {
    try {
      const { type, user, accessToken } = await Google.logInAsync({
        iosClientId: IOS_AUTH_KEY,
        androidClioentId: ANDROID_AUTH_KEY,
        scopes: ["profile", "email"]
      })
      if (type === "success") {
        //console.log('User Info: ', user, 'Access Token: ', accessToken);
        //key values to add to the userInfo global state
        setUserInfo(userInfo =>
          ({
            ...userInfo,
            signedIn: true,
            name: user.name,
            photoUrl: user.photoUrl,
          }))
        }
      axios.post(`${AXIOS_URL}/users`, {
        name: user.email,
        typeName: userType,
        photo: user.photoUrl,
      })
        .then(async () => {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
          }
        })
      .then(async () => {
        const expoPushToken = await registerforPushNotificationsAsync();
        return expoPushToken
      })
      .then((expoPushToken) => {
        axios.patch(`${AXIOS_URL}/users/${user.email}/push`, {
          expoPushToken
        })
      })
      .catch(error => console.log('failed to create user', error));
    } catch(error){console.log(error)}
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {/* back button */}
          <Ionicons size={64} style={styles.menuIconContainer} onPress={() => { setModalVisible(false) }}> 
            <Ionicons
              name='ios-arrow-back'
              color='#59C3D1'
              size={32}
              style={styles.menuIcon}
              onPress={() => { setModalVisible(false) }}
            />
          </Ionicons>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>Sign Up</Text>
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
            {/* radio button to select user type */}
            <RadioForm
              style={styles.modal}
              buttonInnerColor={'#59C3D1'}
              radio_props={radio_props}
              initial={null}
              formHorizontal={true}
              labelHorizontal={false}
              buttonColor={'#59C3D1'}
              animation={true}
              labelColor={'#fff'}
              onPress={(value) => {setUserType(value)}}
            />
            {/* horizontal button div */}
            <View style={{
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
            }}>
            {/* sign in button when modal is showing */}
            <TouchableOpacity
              style={styles.brightSignupContainer}
              onPress={() => {
                setModalVisible(false);
                axios.post(`${AXIOS_URL}/users`, {
                  name: usernameValue,
                  typeName: userType,
                })
                .then(response => response)
                .catch(error => console.log('failed to create user', error));
                setUserInfo(userInfo => ({
                  ...userInfo,
                  signedIn: true,
                  name: usernameValue,
                  userType: userType
                }));
              }}
            >
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            {/* google sign in button */}
            <TouchableOpacity
              style={styles.googleSignupContainer}
              onPress={() => {
                setModalVisible(false);
                googleSignIn();
              }}
            >
              <Text style={styles.buttonText}>Signup w/ GOOGLE </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
        </KeyboardAvoidingView>
      </Modal>
        {/* sign in button when modal is hidden */}
        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => {setModalVisible(true);}}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 90,
    marginBottom: 15
  },
  brightSignupContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 140,
    marginHorizontal: 7
  },
  googleSignupContainer: {
    backgroundColor: '#C70039',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 140,
    marginHorizontal: 7
  },
  signupContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: 140,
    marginBottom: 15
  },
  modal: {
    marginLeft: 120
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  signupButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  menuIconContainer: {
    zIndex: 9,
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
})