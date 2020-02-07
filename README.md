# Dive

## Use ngrok to run the app on your mobile device using your local server

1. Run `ngrok http localhost:8080`
2. Note the Forwarding url that is provided (the https protocol is what worked for us).
3. Assign that to a variable called AXIOS_URL in your client-side .env file. 
4. Make sure your backend server is running (a command like `node/index.js` from inside the server directory will do)

Cloudinary

1.Inside the cloudinary URL is the developer’s cloudniary name
'https://api.cloudinary.com/v1_1/da4ry89ct/upload'
The ‘da4ry89ct’ within that url is an example of a developer’s cloudinary name.   To get your own Cloudinary name you will need to go to Cloudinary and create an account.  During this process you can create a name or let Cloudinary choose one for you.  You will always have access to this name by going to the dashboard in Cloudinary.  

2. Another thing you will need is the upload present.  Go to the settings section of Cloudinary.  Then proceed to the “upload” tab.  If you scroll down you will see the “upload presets” section.  You will want to set it to “unsigned”.  Once you do this, Cloudinary will give you a preset name.  It will look similar to “oecwb18t”.  This will need to be included inside the fetch request. 