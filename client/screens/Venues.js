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
        limit: 1
      }
    })
      .then((response) => {
        console.log("????we're hitting api", response);
      })
      .catch((err) => {
        console.log("we're not hitting api", err);
      })
    // fetch('https://api.foursquare.com/v2/venues/search', {
    //   method: 'GET',
    // qs: {
    //   client_id: 'CLIENT_ID',
    //   client_secret: 'CLIENT_SECRET',
    //   ll: '40.7243,-74.0018',
    //   query: 'coffee',
    //   v: '20180323',
    //   // limit: 1
    // }
    //   })
    //       .then((response) => {
    //   console.log("we're hitting api", response);
    // })
    //       .catch ((err) => {
    //   console.log("we're not hitting api", err);
    // })


    // .then((response) => response.json())
    // .then((responseJson) => {
    //   console.log(responseJson);
    //   this.setState({
    //     data: responseJson
    //   })
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  //     request({
  //       url: 'https://api.foursquare.com/v2/venues/explore',
  //       method: 'GET',
  //       qs: {
  //         client_id: 'CLIENT_ID',
  //         client_secret: 'CLIENT_SECRET',
  //         ll: '40.7243,-74.0018',
  //         query: 'coffee',
  //         v: '20180323',
  //         limit: 1
  //       }
  //     }, function (err, res, body) {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         console.log(body);
  //       }
  //     });

  //  }

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