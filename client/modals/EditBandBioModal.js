import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Image
} from 'react-native';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { AXIOS_URL } from 'react-native-dotenv';
import * as ImagePicker from 'expo-image-picker';


export default function EditBandBioModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //new bio
  const [newBio, setNewBio] = useState('');
  //new spotify link
  const [spotifyLink, setSpotifyLink] = useState('');
  //new facebook link
  const [facebookLink, setFacebookLink] = useState('');
  //new instagram link
  const [instagramLink, setInstagramLink] = useState('');

  const [image, setImage] = useState({});
  let [selectedImage, setSelectedImage] = useState({});
  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/da4ry89ct/upload';
  let [bandPhoto, setBandPhoto] = useState('');


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      "file": base64Img,
      "upload_preset": "oecwb18t",
    }

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      // console.log("sending data to cloudinary", data.url);
      setBandPhoto(data.url);
      console.log("bandPhoto has been set to state", bandPhoto);
    }).catch(err => console.log(err))

    axios.patch(`http://localhost:8080/bands/${userInfo.id}/photo`, {
      bandPhoto: bandPhoto
    })
      .then(response => {
        console.log("saving photo to db", bandPhoto)
      })
      .catch(err => {
        console.log("not saving to db", err)
      })
  };

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
              <Text style={styles.text}>Edit Bio</Text>

              {/* new bio text box */}
              <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'left',
              }}>
                <TextInput
                  placeholder="New Bio"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setNewBio}
                  style={styles.input}
                />
                {/* update bio button */}
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={() => {
                    axios.patch(`${AXIOS_URL}/users/${userInfo.id}/bio`, {
                      bio: newBio,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error))
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* spotify link */}
              <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'left',
              }}>
                <TextInput
                  placeholder="Spotify Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setSpotifyLink}
                  style={styles.input}
                />
                {/* update spotify button */}
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={() => {
                    axios.patch(`${AXIOS_URL}/bands/${userInfo.id}/spotify`, {
                      link_spotify: spotifyLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error))
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* facebook link */}
              <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'left',
              }}>
                <TextInput
                  placeholder="Facebook Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setFacebookLink}
                  style={styles.input}
                />
                {/* update facebook button */}
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={() => {
                    axios.patch(`${AXIOS_URL}/bands/${userInfo.id}/fb`, {
                      link_facebook: facebookLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error))
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* instagram link */}
              <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'left',
              }}>
                <TextInput
                  placeholder="Instagram Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setInstagramLink}
                  style={styles.input}
                />
                {/* update instagram button */}
                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={() => {
                    axios.patch(`${AXIOS_URL}/bands/${userInfo.id}/insta`, {
                      link_instagram: instagramLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error))
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              {/*  button to upload photo */}
              <View style={styles.button} >
                <TouchableOpacity
                  style={styles.signupContainer}
                  onPress={openImagePickerAsync}
                >
                  <Text style={styles.signupButtonText}>Select Photo</Text>
                </TouchableOpacity>

                {/* {image.uri && */}
                {/* <Image source={bandPhoto} style={{ width: 150, height: 150 }} />} */}
              </View>

              {/* button to complete editing */}
              <TouchableOpacity
                style={styles.signupContainer}
                onPress={() => { setModalVisible(false); }}
              >
                <Text style={styles.signupButtonText}>Return</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* edit bio button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={styles.signupButtonText}>Edit Bio</Text>
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
    width: 300,
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
  loginContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    width: 40,
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