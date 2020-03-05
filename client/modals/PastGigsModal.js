import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements'
import SingleShowModal from '../modals/SingleShowModal';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PastGigsModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  let { pastGigs } = props;

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* start of modal when showing */}
        <View behavior="padding" style={styles.container}>
            {/* back button */}
            <Ionicons size={64} style={styles.menuIconContainer} onPress={() => { setModalVisible(false) }}>
              <Ionicons
                name='ios-arrow-back'
                color='#59C3D1'
                size={32}
                style={styles.menuIcon}
                onPress={() => { setModalVisible(false) }}
              />
            </Ionicons>
          <LinearGradient
            colors={['#38404C', '#111']}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <View style={{ marginTop: 70 }}>
                <Text style={styles.headerText}>Past Gigs</Text>
                {pastGigs ? 
                  pastGigs.map(show => {
                  return (
                    <Card
                      key={show.id}
                      style={styles.card}
                      backgroundColor='#111'
                      padding={10}
                      borderRadius={10}
                      containerStyle={styles.card}
                    >
                      {/* modal to display single show info */}
                      <SingleShowModal show={show} />
                      <Text style={styles.cardDateText}>{show.time}</Text>
                      <Text style={styles.cardDateText}>{show.date}</Text>
                      {show.description ? 
                        <Text style={styles.cardText}>{show.description}</Text>
                        : null
                      }
                    </Card>
                  )
                })
                : null
                }
              </View>
            </View>
            </LinearGradient>
          </View>
      </Modal >
      {/* when modal is hidden */}
      < TouchableOpacity
        style={styles.signupContainer}
        onPress={() => { setModalVisible(true); }
        }
      >
        <Text style={styles.signupButtonText}>Past Gigs</Text>
      </TouchableOpacity >

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
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
    paddingRight: 20,
    marginBottom: 10
  },
  cardDateText: {
    fontSize: 16,
    color: '#75A4AD',
    fontWeight: '500',
    textAlign: 'left',
    paddingRight: 20
  },
  text: {
    fontSize: 30,
    alignItems: 'center',
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    marginLeft: 90,
    marginBottom: 15
  },
  signupContainer: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
    width: 140,
    marginHorizontal: 7
  },
  modal: {
    marginLeft: 120
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  prevButton: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 10
  },
  signupButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  menuIcon: {
    zIndex: 9,
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
})


