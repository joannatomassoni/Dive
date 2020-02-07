# Dive


## Running the app

1. Install Xcode v11.1 or later to use the iPhone simulator
2. Run `node index.js` from the server directory to start the back end server
3. Run `yarn start` from the client directory to start the client server
4. Select `run on iOs simulator` from the expo browser page, or press `i` in terminal running the client server
5. Select the `Dive` application from the expo app in iOs simulator

## Running on your mobile device using your local server

1. Run `ngrok http localhost:8080`
2. Note the Forwarding url that is provided (the https protocol is what worked for us).
3. Assign that to a variable called AXIOS_URL in your client-side .env file. 
4. Make sure your backend server is running (a command like `node/index.js` from inside the server directory will do)

## Resources

* [React Native Docs](https://facebook.github.io/react-native/)
* [Babel Docs](https://babeljs.io/docs/setup/)
* [React Native Elements Docs](https://react-native-elements.github.io/react-native-elements/)
* [Expo Docs](https://docs.expo.io/versions/latest/)
* [Postman](https://www.getpostman.com/)
* [NodeJS Docs](https://nodejs.org/)


## Copyright

&copy; 2020 OperationSpark.  This material is copyrighted by OperationSparks and may not be distributed to the public