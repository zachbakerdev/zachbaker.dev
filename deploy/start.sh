set -e
cd /home/ubuntu/zachbaker.dev || exit 1
pm2 start npm --name "zachbaker.dev" -- start
pm2 save
sudo cp -fr ./deploy/nginx.conf /etc/nginx/sites-enabled/zachbaker.dev
sudo chown root /etc/nginx/sites-enabled/zachbaker.dev
