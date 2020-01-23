import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { SignedInContext } from '../App'
//screen dimensions for menu bar
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
  console.log(userInfo);
  return( 
    <View style ={styles.container}>
      {/* Change menu options for when user is signed in */}
      {userInfo.signedIn ?
        //view for when user is not signed in
        <ScrollView>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              {/* image from user's google auth */}
              <View style={styles.imgView}>
                <Image style={styles.img} source={{uri: userInfo.photoUrl}} />
              </View>
              {/* user's name */}
              <View style={styles.profileText}>
                <Text style={styles.name}>
                  {userInfo.name}
                </Text>
              </View>
            </View>
          </View>
          {/* nav links in menu bar for when signed in*/}
          <View style={styles.bottomLinks}>
            {navLink('Shows', 'Shows')}
            {navLink('Bands', 'Bands')}
            {navLink('Venues', 'Venues')}
            {navLink('Hub', 'Hub')}
            {/* logout button when user is signed in */}
            <TouchableOpacity 
            // log out triggers alert box
              onPress={() => {
                Alert.alert(
                  'Log Out',
                  'Are you sure you want to log out?',
                  [
                    {
                      //log out resets the global user state
                      text: 'Log Out', 
                      onPress: () => setUserInfo(userInfo => ({
                        ...userInfo,
                        signedIn: false,
                        name: '',
                        photoUrl: ''
                      })) 
                    },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                );
              }}
            
            >
              <Text style={styles.link}>Log Out</Text>
            </TouchableOpacity>
          </View>
          {/* menu bar footer info */}
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
          {/* nav links in menu bar for when signed out*/}
          <View style={styles.bottomLinks}>
            {navLink('Shows', 'Shows')}
            {navLink('Bands', 'Bands')}
            {navLink('Venues', 'Venues')}
            {navLink('Login', 'Login')}
          </View>
          {/* menu bar footer info */}
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