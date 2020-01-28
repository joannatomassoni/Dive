import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
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
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
// import { Video, Transformation, CloudinaryContext, couldinary } from 'cloudinary-react';
// const cloudinary = require('cloudinary').v2

export default function Hub(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //hub info to display
  const [hubInfo, setHubInfo] = useState({});
  const [image, setImage] = useState({});
  const [shows, setShows] = useState([]);
  const [venue, setVenue] = useState([]);

  // let showList = shows.show;
  // cloudinaryContext.config({
  //   cloud_name: 'da4ry89ct',
  //   api_key: '442181727587311',
  //   api_secret: 'IaNyIKaWkAB2HUyJjJKRQT93dqI'
  // })

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    setImage(result);
  }

  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  // };
  console.log("image link", image);
  //load all user info when brought to hub
  useEffect(() => {
    axios.get(`http://localhost:8080/users/${userInfo.username}`)
      .then((response) => {
        // console.log("getting band info", response.data);
        setHubInfo(response.data);
      })
      .catch((err) => {
        // console.log("were not getting hub info", err);
      }),

      axios.get(`http://localhost:8080/bands/${userInfo.id}/shows`)
        .then((response) => {
          // console.log("is userInfo id working?", userInfo);
          // console.log("getting a bands shows  in hub from db", response.data)
          setShows(response.data.shows);
        })
        .catch((err) => {
          // console.log("frontend not getting band shows from db", err);
        }),

      // axios.patch(`http://localhost:8080/bands/$userInfo.id/photo`, {
      //   photo: image
      // })
      //   .then(response => {
      //     console.log("we're saving a photo", response);
      //   })
      //   .catch(err => {
      //     console.log("trouble saving photo");
      //   }),


      getPermissionAsync()
    // axios.get(`http://localhost:8080/venues/${shows.id_venue}`)
    //   .then((response) => {
    //     console.log("getting a venue from db", response.data)
    //     setVenue(response.data.shows);

    //   })
    //   .catch((err) => {
    //     console.log("frontend not getting band shows from db", err);
    //   })
  }, [userInfo])


  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Band Hub</Text>
        <Text style={{ marginBottom: 10, color: '#fff' }}>
          {hubInfo.bio}
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

        <View style={styles.button} >
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}

          />
          {image.uri &&
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        </View>

        <View style={styles.button} >
          <Button
            title="Save photo"
          // onPress={
          //   cloudinaryContext.v2.uploader.upload(image.uri, function (err, result) {
          //     console.log("error", err);
          //     console.log("we're sending cloudinary photo", result);
          //   })
          // }

          />
        </View>
        {/* Cards for all upcoming shows */}
        {shows.map(show => {
          return (
            <Card
              title={show.name}
              style={styles.card}
              backgroundColor='#fff'
              borderWidth={0}
              borderRadius={10}
              padding={10}
            // image={require('../images/pic2.jpg')}
            >
              <Text style={{ marginBottom: 10 }}>{show.time}</Text>
              <Text style={{ marginBottom: 10 }}>{show.description}</Text>
              <EditShowModal />
            </Card>
          )
        })}
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
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
})
