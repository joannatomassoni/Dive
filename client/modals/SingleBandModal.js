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

export default function SingleBandModal(props) {
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleBand, setBand] = useState([]);
  const [shows, setShows] = useState([]);
  const [isFollowing, toggleFollowing] = useState(false);
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  let band = props.name;
  let bandId = props.bandId;

  useEffect(() => {
    axios.get(`${AXIOS_URL}/bands/${bandId}/shows`)
      .then((response) => {
        // console.log("getting a bands shows from db", response.data)
        setBand(response.data);
        setShows(response.data.shows);
      })
      .then(() => {
        // axios request to see if user is following band
        axios.get(`${AXIOS_URL}/fans/${userInfo.id}/bands`)
          .then((response) => {
            response.data.map(band => {
              if (band.id === singleBand.id) {
                toggleFollowing(true);
              }
            })
          })
      })
      .catch((err) => {
        console.log(err);
      })
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
            <Text style={styles.headerText} key={singleBand.id}>{singleBand.name}</Text>

            {/* tag for band photo */}
            {/* <Image
              style={{ width: 420, height: 200 }}
              source={{ uri: singleBand.bandPhoto }}
            /> */}

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
                  onPress={() => {
                    axios.delete(`${AXIOS_URL}/bands/${singleBand.id}/fans`, {
                      data: {
                        id_fan: userInfo.id,
                      }
                    })
                      .then(() => {
                        toggleFollowing(false)
                      })
                      .catch(error => console.log('failed to unfollow band', error))
                  }}
                >
                  <Text style={styles.followButtonText}>Unfollow</Text>
                </TouchableOpacity>
                :
                // if not following, show follow button
                <TouchableOpacity
                  style={styles.followButtonContainer}
                  onPress={() => {
                    axios.post(`${AXIOS_URL}/bands/${bandId}/fans`, {
                      id_fan: userInfo.id
                    })
                      .then(() => {
                        toggleFollowing(true)
                      })
                      .catch(error => console.log('failed to follow band', error))
                  }}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>)
              : null
            }
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
                  >
                    <Text style={{ color: '#000' }}>{show.date}</Text>
                    <Text style={{ color: '#000' }}>{show.time}</Text>
                    <Text style={{ color: '#000' }}>{show.venue.name}</Text>
                    <Text style={{ color: '#000' }}>{show.description}</Text>
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
          axios.get(`${AXIOS_URL}/users/${band}`)
            .then((response) => {
              setBand(response.data);
            })
            .catch((err) => {
              console.log("error getting single band from db", err);
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
    backgroundColor: '#C70039',
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
  }
})