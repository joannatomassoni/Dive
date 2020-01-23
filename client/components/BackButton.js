import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BackButton extends React.Component {
  render() {
    return (
      <Ionicons
        name='ios-arrow-back'
        color='#59C3D1'
        size={32}
        style={styles.menuIcon}
      />
    )
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20,
  }
})