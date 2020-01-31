import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MAP_KEY, AXIOS_URL } from 'react-native-dotenv';
import axios from 'axios';



export default function SingleVenueModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  //all info for signle venue
  const [singleVenue, setVenue] = useState([]);
  //array of shows at venue
  const [shows, setShows] = useState([]);
  //array of bands to list for each show
  const [bands, setBands] = useState([]);
  const [venueLocation, setVenueLocation] = useState({});
  //venue id for axios call
  let venue = props.venueID;

  useEffect(() => {
    //request to get all shows at specific venue
    axios.get(`${AXIOS_URL}/venues/${venue}`)
      .then((response) => {
        setShows(() => response.data.shows);
      })
      .catch((err) => {
      });
    //request to get all bands from each specific show
    axios.get(`${AXIOS_URL}/shows/${venue}`)
      .then((response) => {
        setBands(() => response.data.bands);
      })
      .catch((err) => {
        console.log("error getting bands for single show", err);
      });
      //CURRENT GEOLOCATION
      // navigator.geolocation.getCurrentPosition(position => {
      //   setCurrentLocation({
      //     latitude: position.coords.latitude,
      //     longitude: position.coords.longitude,
      //     error: null,
      //   })
      // }, error => setCurrentLocation({error: error.message}),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
      // )
  }, [])


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
            <Text style={styles.headerText} key={singleVenue.id}>{singleVenue.name}</Text>
            <Text style={styles.infoText}>{singleVenue.address}</Text>
            <Text style={styles.infoText}>{singleVenue.city}, {singleVenue.state}{' '}{singleVenue.zip_code}</Text>
            {/* map view for current venue */}
            <View style={{padding: 10}}>
            <MapView 
            // use line below for google maps
            //provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            region={venueLocation}
            >
              <Marker 
              coordinate={venueLocation}
                pinColor={'#59C3D1'}
                title={`${singleVenue.name}`}
              />
            </MapView>
            </View>
            {/* shows header */}
            <Text style={styles.headerText}>Shows</Text>
            {/* cards for each upcoming show at the venue */}
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
                >
                  <Text style={{ marginBottom: 10, color: '#000' }}>{show.date}</Text>
                  <Text style={{ marginBottom: 10, color: '#000' }}>{show.time}</Text>
                  <Text style={{ marginBottom: 10, color: '#000' }}>{show.description}</Text>
                  <Text style={{ marginBottom: 10, color: '#000' }}>Bands:</Text>
                  {/* list for each additional band in each show */}
                  {bands && bands.map(band => {
                    return <Text style={{ marginBottom: 10, color: '#000' }}>{band.name}</Text>
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
          axios.get(`${AXIOS_URL}/venues/${venue}`)
          .then((response) => {
            setVenue(response.data);
          })
          .catch((err) => {
            console.log("error getting single venue", err);
          });
          //request to get geolocation of address
          axios.get(`http://www.mapquestapi.com/geocoding/v1/address`, {
            params: {
              key: `${MAP_KEY}`,
              location: `${singleVenue.address},${singleVenue.city}${singleVenue.state},${singleVenue.zip_code}`
            }
          })
            .then(axios.get(`http://www.mapquestapi.com/geocoding/v1/address`, {
              params: {
                key: `${MAP_KEY}`,
                location: `${singleVenue.address},${singleVenue.city}${singleVenue.state},${singleVenue.zip_code}`
              }
            }))
            .then((response) => {
              setVenueLocation({
                latitude: response.data.results[0].locations[0].displayLatLng.lat,
                longitude: response.data.results[0].locations[0].displayLatLng.lng,
                latitudeDelta: 0.0012,
                longitudeDelta: 0.011
              });
            })
            .catch((err) => {
              console.log(`error getting geolocation`, err);
            });
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
    padding: 5
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
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
  mapStyle: {
    width: 395,
    height: 250,
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})