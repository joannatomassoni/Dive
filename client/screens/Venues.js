import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import MenuButton from '../components/MenuButton';
import AddVenueModal from '../modals/AddVenueModal';
import SingleVenueModal from '../modals/SingleVenueModal';
import { AXIOS_URL } from 'react-native-dotenv';

// export default class Venues extends React.Component {
export default function Venues(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios.get(`${AXIOS_URL}/venues`)
      .then((response) => {
        setVenues(response.data);
      })
      .catch((err) => {
        console.log("error getting venues", err);
      })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Venues</Text>
        {/* modal to add a new venue to the venue db */}
        {userInfo.userType === 'band' ? <AddVenueModal /> : null}
        {venues.reverse().map(venue => {
          return (
            <Card
              title={venue.name}
              style={styles.card}
              key={venue.id}
              backgroundColor='#fff'
              borderWidth={0}
              borderRadius={10}
              padding={10}
            >
              <Text style={{color: '#000' }}>{venue.address}</Text>
              <Text style={{color: '#000' }}>{venue.city}, {venue.state} {" "} {venue.zip_code}</Text>
              <SingleVenueModal venueID={venue.id} />
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
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    color: '#59C3D1',
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
    fontSize: 20,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
})

