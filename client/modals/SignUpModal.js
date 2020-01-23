import React, { useState } from 'react';
import { 
  Modal, 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default function ModalExample(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>Sign Up</Text>
            <TextInput
              placeholder="username or email"
              placeholderTextColor="#75A4AD"
              returnKeyType="next"
              //onChangeText={setUsernameValue}
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
            {/* button when modal is hidden */}
            <TouchableOpacity
              style={styles.loginContainer}
              // onPress={() => setUserInfo(userInfo => ({ ...userInfo, signedIn: true }))}
              onPress={() => {setModalVisible(!modalVisible);}}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        {/* button when modal is hidden */}
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => {setModalVisible(true);}}
        >
          <Text style={styles.buttonText}>NEW USER</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A'
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  loginContainer: {
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
  }
})