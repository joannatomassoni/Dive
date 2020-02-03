import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MenuButton from '../components/MenuButton'
import SearchResultModal from '../modals/SearchResultsModal';
 
export default function Search(props) {
    return (
        <SafeAreaView style={styles.container}>
            <MenuButton navigation={props.navigation} />

            <ScrollView style={{ marginTop: 30 }}>
                <SearchResultModal />
            </ScrollView>
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2D323A',
      justifyContent: 'center',
    },
  })
  