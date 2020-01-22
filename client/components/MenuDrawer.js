import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SignedInContext } from '../App'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function MenuDrawer(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);

  const navLink = (nav, text) => {
    return (
      <TouchableOpacity style={{height: 50}} onPress={() => props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    )
  }

  return( 
    <View style ={styles.container}>
      {/* Change menu options for when user is signed in */}
      {userInfo.signedIn ?
        //view for when user is not signed in
        <ScrollView>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
                {/* <Image style={styles.img} source={require('//link goes in here')} /> */}
              </View>
              <View style={styles.profileText}>
                <Text style={styles.name}>
                  {/* {userInfo.name} */}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {navLink('Shows', 'Shows')}
            {navLink('Bands', 'Bands')}
            {navLink('Venues', 'Venues')}
            <TouchableOpacity 
            onPress={() => setUserInfo(userInfo => ({ ...userInfo, signedIn: false }))}
            >
              <Text style={styles.link}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.description}>Dive</Text>
            <Text style={styles.version}>v1.0</Text>
          </View>
        </ScrollView>
        // view for when user is signed in
        : <ScrollView>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {navLink('Shows', 'Shows')}
            {navLink('Bands', 'Bands')}
            {navLink('Venues', 'Venues')}
            {navLink('Login', 'Login')}
          </View>
          <View style={styles.footer}>
            <Text style={styles.description}>Dive</Text>
            <Text style={styles.version}>v1.0</Text>
          </View>
        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#59C3D1'
  },
  profileText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: 'white',
    textAlign: 'left',
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  topLinks: {
    height: 150,
    backgroundColor: '#2D323A',
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: '#3E5760',
    paddingBottom: 450,
  },
  link: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    paddingLeft: 30,
    textAlign: 'left',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D323A',
    borderTopWidth: 1,
    borderTopColor: '#9F92A3',
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: '#75A4AD',
  },
  description: {
    flex: 1,
    marginLeft: 20, 
    fontSize: 16,
    color: '#59C3D1'
  }
})