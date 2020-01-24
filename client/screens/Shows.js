import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'
import axios from 'axios';

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


  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.text}>Shows</Text>
    </View>
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
    fontSize: 30,
    color: '#fff'
  }
})


