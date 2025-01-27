sudo rm /etc/nginx/sites-enabled/zachbaker.dev
pm2 delete "zachbaker.dev"
pm2 save
