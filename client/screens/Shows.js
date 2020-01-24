import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
} from 'react-native';
import {
  Card,
  ListItem,
  Button,
  Icon,
} from 'react-native-elements'
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function Shows(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/shows')
      .then((response) => {
        // this.setState({
        console.log("shows response from db", response.data[0])
        setShows(response.data);
        // console.log("is setState working?", shows);
      })
      .catch((err) => {
        console.log("frontend not getting shows from db", err);
      })
  }, [])


  //dummy data
  const users = [
    {
      name: 'Ryan',
      avatar: "https://lh3.googleusercontent.com/a-/AAuE7mAY3iahzehnNyuj1PJ8iiDn1zi8v7LFz7jB6dzcPw"
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Shows</Text>

        {/* implemented with Text and Button as children */}
        <Card
          title='SHOW TITLE HERE'
          style={styles.card}
        // image={require('../images/pic2.jpg')}
        >
          <Text style={{ marginBottom: 10 }}>
            General information about the bands or specific show can go here.
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


