import React, { useState, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView, 
  Alert
} from 'react-native';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

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
              <View style={styles.linkRow}>
                <TextInput
                  placeholder="New Bio"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setNewBio}
                  style={styles.input}
                />
                {/* update bio button */}
                <Ionicons
                  name='md-add-circle-outline'
                  color='#59C3D1'
                  size={37}
                  onPress={() => {
                    axios.patch(`http://localhost:8080/users/${userInfo.id}/bio`, {
                      bio: newBio,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error));
                    Alert.alert('Bio Updated');
                  }}
                />
              </View>
              {/* spotify link */}
              <View style={styles.linkRow}>
                <TextInput
                  placeholder="Spotify Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setSpotifyLink}
                  style={styles.input}
                />
                {/* update spotify button */}
                <Ionicons
                  name='md-add-circle-outline'
                  color='#59C3D1'
                  size={37}
                  onPress={() => {
                    axios.patch(`http://localhost:8080/bands/${userInfo.id}/spotify`, {
                      link_spotify: spotifyLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error));
                    Alert.alert('Spotify Updated');
                  }}
                />
              </View>
              {/* facebook link */}
              <View style={styles.linkRow}>
                <TextInput
                  placeholder="Facebook Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setFacebookLink}
                  style={styles.input}
                />
                {/* update facebook button */}
                <Ionicons
                  name='md-add-circle-outline'
                  color='#59C3D1'
                  size={37}
                  onPress={() => {
                    axios.patch(`http://localhost:8080/bands/${userInfo.id}/fb`, {
                      link_facebook: facebookLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error));
                    Alert.alert('Facebook Updated');
                  }}
                />
              </View>
              {/* instagram link */}
              <View style={styles.linkRow}>
                <TextInput
                  placeholder="Instagram Link"
                  placeholderTextColor="#75A4AD"
                  returnKeyType="next"
                  onChangeText={setInstagramLink}
                  style={styles.input}
                />
                {/* update instagram button */}
                <Ionicons
                  name='md-add-circle-outline'
                  color='#59C3D1'
                  size={37}
                  onPress={() => {
                    axios.patch(`http://localhost:8080/bands/${userInfo.id}/insta`, {
                      link_instagram: instagramLink,
                    })
                      .then(response => response)
                      .catch(error => console.log('failed to create user', error));
                    Alert.alert('Instagram Updated');
                  }}
                />
              </View>
              {/* button to complete editing */}
              <TouchableOpacity
                style={styles.returnButtonContainer}
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
        style={styles.editBioContainer}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={styles.signupButtonText}>Edit Profile</Text>
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
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 300,
    fontWeight: 'bold',
    marginRight: 10
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    alignItems: 'center',
    color: '#59C3D1',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15
  },
  returnButtonContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
  },
  editBioContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    marginHorizontal: 7
  },
  signupButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  linkRow:{
    flexDirection: 'row',
    height: 50,
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})