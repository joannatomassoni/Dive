import React from 'react';
import { Linking } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export default function FacebookButton ({ link }) {
  return (
    <Entypo
      name='instagram'
      color='#59C3D1'
      size={32}
      onPress={() => {
        Linking.openURL(`http://${link}`);
      }}
    />
  )
}
