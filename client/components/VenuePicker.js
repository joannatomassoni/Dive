import React from 'react';
import {
  ActionSheetIOS,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class VenuePicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      venue: 'none selected',
    }
  }
  
  render() {
    
    return (
      <View>
        {/* button to select a venue  */}
        <TouchableOpacity
          style={styles.createShowContainer}
          onPress={this.showActionSheet}
        >
          <Text style={styles.selectButtonText}>Select Venue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: this.props.allVenues,
      cancelButtonIndex: 0
    },
      (buttonIndex) => {
        this.setState({ venue: this.props.allVenues[buttonIndex] });
        this.props.setVenueName(this.state.venue);
      });
  };
}

const styles = StyleSheet.create({
  createShowContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 140,
    alignSelf: 'center',
    marginTop: 5
  },
  selectButtonText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    paddingTop: 5
  },
  flexRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'center',
    paddingRight: 20
  }
});