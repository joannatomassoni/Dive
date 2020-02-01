import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View
} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import { AXIOS_URL } from 'react-native-dotenv';
// import { SearchBar } from 'react-native-elements';
import SearchBarComponent from '../components/SearchBar'
 
export default function Search(props) {
    const [ search, setSearch ] = useState('');
    console.log(search);
    return (
        <SafeAreaView style={styles.container}>
            <MenuButton navigation={props.navigation} />
            <ScrollView style={{ marginTop: 30 }}>
                <Text style={styles.text}>Search</Text>
                <View style={styles.searchBarContainer}>
                    {/* <SearchBar 
                        style={styles.input}
                        round='true'
                        onChangeText={() => setSearch()}
                        value={search}
                    /> */}
                    <SearchBarComponent/>
                    {/* Button */}
                    {/* <Ionicons
                        name='md-search'
                        color='#59C3D1'
                        size={37}
                        onPress={() => {
                            axios.patch(`${AXIOS_URL}/bands/${userInfo.id}/insta`, {
                            link_instagram: instagramLink,
                            })
                            .then(response => response)
                            .catch(error => console.log('failed to create user', error));
                            Alert.alert('Instagram Updated');
                        }}
                    /> */}
                </View>
            
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
    text: {
      fontSize: 50,
      color: '#59C3D1',
      opacity: 0.9,
      fontWeight: 'bold',
      textAlign: 'right',
      paddingRight: 20
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: '#2D323A',
        padding: 30
    },
  })
  