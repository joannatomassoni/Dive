import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {
  Card
} from 'react-native-elements';
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

export default function Hub(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //hub info to display
  const [hubInfo, setHubInfo] = useState({});

  //load all user info when brought to hub
  useEffect(() => {
    axios.get(`http://localhost:8080/users/${userInfo.username}`)
      .then((response) => {
        setHubInfo(response.data);
      })
      .catch((err) => {
        console.log("eere getting hub info", err);
      })
  }, [userInfo])

  console.log(hubInfo);

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Hub</Text>
        <Text style={{ marginBottom: 10, color: '#fff' }}>
          General information about the band will go here.
        </Text>
        {/* Social Media Buttons */}
        <View style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'left',
        }}>
          <SpotifyButton link={hubInfo.link_spotify} />
          <InstagramButton link={hubInfo.link_instagram} />
          <FacebookButton link={hubInfo.link_facebook} />
        </View>
        {/* Button to open create show modal */}
        <EditBandBioModal />
        {/* Button to open create show modal */}
        <CreateShowModal />
        {/* Cards for all upcoming shows */}
        <Card
          title='Show Title Here'
          style={styles.card}
          backgroundColor='#fff'
          borderWidth={0}
          borderRadius={10}
          padding={10}
        // image={require('../images/pic2.jpg')}
        >
          <Text style={{ marginBottom: 10 }}>
            General information about the band can go here.
        </Text>
        <EditShowModal />
        </Card>
      </ScrollView>
    </SafeAreaView>
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
})
