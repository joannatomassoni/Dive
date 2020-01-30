import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import SingleShowModal from '../modals/SingleShowModal'
import { AXIOS_URL } from 'react-native-dotenv';

export default function Shows(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);
  // const [flyer, setFlyer] = useState("");

  useEffect(() => {
    axios.get(`${AXIOS_URL}/shows`)
      .then((response) => {
        setShows(response.data);

      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.headerText}>Shows</Text>
        {shows.map(show => {
          return (
            <Card
              title={show.name}
              style={styles.card}
              key={show.id}
              backgroundColor='#fff'
              borderRadius={10}
              padding={10}
            // image={require('../images/pic2.jpg')}
            >
              <Text style={styles.cardText}>{show.time}</Text>
              {show.bands.map(band => {
                return (
                  <Text style={styles.cardText} key={band.id}>{band.name}</Text>
                )
              })}
              <Text style={styles.cardText} key={show.venue.id}>{show.venue.name}</Text>
              <SingleShowModal show={show.id} />
              <Text>

                {show.flyer &&
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: show.flyer }}
                  />

                }
              </Text>
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
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
  },
  cardText: {
    fontSize: 15,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
})