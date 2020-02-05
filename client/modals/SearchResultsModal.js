import React, { useState } from 'react';
import { Modal, View, SafeAreaView, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { AXIOS_URL } from 'react-native-dotenv';
import SingleVenueModal from '../modals/SingleVenueModal'
import SingleBandModal from '../modals/SingleBandModal'
import SingleShowModal from '../modals/SingleShowModal'


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

    //request to get all bands from db
    const getAllBands = () => {
       console.log('');
    }

    const searchCall = async (query) => {
        await axios.get(`${AXIOS_URL}/search/bands/${query}`)
            .then((response) => {
                if (response.data) {
                    setBands(response.data);
                }
            })
        await axios.get(`${AXIOS_URL}/search/venues/${query}`)
            .then((response) => {
                if (response.data) {
                    setVenues(response.data);
                }
            })
            await axios.get(`${AXIOS_URL}/search/shows/${query}`)
            .then((response) => {
                if (response.data) {
                    setShows(response.data);
                }
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
                            <View>
                                <Text style={styles.subheaderText}>Bands</Text>
                                <View>
                                    {bands.map((band) => {
                                        return (
                                            <Card
                                                key={band.id}
                                                backgroundColor='#111'
                                                padding={10}
                                                borderRadius={10}
                                                containerStyle={styles.card}
                                                >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <SingleBandModal getAllBands={getAllBands} name={band.name} bandId={band.id} />
                                                        <Text style={styles.cardText}>{band.bio}</Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        )
                                    })}
                                </View>
                            </View>
                            : null
                        }
                        {shows.length ? 
                            <View>
                                <Text style={styles.subheaderText}>Shows</Text>
                                <View>
                                    {shows.map((show) => {
                                        return (
                                            <Card
                                                key={show.id}
                                                backgroundColor='#111'
                                                padding={10}
                                                borderRadius={10}
                                                containerStyle={styles.card}
                                                >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <SingleShowModal show={show.id} showName={show.name}/>
                                                        <Text style={styles.cardText}>{show.date}</Text>
                                                        <Text style={styles.cardText}>{show.time}</Text>
                                                        { show.bands ? 
                                                        show.bands.map(band => {
                                                            <Text style={styles.cardText} key={band.id}>{band.name}</Text>
                                                        })
                                                        : null }
                                                        {/* Change query to make this venue text work */}
                                                        {/* <Text style={styles.cardVenueText} key={show.venue.id}>{show.venue.name}</Text> */}
                                                    </View>
                                                </View>
                                            </Card>
                                        )
                                    })}
                                </View>
                            </View>
                            : null
                        }
                        {venues.length ? 
                            <View>
                                <Text style={styles.subheaderText}>Venues</Text>
                                <View>
                                    {venues.map((venue) => {
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
                                                        <SingleVenueModal venueID={venue.id} venueName={venue.name}/>
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
												<Ionicons
                            name='md-search'
                            color='#59C3D1'
                            size={37}
                            onPress={() => {
                                searchCall(query.trim())
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
				alignSelf: 'center',
				paddingTop: 30
    },
    linkRow: {
        flexDirection: 'row',
        height: 50,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 285,
        fontWeight: 'bold',
        marginRight: 10
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