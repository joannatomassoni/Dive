import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SignedInContext } from '../context/UserContext';
import SingleShowModal from '../modals/SingleShowModal';
import SpotifyButton from '../components/SpotifyButton';
import FacebookButton from '../components/FacebookButton';
import InstagramButton from '../components/InstagramButton';
import Moment from 'moment';
import { AXIOS_URL } from 'react-native-dotenv';
import { LinearGradient } from 'expo-linear-gradient';

export default function SingleBandModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);
  const [isFollowing, toggleFollowing] = useState(false);
  const getAllBands = props.getAllBands;
  const band = props.band;
 
  // request to see if user is following band
  const isUserFollowing = () => {
    axios.get(`https://dive-ios.appspot.com/fans/${userInfo.id}/bands`)
      .then((response) => {
        response.data.map(singleBand => {
          if (band.id === singleBand.id) {
            toggleFollowing(true);
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // request to get all shows for specific band if the user is following the band
  const allBandShows = () => {
    axios.get(`https://dive-ios.appspot.com/bands/${band.id}/shows`)
      .then((response) => {
        console.log('response');
        setShows(() => response.data.shows);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // request for user to follow band
  const followBand = () => {
    axios.post(`https://dive-ios.appspot.com/bands/${band.id}/fans`, {
      id_fan: userInfo.id
    })
      .then(() => {
        toggleFollowing(true)
      })
      .catch(error => console.log('failed to follow band', error))
  };
  // request for user to unfollow band
  const unfollowBand = () => {
    axios.delete(`https://dive-ios.appspot.com/bands/${band.id}/fans`, {
      data: {
        id_fan: userInfo.id,
      }
    })
      .then(() => {
        toggleFollowing(false)
      })
      .catch(error => console.log('failed to unfollow band', error))
  };

  const getRSVPS = () => {
    console.log('');
  }

  useEffect(() => {
    allBandShows();
    isUserFollowing();
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
          <Ionicons size={64} style={styles.menuIconContainer} 
            onPress={() => { 
              props.getFollowedBands();
              props.getRSVPS();
              setModalVisible(false) 
            }}> 
            <Ionicons
              name='ios-arrow-back'
              color='#59C3D1'
              size={32}
              style={styles.menuIcon}
            />
          </Ionicons>
          <LinearGradient
            colors={['#38404C', '#111']}
            style={{ flex: 1 }}
          >
          <ScrollView style={{ marginTop: 60 }}>
            <Text style={styles.headerText} key={band.id}>{band.nickname}</Text>
            {/* band photo */}
              {band.bandPhoto ?
                <View style={{ marginBottom: -75 }}>
                  <ImageBackground
                    style={{ width: 415, height: 415, alignSelf: 'center', }}
                    source={{ uri: band.bandPhoto }}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.3)', '#000']}
                      style={{ width: 415, height: 415, alignSelf: 'center', }}
                    >
                    </LinearGradient>
                  </ImageBackground>
                </View>
                : null}
            <Text style={styles.infoText}>{band.bio}</Text>
            {/* social media links */}
            <View style={styles.flexRowRight}>
              <SpotifyButton link={band.link_spotify} />
              <InstagramButton link={band.link_instagram} />
              <FacebookButton link={band.link_facebook} />
            </View>
            {/* if user is signed in show button to follor band */}
            {userInfo.signedIn ?
              (isFollowing ?
                // if following, show unfollow button
                <TouchableOpacity
                  style={styles.unfollowButtonContainer}
                  onPress={() => {  unfollowBand() }}
                >
                  <Text style={styles.followButtonText}>Unfollow</Text>
                </TouchableOpacity>
                :
                // if not following, show follow button
                <TouchableOpacity
                  style={styles.followButtonContainer}
                  onPress={() => { followBand() }}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>)
              : null
            }
            <Text style={styles.headerText}>Shows</Text>
            {shows && shows.map(show => {
              return (
                <View>
                  <Card
                    style={styles.card}
                    key={show.id} 
                    backgroundColor='#111'
                    padding={10}
                    borderRadius={10}
                    containerStyle={styles.card}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <SingleShowModal show={show} getRSVPS={getRSVPS}/>
                        <Text style={styles.cardDateText}>{Moment(show.dateTime).format('ll')}</Text>
                        <Text style={styles.cardDateText}>{Moment(show.dateTime).format('LT')}</Text>
                        <Text style={styles.cardVenueText}>{show.venue.name}</Text>
                      </View>
                      <View>
                        {/* show flyer */}
                        <Text >
                          {show.flyer &&
                            <Image
                              style={{ justifyContent: 'right' }}
                              style={styles.photo}
                              source={{ uri: show.flyer }}
                            />
                          }
                        </Text>
                      </View>
                    </View>
                  </Card>
                </View>
              )
            })}
          </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
      {/* create show button when modal is hidden */}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {band.nickname ? 
        <Text style={styles.cardHeaderText}>{band.nickname}</Text>
          :
        <Text style={styles.cardHeaderText}>{band.name}</Text>
      }
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
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20,
    paddingLeft: 40
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
    paddingBottom: 5
  },
  followButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  cardDateText: {
    fontSize: 16,
    color: '#75A4AD',
    fontWeight: '500',
    textAlign: 'left',
    paddingRight: 20
  },
  cardVenueText: {
    fontSize: 18,
    color: '#AA8181',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
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
  flexRowRight: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  menuIcon: {
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
  cardHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#fff'
  },
  cardVenueText: {
    fontSize: 18,
    color: '#AA8181',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  cardDateText: {
    fontSize: 16,
    color: '#75A4AD',
    fontWeight: '500',
    textAlign: 'left',
    paddingRight: 20
  },
  cardText: {
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  card: {
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10
  },
})