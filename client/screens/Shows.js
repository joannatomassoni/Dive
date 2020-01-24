import React, { useContext, useState } from 'react';
import { 
  StyleSheet, 
  Text,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-elements'
import { SignedInContext } from '../context/UserContext'
import MenuButton from '../components/MenuButton'
import { ScrollView } from 'react-native-gesture-handler';
import SingleShowModal from '../modals/SingleShowModal'

export default function Shows(props) {
  ///global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //state switching between single show view
  const [singleView, setSingleView] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation}/>
      <ScrollView style={{marginTop:30}}>
        <Text style={styles.headerText}>Shows</Text>

        <Card
          title='SHOW TITLE HERE'
          style={styles.card}
          backgroundColor='#fff'
          borderWidth={0}
          borderRadius={10}
          padding={10}
          //onPress={setSingleView(!singleView)}
        // image={require('../images/pic2.jpg')}
        >
          <Text style={{ marginBottom: 10, color: '#000' }}>
            General information about the bands or specific show can go here.
          </Text>
          <SingleShowModal />
        </Card>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: '#59C3D1',
    opacity: 0.9,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  card: {
    backgroundColor: '#75A4AD',
    borderRadius: 10
  },
  button: {
    borderRadius: 5, 
    marginHorizontal: 40, 
    backgroundColor: '#59C3D1',
  },
  cardText: {

  },
})
