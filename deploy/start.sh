set -e
cd /home/ubuntu/new-zachbaker.dev || exit 1
pm2 start npm --name "new-zachbaker.dev" -- start
pm2 save
