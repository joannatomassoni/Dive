import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  Card,
  ListItem,
  Button,
  Icon,
} from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import SingleShowModal from '../modals/SingleShowModal'

export default function Shows(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/shows')
      .then((response) => {
        console.log("shows response from db", response.data[0])
        setShows(response.data);
      })
      .catch((err) => {
        console.log("frontend not getting shows from db", err);
      })
  }, [])

  //dummy data
  const users = [
    {
      name: 'Ryan',
      avatar: "https://lh3.googleusercontent.com/a-/AAuE7mAY3iahzehnNyuj1PJ8iiDn1zi8v7LFz7jB6dzcPw"
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Shows</Text>
        {shows.map(show => {
          return (
            <Card
              title={show.name}
              style={styles.card}
              backgroundColor='#fff'
              borderWidth={0}
              borderRadius={10}
              padding={10}
            // image={require('../images/pic2.jpg')}
            >
              <Text style={styles.cardText} key={show.id}>{show.time}</Text>
              {show.bands.map(band => {
                <Text style={styles.cardText} key={band.id}>{band.name}</Text>
              })}
              <Text style={styles.cardText} key={show.venue.id}>{show.venue.name}</Text>
              {/* <SingleShowModal show={show.id} /> */}
            </Card>
          )
        })}
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'left',
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
    fontSize: 20,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
})


