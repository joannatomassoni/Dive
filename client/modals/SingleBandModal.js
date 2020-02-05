import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
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
import { AXIOS_URL } from 'react-native-dotenv';
import { LinearGradient } from 'expo-linear-gradient';

export default function SingleBandModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleBand, setBand] = useState([]);
  const [shows, setShows] = useState([]);
  const [isFollowing, toggleFollowing] = useState(false);
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const getAllBands = props.getAllBands;
  let band = props.name;
  let bandId = props.bandId;

  // request to see if user is following band
  const isUserFollowing = () => {
    axios.get(`https://dive-266016.appspot.com/fans/${userInfo.id}/bands`)
      .then((response) => {
        response.data.map(band => {
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
    axios.get(`https://dive-266016.appspot.com/bands/${bandId}/shows`)
      .then((response) => {
        setBand(() => response.data);
        setShows(() => response.data.shows);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // get all single band info
  const getSingleBandInfo = () => {
    axios.get(`https://dive-266016.appspot.com/users/${band}`)
      .then((response) => {
        setBand(response.data);
      })
      .catch((err) => {
        console.log("error getting single band from db", err);
      })
  };
  // request for user to follow band
  const followBand = () => {
    axios.post(`https://dive-266016.appspot.com/bands/${bandId}/fans`, {
      id_fan: userInfo.id
    })
      .then(() => {
        toggleFollowing(true)
      })
      .catch(error => console.log('failed to follow band', error))
  };
  // request for user to unfollow band
  const unfollowBand = () => {
    axios.delete(`https://dive-266016.appspot.com/bands/${singleBand.id}/fans`, {
      data: {
        id_fan: userInfo.id,
      }
    })
      .then(() => {
        toggleFollowing(false)
      })
      .catch(error => console.log('failed to unfollow band', error))
  };

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
              getAllBands();
              setModalVisible(false) 
            }}> 
            <Ionicons
              name='ios-arrow-back'
              color='#59C3D1'
              size={32}
              style={styles.menuIcon}
              // onPress={() => { setModalVisible(false) }}
            />
          </Ionicons>
          <LinearGradient
            colors={['#38404C', '#111']}
            style={{ flex: 1 }}
          >
          <ScrollView style={{ marginTop: 70 }}>
            <Text style={styles.headerText} key={singleBand.id}>{band}</Text>
            {/* band photo */}
            {singleBand.bandPhoto ? 
              <Image
                style={{ width: 420, height: 200 }}
                source={{ uri: singleBand.bandPhoto }}
              />
            : null}
            {/* social media links */}
            <View style={styles.flexRowRight}>
              <SpotifyButton link={singleBand.link_spotify} />
              <InstagramButton link={singleBand.link_instagram} />
              <FacebookButton link={singleBand.link_facebook} />
            </View>

            <Text style={styles.infoText}>{singleBand.bio}</Text>
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
                        <SingleShowModal show={show.id} showName={show.name}/>
                        <Text style={styles.cardText}>{show.date}</Text>
                        <Text style={styles.cardText}>{show.time}</Text>
                        <Text style={styles.cardText}>{show.venue.name}</Text>
                        <Text style={styles.cardText}>{show.description}</Text>
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
        style={styles.signupContainer}
        onPress={() => {
          setModalVisible(true);
          getSingleBandInfo();
        }}
      >
        <Text style={styles.cardHeaderText}>{singleBand.nickname}</Text>
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
    paddingRight: 20
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
    paddingBottom: 5,
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
    marginTop: 2,
    marginBottom: 10,
    color: '#fff'
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