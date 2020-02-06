import React from 'react';
import { Linking } from 'react-native'
import { Entypo } from '@expo/vector-icons';

export default function SpotifyButton ({ link }) {
  return (
    <Entypo
      name='spotify'
      color='#59C3D1'
      style={{ padding: 5 }}
      size={32}
      onPress={() => {
        Linking.openURL(`${link}`);
      }}
    />
  )
}
