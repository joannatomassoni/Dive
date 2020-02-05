import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default async function registerForPushNotificationsAsync() {
  try {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user
  
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      alert('If you want notifications from Dive, enable push notifications in your phone settings.');
      return null;
    }
  
    // Get the token that identifies this device
    const token = await Notifications.getExpoPushTokenAsync();
    return token; 
  }
  catch(err) {
    console.log(err);
  }
  // // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(endpoint, {
  //   method: 'PATCH',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
}