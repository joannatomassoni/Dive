import React, { useState, useEffect, useContext } from 'react';
import { SignedInContext } from '../context/UserContext';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-elements';
import Moment from 'moment';
import SingleShowModal from '../modals/SingleShowModal';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MAP_KEY, AXIOS_URL } from 'react-native-dotenv';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function SingleVenueModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [venueLocation, setVenueLocation] = useState({});
  // whether a user follows a given venue or not
  const [isFollowing, toggleFollowing] = useState(false);
  //venue id for axios call
  let venue = props.venue;

  //request to get geolocation of address
  const getAddressCoords = async () => {
    axios.get(`http://www.mapquestapi.com/geocoding/v1/address`, {
      params: {
        key: `${MAP_KEY}`,
        location: `${venue.address},${venue.city}${venue.state},${venue.zip_code}`
      }
    })
      .then(axios.get(`http://www.mapquestapi.com/geocoding/v1/address`, {
        params: {
          key: `${MAP_KEY}`,
          location: `${venue.address},${venue.city}${venue.state},${venue.zip_code}`
        }
      }))
      .then((response) => {
        setVenueLocation({
          latitude: response.data.results[0].locations[0].displayLatLng.lat,
          longitude: response.data.results[0].locations[0].displayLatLng.lng,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.011
        });
      })
      .catch((err) => {
        console.log(`error getting geolocation`, err);
      });
  }

  const getRSVPS = () => {
    console.log('');
  }

  // Request to see if a user is following the venue
  const getFollowInfo = () => {
    axios.get(`https://dive-ios.appspot.com/fans/${userInfo.id}/venues`)
      .then((response) => {
        if (response.data[0].venues) {
          response.data[0].venues.map(singleVenue => {
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
    axios.post(`https://dive-ios.appspot.com/venues/${venue.id}/fans`, {
      id_fan: userInfo.id,
    })
      .then(() => toggleFollowing(true))
      .catch(error => console.log('failed to follow venue', error));
  }

  // request to unfollow a venue
  const unfollowVenue = () => {
    axios.delete(`https://dive-ios.appspot.com/venues/${venue.id}/fans`, {
      data: {
        id_fan: userInfo.id,
        id_venue: venue.id,
      }
    })
      .then(() => toggleFollowing(false))
      .catch(error => console.log('failed to unfollow venue', error));
  }

  useEffect(() => {
    getAddressCoords();
    getFollowInfo();
  }, [])

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
          <ScrollView style={{ marginTop: 70 }}>
            <Text style={styles.headerText} key={venue.id}>{venue.name}</Text>
            <Text style={styles.infoText}>{venue.address}</Text>
            <Text style={styles.infoText}>{venue.city}, {venue.state}{' '}{venue.zip_code}</Text>
            {/* map view for current venue */}
            <View style={{padding: 10}}>
            <MapView 
            // use line below for google maps
            // provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.mapStyle}
            region={venueLocation}
            >
              <Marker 
              coordinate={venueLocation}
                pinColor={'#59C3D1'}
                title={`${venue.name}`}
              />
            </MapView>
            </View>
            {/* follow venue button */}
            {userInfo.signedIn ?
              (isFollowing ?
                // if following, show unfollow button
                <TouchableOpacity
                  style={styles.unfollowButtonContainer}
                  onPress={() => unfollowVenue()}
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
            {venue.shows && venue.shows.map(show => {
              {/* shows header */}
              <Text style={styles.headerText}>Shows</Text>
              {/* cards for each upcoming show at the venue */}
              return (
                <Card
                  key={show.id}
                  backgroundColor='#111'
                  padding={10}
                  borderRadius={10}
                  containerStyle={styles.card}
                >
                  <SingleShowModal show={show} getRSVPS={getRSVPS}/>
                  <Text style={styles.cardDateText}>{Moment(show.dateTime).format('ll')}</Text>
                  <Text style={styles.cardDateText}>{Moment(show.dateTime).format('LT')}</Text>
                  {/* list for each additional band in each show */}
                  {show.bands && show.bands.map(band => {
                    return <Text style={styles.cardBandText}>{band.nickname}</Text>
                  })}
                </Card>
              )
            })}
          </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => {
          setModalVisible(true);
        }}     
      >
        <Text style={styles.cardTextVenueName}>{venue.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
  },
  headerText: {
    fontSize: 34,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'left',
    paddingLeft: 10,
  },
  card: {
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10
  },
  cardDateText: {
    fontSize: 14,
    color: '#75A4AD',
    fontWeight: '500',
    textAlign: 'left',
    paddingRight: 20
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
  cardBandText: {
    fontSize: 14,
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
    fontSize: 16,
    marginBottom: 5,
    color: '#fff'
  }
})