import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import {
  Card,
  ListItem,
  Button,
  Icon,
} from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'

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
            // image={require('../images/pic2.jpg')}
            >
              <Text style={styles.cardText}>{show.time}</Text>
              {show.bands.map(band => {
                <Text style={styles.cardText}>{band.name}</Text>
              })}
              <Text style={styles.cardText}>{show.venue.name}</Text>
            </Card>
          )
        })}
        {/* implemented with Text and Button as children */}
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
  text: {
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


