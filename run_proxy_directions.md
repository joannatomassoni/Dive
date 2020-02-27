[Google's instructions, here,](https://cloud.google.com/sql/docs/mysql/quickstart-proxy-test) are pretty clear, but let Joanna know if you have any questions.

## Installation

### Install and log into the gcloud CLI
1. Install gcloud CLI: https://cloud.google.com/sdk/docs/#install_the_latest_cloud_sdk_version
2. Initialize gcloud tool: `gcloud init` (I think you can do this and step 3 from any part of your file system)
3. Authenticate the gcloud tool: `gcloud auth login`

### Install the cloud proxy client
1. Download the proxy: `curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64`
2. Make the proxy executble: `chmod +x cloud_sql_proxy`

## Running the proxy

### Start the proxy
1. From the server diectory, run: `./cloud_sql_proxy -instances=dive-ios:us-central1:dive=tcp:3307`
    - You should see a message like: 
    <br>`Listening on 127.0.0.1:3307 for myproject:us-central1:myinstance". Ready for new connections`
    - Keep this terminal running

### Connect to the database using the proxy client
1. In a different terminal from where you started the proxy, run:
    - `mysql -u root -p --host 127.0.0.1 --port 3307`
    - Enter password when prompted (find it in your .env)
    - This should shell you into the proxy db.

