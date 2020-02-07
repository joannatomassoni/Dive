import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import SingleShowModal from '../modals/SingleShowModal'
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

export default function Shows(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);
  // const [flyer, setFlyer] = useState("");

  //request to get all shows
  const getAllShows = () => {
    axios.get('https://dive-266016.appspot.com/shows')
      .then((response) => {
        setShows(() => response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getRSVPS = () => {
    console.log('');
  }

  useEffect(() => {
    getAllShows();
  }, [])

  console.log(shows);

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <LinearGradient
        colors={['#38404C', '#111']}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ marginTop: 70 }}>
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
                    <SingleShowModal show={show} getRSVPS={getRSVPS}/>
                    <Text style={styles.cardDateText}>{show.date}</Text>
                    <Text style={styles.cardDateText}>{Moment(show.dateTime).format('LT')}</Text>
                    <Text style={styles.cardVenueText}>{show.venue.name}</Text>
                    <Text style={styles.cardBandText}>{show.bands[0].nickname}</Text>
                  </View>
                  <View>
                    <Text style={{marginTop: 10}}>
                      {show.flyer &&
                        <Image
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
          {/* modal for getting nearby shows */}
          {/* <ShowsNearBy /> */}
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
    fontSize: 50,
    color: '#3BAFBF',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20,
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
  },
  cardDateText: {
    fontSize: 16,
    color: '#75A4AD',
    fontWeight: '500',
    textAlign: 'left',
    paddingRight: 20
  },
  cardBandText: {
    fontSize: 18,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20
  },
  cardVenueText: {
    fontSize: 18,
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
    borderRadius: 10,
  },
})