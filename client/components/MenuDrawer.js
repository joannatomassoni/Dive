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
import { SignedInContext } from '../context/UserContext'
import { 
  Ionicons, 
  MaterialIcons, 
  Entypo, 
  AntDesign,
  FontAwesome
} from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
//screen dimensions for menu bar
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function MenuDrawer(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //navigator function
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
            <LinearGradient
              colors={['#2D323A', '#38404C']}
              style={{ flex: 1 }}
            >
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
            </LinearGradient>
          </View>
          {/* nav links in menu bar for when signed in*/}
          <View style={styles.bottomLinks}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons
                name='ios-musical-notes'
                color='#fff'
                size={35}
                style={styles.showsIcon}
              />
              {navLink('Shows', 'Shows')}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name='people'
                color='#fff'
                size={30}
                style={styles.bandsIcon}
              />
              {navLink('Bands', 'Bands')}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Entypo
                name='location-pin'
                color='#fff'
                size={30}
                style={styles.venuesIcon}
              />
              {navLink('Venues', 'Venues')}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name='dot-circle-o'
                color='#fff'
                size={30}
                style={styles.hubIcon}
              />
              {navLink('Hub', 'Hub')}
            </View>
            <View style={{marginBottom:20}}></View>
            <Divider style={{ backgroundColor: '#fff', height: 2 }} />
            {/* logout button when user is signed in */}
            <View style={{ flexDirection: 'row' }}>
              <AntDesign
                name='login'
                color='#fff'
                size={24}
                style={styles.loginIcon}
              />
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
            <View style={{ flexDirection: 'row'}}>
              <Ionicons
                name='ios-musical-notes'
                color='#fff'
                size={35}
                style={styles.showsIcon}
              />
              {navLink('Shows', 'Shows')}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name='people'
                color='#fff'
                size={30}
                style={styles.bandsIcon}
              />
              {navLink('Bands', 'Bands')}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Entypo
                name='location-pin'
                color='#fff'
                size={30}
                style={styles.venuesIcon}
              />
              {navLink('Venues', 'Venues')}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <AntDesign
                name='login'
                color='#fff'
                size={24}
                style={styles.loginIcon}
              />
              {navLink('Login', 'Login')}
            </View>
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
    flex: 1,
    paddingTop: 80,
  },
  name: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
  img: {
    height: 110,
    width: 110,
    borderRadius: 50,
  },
  imgView: {
    flex: 1,
    paddingTop: 70,
    alignSelf: 'center'
  },
  topLinks: {
    height: 230,
    backgroundColor: '#2D323A',
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: '#3BAFBF',
    paddingBottom: 400,
  },
  link: {
    flex: 1,
    fontSize: 35,
    fontWeight: '400',
    color: '#000',
    paddingTop: 10,
    paddingLeft: 20,
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
  },
  showsIcon: {
    marginLeft: 24,
    marginTop: 12,
    marginRight: 6
},
  bandsIcon: {
    marginLeft: 20,
    marginTop: 16
  },
  venuesIcon: {
    marginLeft: 20,
    marginTop: 16
  },
  loginIcon: {
    marginLeft: 20,
    marginTop: 19,
    marginRight: 6
  },
  hubIcon: {
    marginLeft: 22,
    marginTop: 19,
    marginRight: 2
  }
})