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
        const venues = response.data.sort((a, b) => (a.name < b.name ? 1 : -1))
        setVenues(() => venues);
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
        <View style={{
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.headerText}>Venues</Text>
          {/* modal to add a new venue to the venue db */}
          {userInfo.userType === 'band' ? <AddVenueModal /> : null}
        </View>
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
              <Text style={styles.cardText}>{venue.city}, {venue.state}</Text>
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
  headerText: {
    fontSize: 38,
    color: '#3BAFBF',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 20
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
    fontSize: 13,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
})

