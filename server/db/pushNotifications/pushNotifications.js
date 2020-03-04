const { Expo } = require('expo-server-sdk');

// Create a new Expo client
const expo = new Expo();

// If a band adds a show, we gather all the push tokens of their followers
// in controllers/Show.js
const sendNotifications = async (pushTokens, title, body) => {
    try {
        // Create the messages that we want to send to clients
        let messages = [];
        for (let pushToken of pushTokens) {
          // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
          // Check that all our push tokens appear to be valid Expo push tokens
          if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
          }
          // Construct a message
          const message = {
            to: pushToken,
            sound: 'default',
            title,
            body
          }
          messages.push(message)
        
        
        // Create chunks for batching
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
          // Send the chunks to the Expo push notification service
          for (let chunk of chunks) {
            try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            } catch (error) {
              console.error(error);
            }
          }
        })();
    }
  }
      catch(err) {
          console.log(err);
      }
}

module.exports = {
    sendNotifications,
    expo
}