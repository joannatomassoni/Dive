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

## Cloudinary

1. Inside the cloudinary URL is the developer’s cloudniary name
'https://api.cloudinary.com/v1_1/da4ry89ct/upload'
The ‘da4ry89ct’ within that url is an example of a developer’s cloudinary name.   To get your own Cloudinary name you will need to go to Cloudinary and create an account.  During this process you can create a name or let Cloudinary choose one for you.  You will always have access to this name by going to the dashboard in Cloudinary.  

2. Another thing you will need is the upload present.  Go to the settings section of Cloudinary.  Then proceed to the “upload” tab.  If you scroll down you will see the “upload presets” section.  You will want to set it to “unsigned”.  Once you do this, Cloudinary will give you a preset name.  It will look similar to “oecwb18t”.  This will need to be included inside the fetch request. 

## Resources

* [React Native Docs](https://facebook.github.io/react-native/)
* [Babel Docs](https://babeljs.io/docs/setup/)
* [React Native Elements Docs](https://react-native-elements.github.io/react-native-elements/)
* [Expo Docs](https://docs.expo.io/versions/latest/)
* [Postman](https://www.getpostman.com/)
* [NodeJS Docs](https://nodejs.org/)
* [MySql Docs](https://dev.mysql.com/doc/)
* [Cloudinary Docs](https://cloudinary.com/documentation/image_video_and_file_upload)

## Copyright

&copy; 2020 OperationSpark.  This material is copyrighted by OperationSparks and may not be distributed to the public
