import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,View
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import MenuButton from '../components/MenuButton';
import AddVenueModal from '../modals/AddVenueModal';
import SingleVenueModal from '../modals/SingleVenueModal';
import { AXIOS_URL } from 'react-native-dotenv';
import { LinearGradient } from 'expo-linear-gradient';

// export default class Venues extends React.Component {
export default function Venues(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [venues, setVenues] = useState([]);

  const getAllVenues = () => {
    axios.get(`https://dive-ios.appspot.com/venues`)
      .then((response) => {
        setVenues(() => response.data.reverse());
      })
      .catch((err) => {
        console.log("error getting venues", err);
      })
  }

  useEffect(() => {
    getAllVenues();
  }, [])

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <LinearGradient
        colors={['#38404C', '#111']}
        style={{ flex: 1 }}
      >
      <ScrollView style={{ marginTop: 70 }}>
        <Text style={styles.text}>Venues</Text>
        {/* modal to add a new venue to the venue db */}
        {userInfo.userType === 'band' ? <AddVenueModal /> : null}
        {venues.reverse().map(venue => {
          return (
            <Card
              key={venue.id}
              backgroundColor='#111'
              padding={10}
              borderRadius={10}
              containerStyle={styles.card}
            >
              <SingleVenueModal venue={venue}/>
              <Text style={styles.cardText}>{venue.address}</Text>
              <Text style={styles.cardText}>{venue.city}, {venue.state} {" "} {venue.zip_code}</Text>
            </Card>
          )
        })}
      </ScrollView>
      </LinearGradient>
    </View >
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
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10 
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
  },
  cardText: {
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
})

