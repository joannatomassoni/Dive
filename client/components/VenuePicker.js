import React from 'react';
import ReactNative from 'react-native';
var {
  ActionSheetIOS,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

let VENUES = [
  'Venue 1',
  'Venue 2',
  'Venue 3',
  'Venue 4',
  'Cancel'
];

let CANCEL_INDEX = 5;

export default class VenuePicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      venue: 'none selected',
    }
  }

  render() {
    return (
      <View style={styles.flexRow}>
        {/* button to select a venue  */}
        <TouchableOpacity
          style={styles.createShowContainer}
          onPress={this.showActionSheet}
        >
          <Text style={styles.selectButtonText}>Select Venue</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {this.state.venue}
        </Text>
      </View>
    );
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: VENUES,
      cancelButtonIndex: CANCEL_INDEX,
    },
      (buttonIndex) => {
        this.setState({ venue: VENUES[buttonIndex] });
        this.props.setVenueName(this.state.venue);
      });
  };
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  createShowContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 140,
    marginHorizontal: 7
  },
  selectButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
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