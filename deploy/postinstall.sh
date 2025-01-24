cd /home/ubuntu/new-zachbaker.dev || exit 1
sudo n 20
npm ci
npm run build
sudo chown -hR ubuntu ./
