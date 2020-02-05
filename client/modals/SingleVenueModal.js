import React, { useState, useEffect, useContext } from 'react';
import { SignedInContext } from '../context/UserContext';
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
import { Card } from 'react-native-elements';
import Moment from 'moment';
import SingleShowModal from '../modals/SingleShowModal';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MAP_KEY, AXIOS_URL } from 'react-native-dotenv';
import axios from 'axios';

export default function SingleVenueModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  //all info for signle venue
  const [singleVenue, setVenue] = useState([]);
  //array of shows at venue
  const [shows, setShows] = useState([]);
  const [venueLocation, setVenueLocation] = useState({});
  // whether a user follows a given venue or not
  const [isFollowing, toggleFollowing] = useState(false);
  //venue id for axios call
  let venue = props.venueID;

  // request to get single venue info
  const getSingleVenue = async () => {
    axios.get(`${AXIOS_URL}/venues/${venue}`)
          .then((response) => {
            setVenue(response.data);
          })
          .catch((err) => {
            console.log("error getting single venue", err);
          });
  }

  //request to get geolocation of address
  const getAddressCoords = async () => {
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
  }

  // request to get all shows at venue
  const getAllShows = () => {
    axios.get(`${AXIOS_URL}/venues/${venue}`)
      .then((response) => {
        setShows(() => response.data.shows);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Request to see if a user is following the venue
  const getFollowInfo = () => {
    axios.get(`${AXIOS_URL}/fans/${userInfo.id}/venues`)
      .then((response) => {
        if (response.data[0].venues) {
          response.data[0].venues.map(venue => {
            if (venue.id === singleVenue.id) {
              toggleFollowing(true);
            }
          })
        }
      })
      .catch((err) => {
        console.log("error getting venue/following info", err);
      });
  }
  
  // request to follow a venue
  const fanFollowVenue = () => {
    console.log(singleVenue.id)
    console.log(venue)
    axios.post(`${AXIOS_URL}/venues/${venue}/fans`, {
      id_fan: userInfo.id,
    })
      .then(() => toggleFollowing(true))
      .then(() => console.log(isFollowing))
      .catch(error => console.log('failed to follow venue', error));
  }

  // request to unfollow a venue
  const unfollowVenue = () => {
    axios.delete(`${AXIOS_URL}/venues/${venue}/fans`, {
      data: {
        id_fan: userInfo.id,
        id_venue: venue,
      }
    })
      .then(() => toggleFollowing(false))
      .catch(error => console.log('failed to unfollow venue', error));
  }

  useEffect(() => {
    getAllShows();
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
          <Ionicons size={64} style={styles.menuIconContainer} onPress={() => { setModalVisible(false) }}> 
            <Ionicons
              name='ios-arrow-back'
              color='#59C3D1'
              size={32}
              style={styles.menuIcon}
              onPress={() => { setModalVisible(false) }}
            />
          </Ionicons>
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
            {/* follow venue button */}
            {userInfo.signedIn ?
              (isFollowing ?
                // if following, show unfollow button
                <TouchableOpacity
                  style={styles.unfollowButtonContainer}
                  onPress={() => unfollowVenue()
                  //   {
                  //   axios.delete(`${AXIOS_URL}/bands/${singleBand.id}/fans`, {
                  //     data: {
                  //       id_fan: userInfo.id,
                  //     }
                  //   })
                  //     .then(() => {
                  //       toggleFollowing(false)
                  //     })
                  //     .catch(error => console.log('failed to unfollow band', error))
                  // }
                }
                >
                  <Text style={styles.followButtonText}>Unfollow</Text>
                </TouchableOpacity>
                :
                // if not following, show follow button
                <TouchableOpacity
                  style={styles.followButtonContainer}
                  onPress={() => {
                    fanFollowVenue();
                  }}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>)
              : null
            }
            {/* shows header */}
            <Text style={styles.headerText}>Shows</Text>
            {/* cards for each upcoming show at the venue */}
            {shows.map(show => {
              return (
                <Card
                  key={show.id}
                  backgroundColor='#111'
                  padding={10}
                  borderRadius={10}
                  containerStyle={styles.card}
                >
                  <SingleShowModal show={show.id} showName={show.name} />
                  <Text style={styles.cardText}>{show.date}</Text>
                  <Text style={styles.cardText}>{Moment(show.dateTime).format('LT')}</Text>
                  <Text style={styles.cardText}>{show.description}</Text>
                  {/* list for each additional band in each show */}
                  {show.bands && show.bands.map(band => {
                    return <Text style={styles.cardBandText}>{band.name}</Text>
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
          getFollowInfo();
          getSingleVenue();
          getAddressCoords();
        }}     
      >
        <Text style={styles.cardTextVenueName}>{props.venueName}</Text>
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
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10
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
  unfollowButtonContainer: {
    backgroundColor: '#AA8181',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  followButtonContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  cardText: {
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  cardBandText: {
    fontSize: 16,
    color: '#AA8181',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    marginBottom: 5
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
  },
  menuIconContainer: {
      zIndex: 9,
      position: 'absolute',
      top: 30,
      left: 10,
      padding: 10,
  },
  cardTextVenueName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: '#fff'
  },
})