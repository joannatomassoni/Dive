import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { SignedInContext } from '../context/UserContext';
import { AXIOS_URL } from 'react-native-dotenv';
import VenuePicker from '../components/VenuePicker'
import DateTimePicker from '../components/DateTimePicker';


export default function AddVenueModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //venue name
  const [venueName, setVenueName] = useState('');
  //venue address
  const [venueAddress, setvenueAddress] = useState('');
  //venue city
  const [venueCity, setVenueCity] = useState('');
  //venue state
  const [venueState, setvenueState] = useState('');
  //venue zip
  const [venueZip, setVenueZip] = useState('');

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
            <ScrollView style={styles.title}>
              <Text style={styles.text}>New Venue</Text>
              {/* Venue name input */}
              <TextInput
                placeholder="Venue Name"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                color='black'
                onChangeText={setVenueName}
                style={styles.input}
              />
              {/* Address input */}
              <TextInput
                placeholder="Address"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                color='black'
                onChangeText={setvenueAddress}
                style={styles.input}
              />
              {/* City input */}
              <TextInput
                placeholder="City"
                placeholderTextColor="#75A4AD"
                returnKeyType='next'
                color='black'
                onChangeText={setVenueCity}
                style={styles.input}
              />
              {/* State input */}
              <TextInput
                placeholder="State"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                color='black'
                onChangeText={setvenueState}
                style={styles.input}
              />
              {/* Zip input */}
              <TextInput
                placeholder="Zip Code"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                color='black'
                onChangeText={setVenueZip}
                style={styles.input}
              />
              {/* create venue button when modal is showing */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  setModalVisible(false);
                  axios.post(`${AXIOS_URL}/venues`, {
                    name: venueName,
                    address: venueAddress,
                    city: venueCity,
                    state: venueState,
                    zip_code: venueZip
                  })
                  .then(response => response)
                  .catch(error => console.log('failed to create show', error));
                }}
              >
                <Text style={styles.buttonText}>Add Venue</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* create venue button when modal is hidden */}
      <TouchableOpacity
        style={styles.createShowContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.signupButtonText}>Add Venue</Text>
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
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 20,
    fontWeight: 'bold'
  },
  title: {
    flex: 1,
    paddingTop: 30
  },
  text: {
    fontSize: 40,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 75,
    marginBottom: 15
  },
  createShowContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    width: 140, 
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
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
    zIndex: 15,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  menuIconContainer: {
    zIndex: 9,
    position: 'absolute',
    top: 30,
    left: 15,
    padding: 10,
  },
})