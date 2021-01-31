# Google Authentication with oAuth2 Nodejs
Authenticate with a Google account.
# Setup Environment Variables
You should change the clientID and clientSecret and callbackURL in /config/passport.js file with your personal informations in your google account.
```
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: ""
 }
```
## To run this code you can use the following commands : 
* npm install
* nodemon server
