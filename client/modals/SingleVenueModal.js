import React, { useState, useEffect } from 'react';
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


export default function SingleVenueModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleVenue, setVenue] = useState([]);
  const [shows, setShows] = useState([]);
  let venue = props.venueID;
  console.log(venue)

  useEffect(() => {
    axios.get(`http://localhost:8080/venues/${venue}/shows`)
      .then((response) => {
        // console.log("getting a bands shows from db", response.data)
        setShows(response.data);
      })
      .catch((err) => {
        // console.log("frontend not getting band shows from db", err);
      })
  }, [])

  console.log("getting venue shows", shows);

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
            <Text style={styles.headerText} key={singleVenue.id}>Venue</Text>

            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>Venue: {singleVenue.name}</Text>
            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>Address: {singleVenue.address}</Text>
            <Text style={{ marginBottom: 10, color: '#fff', fontSize: 30 }}>{singleVenue.city}, {singleVenue.state}{' '}{singleVenue.zip_code}</Text>

            <Text style={styles.headerText}>Shows</Text>

            {shows.map(show => {
              return (
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
                  <Text style={{ marginBottom: 10, color: '#000' }}>{show.description}</Text>
                  <Text style={{ marginBottom: 10, color: '#000' }}>Bands:</Text>

                  {show.bands.map(band => {
                    return (
                      <Text>

                        <Text style={{ marginBottom: 10, color: '#000' }}>{band.name}</Text>
                      </Text>
                    )
                  })}
                </Card>
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
          axios.get(`https://dive-266016.appspot.com/venues/${venue}`)
            .then((response) => {
              console.log("getting single venue", response.data)
              setVenue(response.data);
            })
            .catch((err) => {
              console.log("frontend not getting single venue from db", err);
            })
        }}
      >
        <Text style={styles.signupButtonText}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
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