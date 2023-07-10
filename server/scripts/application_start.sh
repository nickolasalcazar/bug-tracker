#!/bin/bash

# Give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/mugbug-app

# Navigate into our working directory where we have all our GitHub files
cd /home/ec2-user/mugbug-app

# Add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# Install node modules
npm install

# Start our node app in the background
node app.js > app.out.log 2> app.err.log < /dev/null & 