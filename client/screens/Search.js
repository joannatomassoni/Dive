import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MenuButton from '../components/MenuButton'
import SearchResultModal from '../modals/SearchResultsModal';
import { LinearGradient } from 'expo-linear-gradient';

export default function Search(props) {
    return (
        <View style={styles.container}>
            <MenuButton navigation={props.navigation} />
            <ScrollView style={{ marginTop: 70 }}>
                <SearchResultModal />
            </ScrollView>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2D323A',
      justifyContent: 'center',
    },
  })
  