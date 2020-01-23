import React, { useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  SectionList, 
} from 'react-native';
import { SignedInContext } from '../App'
import MenuButton from '../components/MenuButton'

export default function Shows(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation}/>
      <Text style={styles.text}>Shows</Text>
    </View>
  )
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
