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

export default function SingleShowModal(props) {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  }
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
  //start time for adding to calendar
  const [startTime, setStartTime] = useState('');
  //end time for adding to calendar
  const [endTime, setEndTime] = useState('');
  //info required for axios calls
  let show = props.show;

  useEffect(() => {
    //request to get all additional bands for specific show
    axios.get(`${AXIOS_URL}/shows/${show}`)
      .then((response) => {
        setBands(() => response.data.bands);
      })
      .catch((err) => {
        console.log(err);
      });
    //request to get all comments for specific show
    axios.get(`${AXIOS_URL}/shows/${show}/comments`)
      .then((response) => {
        setComments(() => response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    //request to access users calendar
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log({ calendars });
      }
    })();
  }, [])

  // event details for calendar integration
  const details = {
    title: singleShow.name,
    startDate: singleShow.dateTime,
    endDate: singleShow.dateTime,
    notes: singleShow.description,
    navigationBarIOS: {
      tintColor: 'orange',
      backgroundColor: 'green',
      titleColor: 'blue',
    },
  };

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
            {/* header */}
            <Text style={styles.headerText} key={show.id}>{singleShow.name}</Text>
            {/* tag for show flyer modal */}
            {/* <Image
              style={{ width: 420, height: 200 }}
              source={{ uri: singleShow.flyer }}
            /> */}
            {/* additional text */}
            <Text style={styles.infoText}>{singleShow.date}</Text>
            <Text style={styles.infoText}>{singleShow.time}</Text>
            <Text style={styles.infoText}>{singleShow.description}</Text>
            {/* list of all additional bands playing in current show */}
            {bands.map(band => {
              return <Text style={styles.infoText}>{band.name}</Text>
            })}
            <View style={{
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
            }}>
            {/* add to calendar button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={ async () => {
                try {
                  console.log('Adding Event');
                  const eventId = await Calendar.createEventAsync("D5A65218-29C5-466C-A2CE-D54DF9D4260A", details);
                  console.log("Event Id", id);
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
                  axios.delete(`${AXIOS_URL}/shows/rsvps`, {
                    data: {
                      id_fan: userInfo.id,
                      id_show: singleShow.id,
                    }
                  })
                    .then(response => setRsvp(false))
                    .catch(error => console.log('failed to rsvp', error));
                }}
              >
                <Text style={styles.signupButtonText}>Cancel RSVP</Text>
              </TouchableOpacity>
                //if not rsvp'd, show rsvp button
                : <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    axios.post(`${AXIOS_URL}/shows/rsvps`, {
                      id_fan: userInfo.id,
                      id_show: singleShow.id,
                    })
                      .then(response => setRsvp(true))
                      .catch(error => console.log('failed to rsvp', error));
                    async () => {
                      try {
                        console.log('Adding Event');
                        const eventId = await Calendar.createEventAsync("D5A65218-29C5-466C-A2CE-D54DF9D4260A", details);
                        console.log("Event Id", id);
                      }
                      catch (error) {
                        console.log('Error', error);
                      }
                    };
                  }}
                >
                  <Text style={styles.signupButtonText}>RSVP</Text>
                </TouchableOpacity>)
              : null}
              </View>
            {/* button to create a new comment (shows when signed in) */}
            {userInfo.signedIn ? <CreateCommentModal userId={userInfo.id} showId={singleShow.id} /> : null}
            {/* cards to hold comments */}
            {comments.map(comment => {
              return (
                <Card
                  style={styles.card}
                  key={comment.id}
                  backgroundColor='#fff'
                  borderRadius={10}
                  padding={10}
                >
                  <Text style={styles.cardTextUsername} key={comment.user.id}>{comment.user.name}</Text>
                  <Text style={styles.cardText}>{comment.text}</Text>
                  <Text style={styles.cardText}>{Moment(comment.createdAt).fromNow()}</Text>
                </Card>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* show more button when modal is hidden */}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          //request to get all info for current show
          axios.get(`${AXIOS_URL}/shows/${show}`)
            .then((response) => {
              setSingleShow(response.data);
              setStartTime(response.data.dateTime);
              setEndTime(Moment(response.data.dateTime).add(2, 'hours'));
            })
            .catch((err) => {
              console.log("error getting single show info", err);
            });
          //request to get user's rsvp info
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

        }}
      >
        <Text>Show More</Text>
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
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    opacity: 0.9,
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
    backgroundColor: '#C70039',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    marginHorizontal: 7
  },
  cardTextUsername: {
    fontWeight: 'bold'
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
  }
})


