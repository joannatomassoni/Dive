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
  Alert
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { SignedInContext } from '../context/UserContext';
import { AXIOS_URL } from 'react-native-dotenv';
import VenuePicker from '../components/VenuePicker'
import DateTimePicker from '../components/DateTimePicker';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';

export default function CreateShowModal(props) {
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
  // public/private status
  const [status, setStatus] = useState('private');
  //venue name
  const [venueName, setVenueName] = useState('private');
  //show date
  const [dateTime, setDateTime] = useState('');
  //show description
  const [showDesc, setShowDesc] = useState('');
  //list of venues
  const [allVenues, setAllVenues] = useState([]);
  const venues = [];
  //sets photo uploaded from phone
  const [selectedImage, setSelectedImage] = useState({});
  //cloudinary url to send photo to
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/da4ry89ct/upload';
  //sets band photo
  const [flyer, setFlyerPhoto] = useState('');
  // const [flyerUpload, ]
  // values for public/private option for venue
  const radio_props = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' }
  ];

  //allows user to upload a photo
  //this gets permission from phone to access images
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    //this gets image from phone
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    //this sets "selectedImage" in state
    setSelectedImage({ localUri: pickerResult.uri });
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      "file": base64Img,
      "upload_preset": "oecwb18t",
    }

    //sends photo to cloudinary
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      setFlyerPhoto(data.url);
    }).catch(err => console.log(err))
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <KeyboardAvoidingView behavior="padding" style={styles.topContainer}>
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
              <Text style={styles.text}>New Show</Text>
              {/* Title text box */}
              <TextInput
                placeholder="Show Title"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                color='black'
                onChangeText={setShowTitle}
                style={styles.input}
              />
              {/* Description input */}
              <TextInput
                placeholder="Show Description"
                placeholderTextColor="#75A4AD"
                returnKeyType="send"
                color='black'
                onChangeText={setShowDesc}
                style={styles.input}
              />
              <View style={styles.linkRow}>
                {/* Bands input */}
                <TextInput
                  placeholder="Add Band"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  color='black'
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
              {/* venue row */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                {/* Radio button to select private/public status of show */}
                <RadioForm
                  style={styles.modal}
                  buttonInnerColor={'#59C3D1'}
                  radio_props={radio_props}
                  initial={1}
                  formHorizontal={true}
                  labelHorizontal={false}
                  buttonColor={'#59C3D1'}
                  selectedButtonColor={'#59C3D1'}
                  animation={true}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  onPress={(value) => { setStatus(value) }}
                />
                {status === 'public' ?
                  // {/* dropdown to select venue, available if show is public */}
                  <VenuePicker setVenueName={setVenueName} allVenues={allVenues} />
                  : null
                }
              </View>
              {/* date time picker */}
              <DateTimePicker setDateTime={setDateTime} />
              {/*  button to upload photo */}
              <View style={styles.button} >
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={openImagePickerAsync}
                >
                  <Text style={styles.buttonText}>Upload Flyer</Text>
                </TouchableOpacity>
                {/* {image.uri && */}
                {/* <Image source={bandPhoto} style={{ width: 150, height: 150 }} />} */}
              </View>
              {/* <TouchableOpacity
                style={styles.buttonContainer}
                onPress={savePhoto}
              >
                <Text style={styles.buttonText}>Save Photo</Text>
              </TouchableOpacity> */}

              {/* create show button when modal is showing */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  axios.post(`https://dive-266016.appspot.com/shows`, {
                    name: showTitle,
                    dateTime: dateTime,
                    flyer: flyer,
                    venueName: venueName,
                    bandNames: bandNames,
                    description: showDesc
                  })
                    .then(() => props.getBandsShows())
                    .then(() => setModalVisible(false))
                    .catch(error => console.log('failed to create show', error));
                }}
              >
                <Text style={styles.buttonText}>Create Show</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        style={styles.createShowContainer}
        onPress={() => {
          setModalVisible(true);
          //request to get all venues for venue selector
          axios.get(`https://dive-266016.appspot.com/venues`)
            .then(response => response.data.map(venue => {
              if (!venues.includes(venue.name)) {
                venues.push(venue.name);
              }
            }))
            .catch(error => console.log('failed to get all venues', error));
          venues.push('Cancel');
          setAllVenues(venues);
        }}
      >
        <Text style={styles.signupButtonText}>Create a show</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#2D323A',
    padding: 20,
    paddingTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    padding: 20,
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
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 15
  },
  createShowContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    marginHorizontal: 7
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
    left: 10,
    padding: 10,
  },
  linkRow: {
    flexDirection: 'row',
    height: 50,
  },
  modal: {
    alignSelf: 'center',
    paddingRight: 20
  }
})