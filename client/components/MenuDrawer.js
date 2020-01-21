import React from 'react';
import {
  Platform,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {
  render() {
    return( 
      <View style ={styles.container}>
        <Text>MenuDrawer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#000000',
  }
})