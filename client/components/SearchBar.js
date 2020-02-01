import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv'


export default class SearchBarComponent extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  searchCall = async (query) => {
      console.log('hey');
      const bands = await axios.get(`${AXIOS_URL}/search/bands/${query}`);
      const shows = await axios.get(`${AXIOS_URL}/search/shows/${query}`);
      const venues = await axios.get(`${AXIOS_URL}/search/venues/${query}`);
      console.log(bands);    
      console.log(shows);    
      console.log(venues);   
  }

  render() {
      console.log(this.state.search)
    const { search } = this.state;

    return (
        <View style={styles.linkRow}>
            <SearchBar
              platform="ios"
              searchIcon="false"
              placeholder="Type Here"
              onChangeText={this.updateSearch}
              value={search}
              containerStyle={{height: 40,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                paddingHorizontal: 10,
                borderRadius: 5,
                width: 300,
                fontWeight: 'bold'}}
            //   style={styles.searchBar}
            />
            {/* Button */}
            <Feather
                name='search'
                color='#59C3D1'
                size={37}
                onPress={() => {
                    this.searchCall(this.state.search)
                }}
                style={styles.button}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 300,
        fontWeight: 'bold',
    },
    linkRow: {
        flexDirection: 'row',
        height: 50,
    },
    button: {
        marginTop: 5,
        marginLeft: 5
    }
    // searchBar: {
    //     padding: 5
    // }
})