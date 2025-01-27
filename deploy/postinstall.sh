set -e
source /home/ubuntu/.bashrc
cd /home/ubuntu/zachbaker.dev || exit 1
echo "$PROD_SECRET_ARN"
aws --region us-east-2 secretsmanager get-secret-value --secret-id "$PROD_SECRET_ARN" --query SecretString --output text > secrets.json
convert-json-env secrets.json --out .env
sudo n 20
npm ci
npm run payload migrate
npm run build
sudo chown -hR ubuntu ./
