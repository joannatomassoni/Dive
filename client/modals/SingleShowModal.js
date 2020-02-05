import React, { useState, useContext, useEffect } from 'react';
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
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import CreateCommentModal from './CreateCommentModal';
import Moment from 'moment';
import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';
import * as Calendar from 'expo-calendar';
import SingleBandModal from './SingleBandModal'

export default function SingleShowModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //all info for specific show
  const [singleShow, setSingleShow] = useState({});
  //array of all additional bands in show
  const [bands, setBands] = useState([]);
  //array of all comments
  const [comments, setComments] = useState([]);
  //user's rsvp status
  const [rsvp, setRsvp] = useState(false);
  //info required for axios calls
  let show = props.show;
  let venueId = props.showVenueId;
  //console.log("props", props);
  const [venueID, setVenueId] = useState("");
  const [venueName, setVenueName] = useState("");

  //request to get all comments for specific show
  const getShowComments = () => {
    axios.get(`${AXIOS_URL}/shows/${show}/comments`)
      .then((response) => {
        setComments(() => response.data.reverse())
      })
      .catch((err) => {
        console.log(err);
      })
  }
  //request to get all additional bands for specific show
  const getShowBands = () => {
    axios.get(`${AXIOS_URL}/shows/${show}`)
      .then((response) => {
        setBands(() => response.data.bands);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //request to get all info for current show
  const getShowInfo = () => {
    axios.get(`${AXIOS_URL}/shows/${show}`)
      .then((response) => {
        setVenueId(response.data.venue.id);
        setVenueName(response.data.venue.name)
        setSingleShow(response.data);
      })
      .catch((err) => {
        console.log("error getting single show info", err);
      });
  }
  //request to get user's rsvp info
  const getRsvpInfo = () => {
    axios.get(`${AXIOS_URL}/fans/${userInfo.id}/rsvps`)
      .then((response) => {
        response.data.map(show => {
          if (show.id === singleShow.id) {
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
    axios.post(`${AXIOS_URL}/shows/rsvps`, {
      id_fan: userInfo.id,
      id_show: singleShow.id,
    })
      .then(response => setRsvp(true))
      .then(createEvent())
      .catch(error => console.log('failed to rsvp', error));
  }
  //request to remove rsvp
  const removeRsvp = () => {
    axios.delete(`${AXIOS_URL}/shows/rsvps`, {
      data: {
        id_fan: userInfo.id,
        id_show: singleShow.id,
      }
    })
      .then(response => setRsvp(false))
      .then(createEvent())
      .catch(error => console.log('failed to rsvp', error));
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
    title: singleShow.name,
    startDate: singleShow.dateTime,
    endDate: singleShow.dateTime,
    notes: singleShow.description ? singleShow.description : 'RSVPd show',
    navigationBarIOS: {
      tintColor: 'orange',
      backgroundColor: 'green',
      titleColor: 'blue',
    },
  };

  console.log("single show", singleShow);
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
            <Text style={styles.headerText} key={show.id}>{singleShow.name}</Text>
            {/* show flyer */}
            {singleShow.flyer ?
              <Image
                style={{ width: 400, height: 400, marginLeft: 5 }}
                source={{ uri: singleShow.flyer }}
              />
              : null}

            {/* additional text */}
            <Text style={styles.infoText}>{singleShow.date}</Text>
            <Text style={styles.infoText}>{singleShow.time}</Text>
            <Text style={styles.infoText}>{venue}</Text>
            <Text style={styles.infoText}>{singleShow.description}</Text>
            {/* list of all additional bands playing in current show */}
            {bands.map(band => {
              return (
                <View style={styles.bandModal}>
                  <SingleBandModal name={band.name} bandId={band.id} />
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
                showId={singleShow.id}
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
                  <Text style={styles.cardTextUsername} key={comment.user.id}>{comment.user.name}</Text>
                  <Text style={styles.cardText}>{comment.text}</Text>
                  <Text style={styles.cardTextTime}>{Moment(comment.createdAt).fromNow()}</Text>
                </Card>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* show more button when modal is hidden */}
      <TouchableOpacity
        onPress={async () => {
          //request to get all info for current show
          await getShowInfo();
          //request to get user's rsvp info
          await getRsvpInfo();
          //get all bands for specific show
          await getShowBands();
          //get all comments for specific show
          await getShowComments();
          getRsvpInfo();

          setModalVisible(true);
        }}
      >
        <Text style={styles.modalShowText}>{props.showName}</Text>
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
    color: '#fff'
  },
  card: {
    borderWidth: 0,
  }
})

