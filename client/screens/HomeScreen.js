import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../components/MenuButton'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation}/>
        <Text style={styles.text}>Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30
  }
})


// import React from 'react';
// import { ScrollView, StyleSheet, Button, Text } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text>Hello World!</Text>
//     </ScrollView>
//   );
// }

// HomeScreen.navigationOptions = {
//   title: 'Shows',
//   headerRight: () => (
//     <Button onPress={() => alert('Login')} title="Login" />
//   ),
//   headerLeft: () => (
//     <Button onPress={() => alert('Menu')} title="Menu" />
//   ),
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   }
// });
