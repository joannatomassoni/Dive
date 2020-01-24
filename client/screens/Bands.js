import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import {
  Card,
  ListItem,
  Button,
  Icon,
} from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'

export default function Bands(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state to hold bands
  const [bands, setBands] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/bands')
      .then((response) => {
        console.log('hey');
        console.log(response);
        setBands(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Bands</Text>
        <Card
          title='BAND TITLE HERE'
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
  cardText: {

  },
})

