import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';



import MenuButton from '../components/MenuButton'

export default class Venues extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip_code: 0,
    }
  }

  componentDidMount() {

    //Get this get request is for FOURSQUARE API to get address for venue
    //commented out below is the setState for the values we need for to get info
    axios({
      method: 'get',
      //   // url: 'https://api.foursquare.com/v2/venues/search?near= new orleans, la&query=music venue&v=20150214&m=foursquare&client_secret=DGVIU40XZ35VVOJWJCEZEDYI5BWQNJIPDG3MCNK2N3AF1CLO&client_id=11ACWOWAADHLRUWGOKR4JCPTN3ENHFS25UVOHLKKYDYBIVWR',
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
        console.log("we're hitting api", response.data.response.venues[0].location.formattedAddress[1].split(' ')[3]);
        //     //this is hardcoded, gets the name of first music venue
        //     this.setState({
        //       name: response.data.response.venues[0].categories[0].pluralName,
        //       address1: response.data.response.venues[0].location.address,
        //       city: response.data.response.venues[0].location.city,
        //       state: response.data.response.venues[0].location.formattedAddress[1].split(' ')[2],
        //       zip_code: response.data.response.venues[0].location.formattedAddress[1].split(' ')[3]
        //     });
        //     const name = response.data.response.venues[0].categories[0].pluralName;
        //     const address = response.data.response.venues[0].location.address;
        //     const city = response.data.response.venues[0].location.city;
        //     const state = response.data.response.venues[0].location.formattedAddress[1].split(' ')[2];
        //     const zip = response.data.response.venues[0].location.formattedAddress[1].split(' ')[3]
      })
      .catch((err) => {
        console.log("we're not hitting api", err);
      })

    //GET This get request gets all venues from database. 
    //  Right now it is hard coded for just one band
    axios.get('http://localhost:8080/venues')
      .then((response) => {
        this.setState({
          name: response.data[4].name,
          address1: response.data[4].address1,
          city: response.data[4].city,
          state: response.data[4].state,
          zip_code: response.data[4].zip_code,
        });
        console.log('UI is getting venues!', response.data[4].name);
      }).catch(err => {
        console.log('uh oh, not getting venues', err);
      })

  }

  render() {
    const { name, address1, city, state, zip_code } = this.state;
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <Text style={styles.text}>Venues</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{address1}</Text>
        <Text style={styles.text}>{city}</Text>
        <Text style={styles.text}>{state}</Text>
        <Text style={styles.text}>{zip_code}</Text>

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