import React, { useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function Cal() {
  useEffect(() => {
    (async () => {
      console.log('1')
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Button title="Sync with Calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync();
  const defaultCalendars = calendars.filter(
    each => each.source.name === 'Default'
    );
  return defaultCalendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Dive Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Dive Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'RSVPd Events',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}