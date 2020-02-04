import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import MenuButton from '../components/MenuButton';
import SpotifyButton from '../components/SpotifyButton';
import FacebookButton from '../components/FacebookButton';
import InstagramButton from '../components/InstagramButton';
import CreateShowModal from '../modals/CreateShowModal';
import EditBandBioModal from '../modals/EditBandBioModal';
import EditShowModal from '../modals/EditShowModal';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Calendar from '../components/Calendar';
import { AXIOS_URL } from 'react-native-dotenv';
import SingleBandModal from '../modals/SingleBandModal';
import SingleShowModal from '../modals/SingleShowModal';
import PreviousRSVPShows from '../modals/PreviousRsvpShows';
import moment from 'moment';


export default function Hub(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //hub info to display
  const [hubInfo, setHubInfo] = useState({});
  const [shows, setShows] = useState([]);
  const [dbPhoto, setDbPhoto] = useState('');
  // const [oldShows, setOldShows] = useState([]);
  const [fanShows, setFanShows] = useState([]);
  const [followed, setFollowed] = useState([]);
  console.log(shows);


  //gets band info
  const getBandInfo = async () => {
    await axios.get(`${AXIOS_URL}/users/${userInfo.username}`)
      .then((response) => {
        // console.log("getting band info", response.data);
        setHubInfo(() => response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //gets a list of all of a bands shows
  const getBandsShows = async () => {
    await axios.get(`${AXIOS_URL}/bands/${userInfo.id}/shows`)
      .then((response) => {
        setShows(() => response.data.shows.filter((show) => {
          return moment(show.dateTime).toDate() > new Date();
        }))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //gets bands photo from database
  const getPhoto = async () => {
    await axios.get(`${AXIOS_URL}/users/${userInfo.username}`)
      .then((response) => {
        setDbPhoto(() => response.data.bandPhoto);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //allows users to see all of the shows they have RSVPed to
  const getRSVPS = async () => {
    await axios.get(`${AXIOS_URL}/fans/${userInfo.id}/rsvps`)
      .then((response) => {
        setFanShows(() => response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //allows user to see all the bands they follow
  const getFollowedBands = async () => {
    await axios.get(`${AXIOS_URL}/fans/${userInfo.id}/bands`)
      .then(response => {
        setFollowed(() => response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // //allows user to get shows they previously went to on button click
  const getPreviousShows = () => {
    axios.get(`${AXIOS_URL}/shows/${userInfo.id}/oldrsvps`)
      .then(response => {
        // console.log("getting old shows", response);
        setOldShows(response.data)
      })
      .catch(err => {
        // console.log("not getting older shows", err);
      })
  }

  //load all user info when brought to hub
  useEffect(() => {
    getBandInfo();
    getBandsShows();
    getPhoto();
    getRSVPS();
    getFollowedBands();
    getPreviousShows();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Hub</Text>
        <View style={styles.container}>
          {/* image container */}
          <Text>
            {dbPhoto &&
              <Image
                style={{ width: 100, height: 70 }}
                source={{ uri: dbPhoto }}
              />
            }
          </Text>
        </View>
        <Text style={styles.infoText}>
          {hubInfo.bio}
        </Text>
        {/* Social Media Buttons */}
        <View style={styles.flexRowRight}>
          {/* Only show spotify link if user is a band */}
          {userInfo.userType === 'band' ?
            <SpotifyButton link={hubInfo.link_spotify} />
            : null}
          <InstagramButton link={hubInfo.link_instagram} />
          <FacebookButton link={hubInfo.link_facebook} />
        </View>
        <View style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
        }}>

          {/* Button to open create show modal */}
          <EditBandBioModal />

          {/* Button to open create show modal */}
          {userInfo.userType === 'band' ? <CreateShowModal /> : null}
        </View>
        {/* Cards for all a bands upcoming shows */}
        <View>
          {userInfo.userType === 'band' ?
            <View>
              {shows.length ?
                <Text style={styles.subText}>Your Upcoming Gigs</Text>
                : null
              }
              {shows && shows.map(show => {
                return (
                  moment(show.dateTime).toDate() > new Date() ?
                    <View>
                      <Card
                        containerStyle={styles.card}
                        backgroundColor='#fff'
                        borderWidth={0}
                        borderRadius={10}
                        padding={10}

                      // image={require('../images/pic2.jpg')}
                      >
                        <SingleShowModal show={show.id} showName={show.name} />
                        <Text style={styles.cardText}>{show.time}</Text>
                        {show.description ?
                          <Text style={styles.cardText}>{show.description}</Text>
                          : null}
                        <EditShowModal show={show.id} showName={show.name} style={styles.cardText} getBandsShows={getBandsShows} />
                      </Card>
                    </View>
                    : null
                )
              })}
            </View>
            : null}
        </View>


        {/* <View style={styles.container}>
          <Image
            source={dbPhoto}
            style={styles.thumbnail}
          />
        </View> */}

        {/* Cards for shows the user has RSVPd to*/}
        <View>
          <Text style={styles.subText}>Your RSVP'd Shows</Text>


          {fanShows && fanShows.map(show => {
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
                    <Text style={styles.cardText}>{show.time}</Text>
                    {show.bands ?
                      show.bands.map(band => {
                        <Text style={styles.cardText} key={band.id}>{band.name}</Text>
                      })
                      : null}
                    {/* <Text style={styles.cardVenueText} key={show.venue.id}>{show.venue.name}</Text> */}
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


        </View>

        {/* Cards for bands the user follows */}
        < View >
          <Text style={styles.subText}>Bands You Follow</Text>
          {

            followed && followed.map(band => {
              return (
                <Card
                  // title={band.name}
                  key={band.id}
                  style={styles.card}
                  backgroundColor='#111'
                  padding={10}
                  borderRadius={10}
                  containerStyle={styles.card}
                // image={require('../images/pic2.jpg')}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <View> */}
                    <SingleBandModal name={band.name} bandId={band.id} />
                  </View>
                  {/* <Text style={{ marginBottom: 10 }}>{show.time}</Text>
        <Text style={{ marginBottom: 10 }}>{show.description}</Text> */}

                </Card>
              )
            })
          }
        </View>

        <View>
          {userInfo.userType === 'fan' || 'band' ? <PreviousRSVPShows userInfo={userInfo.id} />

            : null}
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
  },
  text: {
    fontSize: 50,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  subText: {
    fontSize: 25,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 15
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
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  card: {
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: '#111',
    paddingBottom: 10
  },
  cardText: {
    fontSize: 16,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingRight: 20,
    marginBottom: 10
  },

  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  prevButton: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 10
  },
  flexRowRight: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
    paddingBottom: 5
  },
})



