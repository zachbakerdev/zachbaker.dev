# Exit on error
set -e
# Install dependencies
sudo apt-get install npm
sudo npm i -g convert-json-env
sudo npm i -g pm2
sudo npm i -g n
# Ensure Node 20 is downloaded
sudo n download 20
