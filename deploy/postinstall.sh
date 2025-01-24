cd /home/ubuntu/new-zachbaker.dev || exit 1
aws --region us-east-2 secretsmanager get-secret-value --secret-id arn:aws:secretsmanager:us-east-2:332624953468:secret:prod/zachbaker.dev-wELJx9 --query SecretString --output text > secrets.json
convert-json-env secrets.json --out .env
sudo n 20
npm ci
npm run build
sudo chown -hR ubuntu ./
