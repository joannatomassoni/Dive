// // import React from 'react';
// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View } from 'react-native';
// import axios from 'axios';
// import MenuButton from '../components/MenuButton'


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
    <SafeAreaView >
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Venues</Text>
        {venues.map(venue => {
          return (
            <Card
              title={venue.name}
              style={styles.card}
            // image={require('../images/pic2.jpg')}
            >
              <Text>Address:</Text>
              <Text>{venue.address1}</Text>
              <Text>{venue.city}, {venue.state}</Text>
              <Text>{venue.zip_code}</Text>
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
    fontSize: 30,
    color: '#fff'
  }
})

