import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import MenuButton from '../components/MenuButton'

export default function Welcome (props) {
  // welcome animation state
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  // start of animated welcome view
  const startFade = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 3000
    }).start();
  };

  useEffect(() => {
    startFade();
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <MenuButton navigation={props.navigation} />
      {/* welcome screen when user logs in */}
      <View style={styles.title}>
        <Animated.View style={{ opacity: fadeValue }} >
          <Text style={styles.welcome}>WELCOME</Text>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  },
  title: {
    alignItems: 'center',
  },
  welcome: {
    fontSize: 70,
    color: '#59C3D1',
    fontWeight: 'bold',
    marginTop: 380,
  },
})