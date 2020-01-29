# Dive

## Use ngrok to run the app on your mobile device using your local server

1. Run `ngrok http localhost:8080`
2. Note the Forwarding url that is provided.
3. Assign that to a variable called AXIOS_URL in your client-side .env file. 
4. Make sure your backend server is running (a command like `node/index.js` from inside the server directory will do)