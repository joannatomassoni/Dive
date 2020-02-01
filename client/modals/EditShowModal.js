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


export default function EditShowModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //shwo title
  const [showTitle, setShowTitle] = useState('');
  //band title
  const [bandName, setBandName] = useState('');
  //array of all bands
  const [bandNames, addBandName] = useState([userInfo.username]);
  //venue name
  const [venueName, setVenueName] = useState('');
  //show date
  const [dateTime, setDateTime] = useState('');
  //show description
  const [showDesc, setShowDesc] = useState('');
  //list of venues
  const [allVenues, setAllVenues] = useState([]);
  const venues = [];

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
              <Text style={styles.text}>Edit Show</Text>
              {/* Title text box */}
              <TextInput
                placeholder="Show Title"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setShowTitle}
                style={styles.input}
              />
              {/* Description input */}
              <TextInput
                placeholder="Show Description"
                placeholderTextColor="#75A4AD"
                returnKeyType="send"
                onChangeText={setShowDesc}
                style={styles.input}
              />
              <View style={styles.linkRow}>
                {/* Bands input */}
                <TextInput
                  placeholder="Add Band"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setBandName}
                  style={styles.bandInput}
                />
                {/* add band button */}
                <Ionicons
                  name='md-add-circle-outline'
                  color='#59C3D1'
                  size={37}
                  onPress={() => {
                    addBandName([...bandNames, bandName])
                    Alert.alert('Band Added');
                  }}
                />
              </View>
              {/* dropdown to select venue */}
              <VenuePicker setVenueName={setVenueName} allVenues={allVenues} />
              {/* date time picker */}
              <DateTimePicker setDateTime={setDateTime} />
              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  setModalVisible(false);
                  axios.patch(`${AXIOS_URL}/shows/${userInfo.id}`, {
                    name: showTitle,
                    dateTime: dateTime,
                    photo: null,
                    venueName: venueName,
                    bandName: bandNames,
                    description: showDesc
                  })
                    .then(response => response)
                    .catch(error => console.log('failed to create show', error));
                }}
              >
                <Text style={styles.buttonText}>Edit Show</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
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
    padding: 20,
    paddingTop: 100
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 334,
    fontWeight: 'bold'
  },
  bandInput: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: 295,
    marginRight: 5,
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
  buttonContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 200,
    alignSelf: 'center',
    marginHorizontal: 7
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
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
    left: 10,
    padding: 10,
  },
  linkRow: {
    flexDirection: 'row',
    height: 50,
  },
})