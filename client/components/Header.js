import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Header = () => (
  // <View style={{ flexDirection: "row" }}>
  <View style={styles.header}>
    <Text style={[styles.text]}>Dive</Text>
  </View >

);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#59C3D1',
    fontSize: 50,
    fontFamily: "dogbyte",
    height: 100
  },
  text: {
    color: 'black',
    textAlign: 'right',
    fontSize: 50,
    marginTop: 30
  }
});

export { Header };