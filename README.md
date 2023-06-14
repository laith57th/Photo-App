# Description:

## This is a simple photo application using express that allows users to register, login, post images and comments to their account. The application uses bcrypt to hash passwords and includes server side authentication for registered users.


# Build/Run Instructions

## Build Instructions
1. cd application (if at the root)
2. npm install
3. npm i hbs
4. npm i promise
5. npm i express
6. npm run builddb //This builds the database tables
7. npm start //This runs the app on localhost:3000/

## Run Instructions
1. npm run
2. must reload to show posted comment :) 

## Notes
1. Must change the password to match the root host password in the following files:
   Photo-App/application/config/database.js
   Photo-App/application/bin/dbloader
