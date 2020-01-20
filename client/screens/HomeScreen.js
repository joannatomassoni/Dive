import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Shows',
  headerRight: () => (
    <Button
      onPress={() => alert('Login Redierect will happen now!')}
      title="Login"
    />
  ),
  headerLeft: () => (
    <Button
      onPress={() => alert('Other screens will appear here!')}
      title="Menu"
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }
});
