# Exit on error
set -e
# Enter application directory
cd /home/ubuntu/zachbaker.dev || exit 1
# Start pm2 process with name "zachbaker.dev" and command "npm start"
pm2 start npm --name "zachbaker.dev" -- start
# Save pm2 process list for startup
pm2 save
# Copy nginx configuration file to sites-enabled
sudo cp -fr ./deploy/nginx.conf /etc/nginx/sites-enabled/zachbaker.dev
# Make root owner of nginx configuration file
sudo chown root /etc/nginx/sites-enabled/zachbaker.dev
# Reload nginx configuration
sudo nginx -s reload
