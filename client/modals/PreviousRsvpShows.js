import React, { useState, useEffect, useContext } from 'react';
import { SignedInContext } from '../context/UserContext';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-elements'
import SingleShowModal from '../modals/SingleShowModal';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';
import { LinearGradient } from 'expo-linear-gradient';

export default function PreviousRSVPShows(props) {
  const [oldShows, setOldShows] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //allows user to get shows they previously went to on button click
  let userId = props.userId;
  const getPreviousShows = () => {
    axios.get(`https://dive-266016.appspot.com/shows/${userId}/oldrsvps`)
      .then(response => {
        if (response.data.length) {
          setOldShows(response.data)
          console.log(oldShows);
        }
      })
      .catch(err => {
        console.log("not getting older shows", err);
      })
  }

  useEffect(() => {
    getPreviousShows();
  }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <View behavior="padding" style={styles.container}>
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
          <LinearGradient
            colors={['#38404C', '#111']}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <View style={{ marginTop: 70 }}>
                <Text style={styles.headerText}>Past Shows</Text>
                {oldShows.length ? 
                  oldShows.map(show => {
                  return (
                    <Card
                      // key={show.id}
                      style={styles.card}
                      backgroundColor='#111'
                      padding={10}
                      borderRadius={10}
                      containerStyle={styles.card}
                    >
                      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                      {/* modal to display single show info */}
                      <SingleShowModal show={show} />
                      <Text style={styles.cardText}>{show.name}</Text>
                      <Text style={styles.cardText}>{show.time}</Text>
                      <Text style={styles.cardText}>{show.date}</Text>
                      <Text style={styles.cardText}>{show.description}</Text>
                      {/* <EditShowModal /> */}
                    </Card>
                  )
                })
                : null
                }
                {/* </View> */}
              </View>
            </View>
            </LinearGradient>
          </View>
      </Modal >
      {/* edit bio button when modal is hidden */}
      < TouchableOpacity
        style={styles.signupContainer}
        onPress={() => { setModalVisible(true); }
        }
      >
        <Text style={styles.signupButtonText}>Past Shows</Text>
      </TouchableOpacity >

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  cardText: {
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 30,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 90,
    marginBottom: 15
  },
  signupContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
    width: 140,
    marginHorizontal: 7
  },
  modal: {
    marginLeft: 120
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  prevButton: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 10
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


