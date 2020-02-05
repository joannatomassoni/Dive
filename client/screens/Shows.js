import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Card, Divider } from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import SingleShowModal from '../modals/SingleShowModal'
import Moment from 'moment';
import { AXIOS_URL } from 'react-native-dotenv';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

export default function Shows(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);
  const [location, setLocation] = useState({});

  // const [flyer, setFlyer] = useState("");

  //request to get all shows
  const getAllShows = () => {
    axios.get(`${AXIOS_URL}/shows`)
      .then((response) => {
        setShows(() => response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("can't get location");
      // this.setState({
      //   errorMessage: 'Permission to access location was denied',
      // });
    }

    let locationObj = await Location.getCurrentPositionAsync({});
    locationObj = JSON.stringify(locationObj);
    setLocation(location);
  };


  useEffect(() => {
    getAllShows();
    getLocationAsync();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.headerText}>Shows</Text>
        {shows && shows.map(show => {
          return (
            <Card
              key={show.id}
              backgroundColor='#111'
              padding={10}
              borderRadius={10}
              containerStyle={styles.card}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  {/* modal to display single show info */}
                  <SingleShowModal show={show.id} showName={show.name} />
                  <Text style={styles.cardText}>{show.date}</Text>
                  <Text style={styles.cardText}>{Moment(show.dateTime).format('LT')}</Text>
                  {show.bands ?
                    show.bands.map(band => {
                      <Text style={styles.cardText} key={band.id}>{band.name}</Text>
                    })
                    : null}
                  <Text style={styles.cardVenueText} key={show.venue.id}>{show.venue.name}</Text>
                </View>
                <View >
                  {/* show flyer */}
                  <Text >
                    {show.flyer &&
                      <Image
                        style={{ justifyContent: 'right' }}
                        style={styles.photo}
                        source={{ uri: show.flyer }}
                      />
                    }
                  </Text>
                </View>
              </View>
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
    color: '#3BAFBF',
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
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  cardVenueText: {
    fontSize: 16,
    color: '#AA8181',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  card: {
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
})


