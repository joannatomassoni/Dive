import React, { useState } from 'react';
import { Modal, View, SafeAreaView, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { AXIOS_URL } from 'react-native-dotenv';
import SingleVenueModal from '../modals/SingleVenueModal'
// import SingleBandModal from '../modals/SingleBandModal'
// import SingleShowModal from '../modals/SingleShowModal'


export default function SearchResultsModal() {
    //state for modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    // state for input value for query
    const [ query, setQuery ] = useState('');
    // state for bands results
    const [ bands, setBands ] = useState([]);
    // state for shows results
    const [ shows, setShows ] = useState([]);
    // state for venues results
    const [ venues, setVenues ] = useState([]);

    const searchCall = async (query) => {
        await axios.get(`${AXIOS_URL}/search/bands/${query}`)
            .then((response) => {
                if (response.data) {
                    setBands(response.data);
                }
            })
            .then(() => {
                console.log(venues);
            });
        await axios.get(`${AXIOS_URL}/search/shows/${query}`)
            .then((response) => {
                if (response.data) {
                    setShows(response.data);
                }
            })
            .then(() => {
                console.log(venues);
            });
        await axios.get(`${AXIOS_URL}/search/venues/${query}`)
            .then((response) => {
                if (response.data) {
                    setVenues(response.data);
                }
            })
            .then(() => {
                console.log(venues);
            })
            .then(() => {
                setModalVisible(true);
            })
    };

    return (
        <View>
            <Modal 
                animationType="slide"
                transparent={false}
                visible={modalVisible}    
            >
                {/* start of modal when showing */}
                <SafeAreaView behavior="padding" style={styles.container}>

                    {/* back button */}
                    <Ionicons size={64} style={styles.menuIconContainer} onPress={() => { setModalVisible(false) }}> 
                        <Ionicons
                            name='ios-arrow-back'
                            color='#59C3D1'
                            size={32}
                            style={styles.menuIcon}
                            onPress={() => { 
                                setModalVisible(false);
                            }}
                        />
                    </Ionicons>
                    {/* main body */}
                    <ScrollView style={{ marginTop: 30 }}>
                        <Text style={styles.headerText}>Results</Text>       

                        {/* conditionally rendering lists of venues, bands, and shows */}            
                        {bands.length ? 
                            <Text>Bands</Text>
                            : null
                        }
                        {shows.length ? 
                            <Text>Shows</Text>
                            : null
                        }
                        {venues.length ? 
                            <View>
                                <Text style={styles.subheaderText}>Venues</Text>
                                <View>
                                    {venues.map((venue) => {
                                        console.log(venue);
                                        return (
                                            <Card
                                                key={venue.id}
                                                backgroundColor='#111'
                                                padding={10}
                                                borderRadius={10}
                                                containerStyle={styles.card}
                                                >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <SingleVenueModal name={venue.name} venueId={venue.id} />
                                                        <Text style={styles.cardText}>{venue.address}</Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        )
                                    })}
                                </View>
                            </View>
                            : null
                        }
                    </ScrollView>
                </SafeAreaView>

            </Modal>

            {/* search button when modal is hidden */}
            <Text style={styles.text}>Search</Text>
                <View style={styles.searchBarContainer}>
                    <View style={styles.linkRow}> 
                        {/* search input form */}
                        <TextInput
                            placeholder="Type here"
                            placeholderTextColor="#75A4AD"
                            returnKeyType="next"
                            color='black'
                            onChangeText={setQuery}
                            style={styles.input}
                        />
                        <Feather
                            name='search'
                            color='#59C3D1'
                            size={37}
                            onPress={() => {
                                searchCall(query)
                            }}
                            style={styles.button}
                        />
                    </View>
                </View>
        </View>
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
    menuIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    menuIconContainer: {
        zIndex: 9,
        position: 'absolute',
        top: 30,
        left: 10,
        padding: 10,
    },
    headerText: {
        fontSize: 50,
        color: '#59C3D1',
        opacity: 0.9,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 20
    },
    subheaderText: {
        fontSize: 35,
        color: '#59C3D1',
        opacity: 0.9,
        // fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 20
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: '#2D323A',
        padding: 30,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 40,
        fontWeight: 'bold'
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
})