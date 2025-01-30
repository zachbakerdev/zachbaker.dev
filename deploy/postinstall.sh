# Exit on error
set -e
# Load environment variables for user "ubuntu"
source /home/ubuntu/.bashrc
# Enter application directory and make "ubuntu" owner
cd /home/ubuntu/zachbaker.dev || exit 1
sudo chown -hR ubuntu ./
# Retrieve secrets and convert to .env.local file
aws --region us-east-2 secretsmanager get-secret-value --secret-id "$PROD_SECRET_ARN" --query SecretString --output text > secrets.json
convert-json-env secrets.json --out .env.local
# Set node.js version to 20
sudo n 20
# Clean install packages
npm ci
# Migrate database
npm run payload migrate
# Build application
npm run build
