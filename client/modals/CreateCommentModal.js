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

export default function CreateCommentModal({ showId, userId }) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //comment text
  const [comment, setComment] = useState('');
  console.log(comment);
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
              <Text style={styles.text}>New Comment</Text>
              {/* new bio text box */}
              <TextInput
                placeholder="Comment"
                placeholderTextColor="#75A4AD"
                returnKeyType="next"
                onChangeText={setComment}
                style={styles.input}
              />
              {/* edit bio button when modal is showing */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Post Comment</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* cedit bio button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => { 
          setModalVisible(true); 
          axios.post(`http://localhost:8080/shows/${showId}/comments`, {
            id_user: userId, 
            text: comment
          })
          .then(response => console.log(response))
          .catch(error => console.log('failed to create show', error));
        }}
        >
        <Text style={styles.signupButtonText}>Comment</Text>
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
    fontSize: 30,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 60,
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