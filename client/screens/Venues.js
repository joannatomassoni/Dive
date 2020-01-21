import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';


import MenuButton from '../components/MenuButton'

export default class Venues extends React.Component {
  componentDidMount() {
    axios({
      method: 'get',
      // url: 'https://api.foursquare.com/v2/venues/search?client_id=11ACWOWAADHLRUWGOKR4JCPTN3ENHFS25UVOHLKKYDYBIVWR&client_secret=DGVIU40XZ35VVOJWJCEZEDYI5BWQNJIPDG3MCNK2N3AF1CLO&v=20180301&query=music venue&ll=40.74224,-73.99386',
      // url: 'https://api.foursquare.com/v2/venues/search?near= new orleans, la&query=music venue&v=20150214&m=foursquare&client_secret=DGVIU40XZ35VVOJWJCEZEDYI5BWQNJIPDG3MCNK2N3AF1CLO&client_id=11ACWOWAADHLRUWGOKR4JCPTN3ENHFS25UVOHLKKYDYBIVWR',

      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: '11ACWOWAADHLRUWGOKR4JCPTN3ENHFS25UVOHLKKYDYBIVWR',
        client_secret: 'DGVIU40XZ35VVOJWJCEZEDYI5BWQNJIPDG3MCNK2N3AF1CLO',
        v: '20180301',
        query: 'music venue',
        near: 'new orleans, la',
        // ll: '29.9511, 90.0715',
        limit: 3
      }
    })
      .then((response) => {
        console.log("we're hitting api", response.data.response.venues);
        //this is hardcoded, gets the name of first music venue
        const name = response.data.response.venues[0].categories[0].pluralName;
        const address = response.data.response.venues[0].location.formattedAddress[0];
        //right now city = city, state and zip.  It's a string that contains all of those
        const city = response.data.response.venues[0].location.formattedAddress[1];
      })
      .catch((err) => {
        console.log("we're not hitting api", err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Venues</Text>
      </View>
    )
  }
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