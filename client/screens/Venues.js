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
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'

// export default class Venues extends React.Component {
export default function Venues(props) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/venues')
      .then((response) => {
        // this.setState({
        console.log("venue response from db", response.data[0])
        setVenues(response.data);
        console.log("is setState working?", venues);
        // setVenues([
        //   {
        //     name: response.data.name,
        //     address1: response.data.address1,
        //     city: response.data.city,
        //     state: response.data.state,
        //     zip_code: response.data.zip_code,
        //   }
        // ])
        // console.log("we're outside useEffect", venues);
      })
      .catch((err) => {
        console.log("frontend not getting venues from db", err);
      })
  }, [])

  // const { name, address1, city, state, zip_code } = this.state;
  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Venues</Text>
        {venues.map(venue => {
          return (
            <Card
              title={venue.name}
              style={styles.card}
              backgroundColor='#fff'
              borderWidth={0}
              borderRadius={10}
              padding={10}
            // image={require('../images/pic2.jpg')}
            >
              <Text style={{ marginBottom: 10, color: '#000' }} key={venue.id} >Address:</Text>
              <Text style={{ marginBottom: 10, color: '#000' }} key={venue.id}>{venue.address}</Text>
              <Text style={{ marginBottom: 10, color: '#000' }} key={venue.id} >{venue.city}, {venue.state} {" "} {venue.zip_code}</Text>

              {/* <Text style={styles.cardText} key={venue.id} >Address:</Text> */}
              {/* <Text style={styles.cardText} key={venue.id}>{venue.address1}</Text> */}
              {/* <Text style={styles.cardText} key={venue.id}>{venue.city}, {venue.state} {" "} {venue.zip_code}</Text> */}
              {/* <Text style={styles.cardText}>{venue.zip_code}</Text> */}
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

