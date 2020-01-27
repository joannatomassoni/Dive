import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext'
import SingleShowModal from '../modals/SingleShowModal'



export default function SingleBandModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleBand, setBand] = useState([]);
  const [shows, setShows] = useState([]);
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  let band = props.name;
  let bandId = props.bandId;
  console.log("getting props", band)

  useEffect(() => {
    axios.get(`http://localhost:8080/bands/${bandId}/shows`)
      .then((response) => {
        // console.log("getting a bands shows from db", response.data)
        setBand(response.data);
        setShows(response.data.shows);
      })
      .catch((err) => {
        // console.log("frontend not getting band shows from db", err);
      })
  }, [])

  console.log("getting a bands all their shows", shows);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <SafeAreaView behavior="padding" style={styles.container}>
          {/* back button */}
          <Ionicons
            name='ios-arrow-back'
            color='#59C3D1'
            size={32}
            style={styles.menuIcon}
            onPress={() => { setModalVisible(false) }}
          />

          <ScrollView style={{ marginTop: 30 }}>
            <Text style={styles.headerText} key={singleBand.id}>{singleBand.name}</Text>
            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>Bio: {singleBand.bio}</Text>
            <TouchableOpacity
                  style={styles.followButtonContainer}
                  onPress={() => {
                    axios.post(`http://localhost:8080/bands/${bandId}/fans`, {
                      id_fan: userInfo.id
                    })
                      .then(response => console.log(response))
                      .catch(error => console.log('failed to follow band', error))
                  }}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
            <Text style={styles.headerText}>Shows</Text>
            {shows.map(show => {
              return (
                <View>

                  <Card
                    title={show.name}
                    style={styles.card}
                    key={show.id}
                    backgroundColor='#fff'
                    borderWidth={0}
                    borderRadius={10}
                    padding={10}
                  // image={require('../images/pic2.jpg')}
                  >
                    <Text style={{ marginBottom: 10, color: '#000' }}>{show.date}</Text>
                    <Text style={{ marginBottom: 10, color: '#000' }}>{show.time}</Text>
                    <Text style={{ marginBottom: 10, color: '#000' }}>{show.venue.name}</Text>
                    <Text style={{ marginBottom: 10, color: '#000' }}>{show.description}</Text>
                    <SingleShowModal show={show.id} />

                  </Card>
                </View>
              )
            })}

          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => {
          setModalVisible(true);
          //axios
          axios.get(`http://localhost:8080/users/${band}`)
            .then((response) => {
              console.log("getting single band", response.data)
              setBand(response.data);
            })
            .catch((err) => {
              console.log("frontend not getting single band from db", err);
            })
        }}
      >
        <Text style={styles.signupButtonText}>Show More</Text>
      </TouchableOpacity >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  card: {
    backgroundColor: '#75A4AD',
    borderRadius: 10
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
  },
  followButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  followButtonContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  cardText: {
    fontSize: 30,
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})