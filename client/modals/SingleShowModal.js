import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import CreateCommentModal from './CreateCommentModal';
import Moment from 'moment';
import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';
import * as Calendar from 'expo-calendar';
import SingleBandModal from './SingleBandModal'
import { LinearGradient } from 'expo-linear-gradient';

export default function SingleShowModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //array of all comments
  const [comments, setComments] = useState([]);
  //user's rsvp status
  const [rsvp, setRsvp] = useState(false);
  const show = props.show;
  const venue = show.venue;
  const bands = show.bands

  //dummy function so SingleBandModal doesn't throw an error
  const getAllBands = () => {
    console.log('');
  }
  //request to get all comments for specific show
  const getShowComments = () => {
    axios.get(`https://dive-266016.appspot.com/shows/${show.id}/comments`)
      .then((response) => {
        setComments(() => response.data.reverse())
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //request to get user's rsvp info
  const getRsvpInfo = () => {
    axios.get(`https://dive-266016.appspot.com/fans/${userInfo.id}/rsvps`)
      .then((response) => {
        response.data.map((rsvp) => {
          if (show.id === rsvp.id) {
            setRsvp(true);
          }
        })
      })
      .catch((err) => {
        console.log("error getting rsvp info", err);
      });
  }
  //request to add rsvp
  const addRsvp = () => {
    axios.post(`https://dive-266016.appspot.com/shows/rsvps`, {
      id_fan: userInfo.id,
      id_show: show.id,
    })
      .then(() => setRsvp(true))
      .then(createEvent())
      .catch(error => console.log('failed to rsvp', error));
  }
  //request to remove rsvp
  const removeRsvp = () => {
    axios.delete(`https://dive-266016.appspot.com/shows/rsvps`, {
      data: {
        id_fan: userInfo.id,
        id_show: show.id,
      }
    })
      .then(() => setRsvp(false))
      .then(() => createEvent())
      .catch(error => console.log('failed to cancel rsvp', error));
  }
  //create event on user's dive calendar
  const createEvent = async () => {
    try {
      const eventId = await Calendar.createEventAsync(userInfo.calID, details);
      console.log("added event");
    }
    catch (error) {
      console.log('Error', error);
    }
  }

  // event details for calendar integration
  const details = {
    title: show.name,
    startDate: show.dateTime,
    endDate: show.dateTime,
    notes: show.description ? show.description : 'RSVPd show',
    navigationBarIOS: {
      tintColor: 'orange',
      backgroundColor: 'green',
      titleColor: 'blue',
    },
  };

  useEffect(() => {
    //get whether user is rsvpd or not
    getRsvpInfo();
    //get all comments for specific show
    getShowComments();
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
              <Text style={styles.headerText} key={show.id}>{singleShow.name}</Text>
              {/* show flyer */}
              {show.flyer ?
                <Image
                  style={{ width: 400, height: 400, marginLeft: 5 }}
                  source={{ uri: show.flyer }}
                />
                : null}
              {/* additional text */}
              <Text style={styles.infoText}>{Moment(show.dateTime).format('ll')}</Text>
              <Text style={styles.infoText}>{Moment(show.dateTime).format('LT')}</Text>
              <Text style={styles.infoText}>{venue.name}</Text>
              <Text style={styles.infoText}>{show.description}</Text>
              {/* list of all additional bands playing in current show */}
              {bands.map(band => {
                return (
                  <View style={styles.bandModal}>
                    <SingleBandModal getAllBands={getAllBands} name={band.name} bandId={band.id} />
                  </View>
                )
              })}
              <View style={{
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                marginTop: 10
              }}>
                {/* add to calendar button */}
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={async () => {
                    try {
                      const eventId = await Calendar.createEventAsync(userInfo.calID, details);
                      console.log('added event');
                    }
                    catch (error) {
                      console.log('Error', error);
                    }
                  }}
                >
                  <Text style={styles.signupButtonText}>Add To Calendar</Text>
                </TouchableOpacity>
                {/* button to rsvp to specific (shows when signed in) */}
                {userInfo.signedIn ?
                  //if already rsvp'd, show button to cancel rvp
                  (rsvp ? <TouchableOpacity
                    style={styles.cancelButtonContainer}
                    onPress={() => {
                      removeRsvp();
                    }}
                  >
                    <Text style={styles.signupButtonText}>Cancel RSVP</Text>
                  </TouchableOpacity>
                    //if not rsvp'd, show rsvp button
                    : <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={() => {
                        addRsvp();
                      }}
                    >
                      <Text style={styles.signupButtonText}>RSVP</Text>
                    </TouchableOpacity>)
                  : null}
              </View>
              {/* button to create a new comment (shows when signed in) */}
              {userInfo.signedIn ?
                <CreateCommentModal
                  userId={userInfo.id}
                  showId={show.id}
                  getShowComments={getShowComments}
                />
                : null}
              {/* cards to hold comments */}
              {comments.map(comment => {
                return (
                  <Card
                    style={styles.card}
                    key={comment.id}
                    backgroundColor='#111'
                    padding={10}
                    borderRadius={5}
                    containerStyle={styles.card}
                  >
                    <Text style={styles.cardTextUsername} key={comment.user.id}>{comment.user.nickname}</Text>
                    <Text style={styles.cardText}>{comment.text}</Text>
                    <Text style={styles.cardTextTime}>{Moment(comment.createdAt).fromNow()}</Text>
                  </Card>
                )
              })}
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* show more button when modal is hidden */}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.modalShowText}>{show.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    justifyContent: 'center',
  },
  bandModal: {
    fontSize: 20,
    color: '#fff',
    paddingLeft: 290,
    paddingBottom: 5,

  },
  headerText: {
    fontSize: 45,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  signupButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  buttonContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    marginHorizontal: 7
  },
  cancelButtonContainer: {
    backgroundColor: '#AA8181',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    marginHorizontal: 7
  },
  cardTextUsername: {
    fontSize: 17,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    marginBottom: 4
  },
  cardText: {
    fontSize: 15,
    color: '#fff',
    padding: 1,
  },
  cardTextTime: {
    color: '#75A4AD',
    padding: 1,
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
    paddingBottom: 5
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
  modalShowText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  card: {
    borderWidth: 0,
  }
})

