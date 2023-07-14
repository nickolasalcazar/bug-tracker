#!/bin/bash
# Give permission for everything in the express-app directory
sudo chmod -R /home/ec2-user/mugbug-app
sudo chown -R ec2-user:ec2-user /home/ec2-user/mugbug-app

# Navigate into our working directory where we have all our GitHub files
cd /home/ec2-user/mugbug-app

# Add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# Install node modules
npm install

# Pull config variables
echo PORT=443 > .env
echo AUTH0_API_ID=$(aws ssm get-parameter --name "/mugbug/auth0/api_id" | jq '.Parameter.Value') >> .env
echo AUTH0_AUDIENCE=$(aws ssm get-parameter --name "/mugbug/auth0/audience" | jq '.Parameter.Value') >> .env
echo CLIENT_ORIGIN_URL=$(aws ssm get-parameter --name "/mugbug/auth0/client_origin_url" | jq '.Parameter.Value') >> .env
echo AUTH0_DOMAIN=$(aws ssm get-parameter --name "/mugbug/auth0/domain" | jq '.Parameter.Value') >> .env
echo AUTH0_SECRET=$(aws ssm get-parameter --name "/mugbug/auth0/secret" | jq '.Parameter.Value') >> .env

# Start our node app in the background
node app.js > app.out.log 2> app.err.log < /dev/null & 