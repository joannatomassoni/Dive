import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import CreateCommentModal from './CreateCommentModal'
import axios from 'axios';


export default function SingleShowModal(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  //set username to text in username textInput
  const [showTitle, setShowTitle] = useState('');
  const [singleShow, setSingleShow] = useState([]);
  const [bands, setBands] = useState([]);
  const [comments, setComments] = useState([]);
  // console.log(props);
  let show = props.show;

  useEffect(() => {
    axios.get(`http://localhost:8080/shows/${show}`)
      .then((response) => {
        // this.setState({
        console.log("getting band", response.data)
        setBands(response.data.bands);
      })
      .catch((err) => {
        console.log("frontend not getting single show from db", err);
      });

    axios.get(`http://localhost:8080/shows/${show}/comments`)
      .then((response) => {
        // this.setState({
        console.log("getting band", response.data)
        setComments(response.data)
      })
      .catch((err) => {
        console.log("frontend not getting single show from db", err);
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

            <Text style={{ marginBottom: 10, color: '#fff' }}>{singleShow.name}</Text>
            <Text style={{ marginBottom: 10, color: '#fff' }}>{singleShow.time}</Text>
            {bands.map(band => {
              return (
                <Text style={{ marginBottom: 10, color: '#fff' }}>{band.name}</Text>
              )
            })}
            {/* <Text style={{ marginBottom: 10, color: '#fff' }} key={show.id}>{singleShow.venue.name}</Text> */}
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
                // image={require('../images/pic2.jpg')}
                >
                  <Text style={styles.cardText} key={comment.user.id}>Username: {comment.user.name}</Text>
                  <Text style={styles.cardText}>{comment.text}</Text>
                  <Text style={styles.cardText}>{comment.createdAt}</Text>
                </Card>
              )
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* create comment button when modal is hidden */}
      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => {
          setModalVisible(true);
          //axios
          axios.get(`http://localhost:8080/shows/${show}`)
            .then((response) => {
              // this.setState({
              console.log("getting single show", response.data)
              setSingleShow(response.data);
            })
            .catch((err) => {
              console.log("error getting single show from db", err);
            })
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

  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})


