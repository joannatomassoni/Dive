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
// import { Video, Transformation, CloudinaryContext } from 'cloudinary-react';
// const cloudinary = require('cloudinary').v2
import { AXIOS_URL } from 'react-native-dotenv';


export default function Hub(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //hub info to display
  const [hubInfo, setHubInfo] = useState({});
  // const [image, setImage] = useState({});
  // const [imageName, setImageName] = useState("");
  const [shows, setShows] = useState([]);
  // const [venue, setVenue] = useState([]);
  let [selectedImage, setSelectedImage] = useState({});
  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/da4ry89ct/upload';
  let [bandPhoto, setBandPhoto] = useState('');
  let [dbPhoto, setDbPhoto] = useState('');



  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    // console.log("the image selected is:", base64Img)

    // if (selectedImage !== null) {
    //   return (
    //     <View style={styles.container}>
    //       <Image
    //         source={{ uri: selectedImage.localUri }}
    //         style={styles.thumbnail}
    //       />
    //     </View>
    //   );
    // }
    let data = {
      "file": base64Img,
      "upload_preset": "oecwb18t",
    }

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      // console.log("sending data to cloudinary", data.url);
      setBandPhoto(data.url);
      console.log("bandPhoto has been set to state", bandPhoto);
      // return data.secure_url
    }).catch(err => console.log(err))

    axios.patch(`http://localhost:8080/bands/${userInfo.id}/photo`, {
      bandPhoto: bandPhoto
    })
      .then(response => {
        console.log("saving photo to db", bandPhoto)
      })
      .catch(err => {
        console.log("not saving to db", err)
      })
  };

  //load all user info when brought to hub
  useEffect(() => {
    axios.get(`${AXIOS_URL}/users/${userInfo.username}`)
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
        })
    // const savePhoto = async () => {
    //   await
    //   axios.patch(`http://localhost:8080/bands/:id/photo`, {
    //     photo: bandPhoto
    //   })
    //     .then(response => {
    //       console.log("saving photo do db", bandPhoto)
    //     })
    //     .catch(err => {
    //       console.log("not saving to db", err)
    //     })
    // }
    // axios.patch(`http://localhost:8080/bands/$userInfo.id/photo`, {
    //   photo: image
    // })
    //   .then(response => {
    //     console.log("we're saving a photo", response);
    //   })
    //   .catch(err => {
    //     console.log("trouble saving photo");
    //   }),


    axios.get(`http://localhost:8080/users/${userInfo.username}`)
      .then((response) => {
        console.log("getting a photo from db", response.data.bandPhoto)
        setDbPhoto(response.data.bandPhoto);
      })
      .catch((err) => {
        console.log("front end not getting band photo from db", err);
      })
  }, [userInfo])

  console.log("are we setting a photo???", dbPhoto);

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
            onPress={openImagePickerAsync}

          />
          {/* {image.uri &&
            <Image source={{ uri: image.uri }} style={{ width: 150, height: 150 }} />} */}
        </View>
        <View style={styles.container}>
          {/* <Image source="http://res.cloudinary.com/da4ry89ct/image/upload/v1580262805/nekvjgf3slxuvp9xv5iv.jpg" /> */}

          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: "http://res.cloudinary.com/da4ry89ct/image/upload/v1580262805/nekvjgf3slxuvp9xv5iv.jpg" }}
          />

        </View>


        {/* Cards for all upcoming shows */}
        {
          shows.map(show => {
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
          })
        }
        <View style={styles.container}>
          <Image
            source={dbPhoto}
            style={styles.thumbnail}
          />
        </View>
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
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
})



