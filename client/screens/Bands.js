import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import {
  Card,
} from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import SingleBandModal from '../modals/SingleBandModal';
import { AXIOS_URL } from 'react-native-dotenv';


export default function Bands(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state to hold bands
  const [bands, setBands] = useState([]);

  //request to get all bands from db
  const getAllBands = () => {
    axios.get(`${AXIOS_URL}/bands`)
      .then((response) => {
        setBands(() => response.data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllBands();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.headerText}>Bands</Text>
        {bands.map(band => {
          return (
            <Card
              style={styles.card}
              key={band.id}
              backgroundColor='#111'
              padding={10}
              borderRadius={10}
              containerStyle={styles.card}
            >
              <SingleBandModal name={band.name} bandId={band.id} />
              <Text style={styles.cardText}>{band.bio}</Text>
              <Text>
              {band.bandPhoto &&
                <Image
                  style={styles.photo}
                  source={{ uri: band.bandPhoto }}
                />
                }
              </Text>
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
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: '#3BAFBF',
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
    paddingRight: 20
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10
  }
})

