# Remove nginx configuration file
sudo rm /etc/nginx/sites-enabled/zachbaker.dev
# Stop and delete old pm2 process
pm2 delete "zachbaker.dev"
# save process list. Use force in case process list is empty
pm2 save --force
