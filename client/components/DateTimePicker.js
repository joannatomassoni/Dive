import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      mode: 'datetime',
      show: false,
      selected: false
    }
  }
  //set date on each selector change
  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      date,
    });
  }
  //funciton to show date picker
  show = () => {
    this.setState({
      show: true,
    });
  }
  // function to hide date picker
  hide = () => {
    this.setState({
      show: false,
      selected: true
    });
  }

  
  render() {
    const { show, date, mode, selected } = this.state;
    return (
      <View>
        <View>
          {/* button to show date selector */}
        </View>
        {show ? 
          <View>
            {/* date selector */}
            <DateTimePicker 
              style={styles.container}
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={this.setDate}
            />
            {/* set date and close selector */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.hide();
                this.props.setDateTime(date);
              }}
            >
              <Text style={styles.buttonText}>Set Date</Text>
            </TouchableOpacity>
          </View>
          // open date selector
          : <View>
              {selected && <Text style={styles.dateText}>
                {Moment(this.state.date).format('MMM Do YYYY, h:mm')}
              </Text>}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.show}
              >
                <Text style={styles.buttonText}>Select Date</Text>
              </TouchableOpacity>
              
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#59C3D1',
    paddingVertical: 10,
    borderRadius: 5,
    width: 200,
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dateText: { 
    color: '#fff', 
    fontWeight: 'bold' ,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 5,
    fontSize: 20
  }
})