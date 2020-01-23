import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'

export default function Bands(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  const [bands, setBands] = useState([]);
  //console.log(userInfo[0]);
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
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.text}>Bands</Text>
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
