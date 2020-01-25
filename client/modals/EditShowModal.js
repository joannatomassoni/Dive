import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

export default function CreateShowModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //shwo title
  const [showTitle, setShowTitle] = useState('');
  //band title
  const [bandName, setBandName] = useState('');
  //array of all bands
  const [bandNames, addBandName] = useState([]);
  //venue name
  const [venueName, setVenueName] = useState('');
  //date
  const [showDate, setShowDate] = useState('');
  //time
  const [showTime, setShowTime] = useState('');
  //show description
  const [showDesc, setShowDesc] = useState('');

  console.log(showDesc);
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
          <Ionicons
            name='ios-arrow-back'
            color='#59C3D1'
            size={32}
            style={styles.menuIcon}
            onPress={() => { setModalVisible(false) }}
          />
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.text}>Edit Show</Text>
              {/* username text box */}
              <TextInput
                placeholder="Show Title"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowTitle}
                style={styles.input}
              />
              {/* Bands input */}
              <TextInput
                placeholder="Add Band"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setBandName}
                style={styles.input}
              />
              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => addBandName([...bandNames, bandName])}
              >
                <Text style={styles.buttonText}>Add Band</Text>
              </TouchableOpacity>
              {/* Venue input */}
              <TextInput
                placeholder="Show Venue"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setVenueName}
                style={styles.input}
              />
              {/* Date input */}
              <TextInput
                placeholder="Date"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowDate}
                style={styles.input}
              />
              {/* Time input */}
              <TextInput
                placeholder="Time"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowTime}
                style={styles.input}
              />
              {/* Description input */}
              <TextInput
                placeholder="Show Description"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowDesc}
                style={styles.input}
              />
              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => {
                  setModalVisible(false);
                  axios.post('http://localhost:8080/venues', {
                    name: venueName,
                  })
                    .then(response => {
                      console.log(response);
                      return axios.post('http://localhost:8080/shows', {
                        name: showTitle,
                        date: showDate,
                        time: showTime,
                        photo: null,
                        venueName: venueName,
                        bandName: bandNames,
                        description: showDesc
                      })
                    })
                    .then(response => response)
                    .catch(error => console.log('failed to create show', error));
                }}
              >
                <Text style={styles.buttonText}>Create Show</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        onPress={() => { setModalVisible(true); }}
      >
        <Text>Edit Show</Text>
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
    marginHorizontal: 40,
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
    marginLeft: 75,
    marginBottom: 15
  },
  loginContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  signupContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
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
  }
})