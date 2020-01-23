// import React from 'react';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import MenuButton from '../components/MenuButton'

// export default class Venues extends React.Component {
export default function Venues(props) {
  const [venues, setVenues] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/venues')
      .then((response) => {
        // this.setState({
        setVenues(
          {
            name: response.data[4].name,
            address1: response.data[4].address1,
            city: response.data[4].city,
            state: response.data[4].state,
            zip_code: response.data[4].zip_code,
          }
        )
        console.log('component mounted');
      })
      .catch((err) => {
        console.log("frontend not getting venues from db", err);
      })
  })

  // const { name, address1, city, state, zip_code } = this.state;
  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.text}>Venues</Text>
      <Text style={styles.text}>{venues.name}</Text>
      <Text style={styles.text}>{venues.address1}</Text>
      <Text style={styles.text}>{venues.city}</Text>
      <Text style={styles.text}>{venues.state}</Text>
      <Text style={styles.text}>{venues.zip_code}</Text>
    </View>
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