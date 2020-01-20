import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function BandsScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

BandsScreen.navigationOptions = {
  title: 'Bands',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
