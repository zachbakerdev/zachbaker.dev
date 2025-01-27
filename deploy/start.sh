set -e
cd /home/ubuntu/zachbaker.dev || exit 1
pm2 start npm --name "zachbaker.dev" -- start
pm2 save
