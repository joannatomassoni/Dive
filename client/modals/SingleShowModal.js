import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import CreateCommentModal from './CreateCommentModal';
import Moment from 'moment';
import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';


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

  useEffect(() => {
    //request to get all additional bands for specific show
    axios.get(`${AXIOS_URL}/shows/${show}`)
      .then((response) => {
        setBands(response.data.bands);
      })
      .catch((err) => {
        console.log("error getting shingle show info", err);
      });
    //request to get all comments for specific show
    axios.get(`${AXIOS_URL}/shows/${show}/comments`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((err) => {
        console.log("error getting comments for show", err);
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
            {/* header */}
            <Text style={styles.headerText} key={show.id}>{singleShow.name}</Text>
            {/* additional text */}
            <Text style={{ marginBottom: 10, color: '#fff' }}>{singleShow.date}</Text>
            <Text style={{ marginBottom: 10, color: '#fff' }}>{singleShow.time}</Text>
            <Text style={{ marginBottom: 10, color: '#fff' }}>{singleShow.description}</Text>
            {/* list of all additional bands playing in current show */}
            {bands.map(band => {
              return <Text style={{ marginBottom: 10, color: '#fff' }}>{band.name}</Text>
            })}
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
                }}
              >
                <Text style={styles.signupButtonText}>RSVP</Text>
              </TouchableOpacity>)
              : null}
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
            })
            .catch((err) => {
              console.log("error getting single show info", err);
            });
          //request to get user's rsvp info
          axios.get(`${AXIOS_URL}/fans/${userInfo.id}/rsvps`)
            .then((response) => {
              response.data.map(show => {
                if (show.id === singleShow.id){
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
    marginHorizontal: 90,
    marginBottom: 15
  },
  cancelButtonContainer: {
    backgroundColor: '#C70039',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 15
  },
  cardTextUsername: {
    fontWeight: 'bold'
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})


