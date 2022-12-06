var express = require('express');
var router = express.Router();
const db = require('../config/database')
const UserModel = require('../models/Users')
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters')
const UserError = require('../helpers/error/UserError')
const { RegistrationValidation, loginValidation } = require('../middleware/validation')
var bcrypt = require('bcrypt');

router.post('/register', RegistrationValidation, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  UserModel.usernameExists(username)
    .then((usernameDoesExist) => {
      if (usernameDoesExist) {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/register",
          200
        );
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if (emailDoesExist) {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/register",
          200
        );
      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        )
      } else {
        successPrint("User.js --> User was created!!");
        req.flash('success', 'User account created successfully!');
        req.session.save(err => {
          res.redirect('/login');
        })
      }
    })
    .catch((err) => {
      errorPrint("user could not be created", err);
      console.log(err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage())
        res.status(err.getStatus());
        req.session.save(err => {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }
    })
})

router.post('/login', loginValidation,(req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success', 'You have successfully logged in!');
        req.session.save(() => {
          res.redirect('/');
        })
      }else {
        throw new UserError("Invalid username and/or password!", "/login", 200);
      }
    })
    .catch((err) => {
      console.log(err);
      errorPrint("user login failed", err);
      if (err instanceof UserError || err == -2) {
        if(err == -2){
          err = new UserError("Invalid username and/or password!", "/login", 200);
        }
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        req.session.save(err => {
          res.redirect('/login');
        })
      }
      else {
        next(err);
      }
    });
})

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('Session could not be destroyed!');
      next(err);
    } else {
      successPrint('Session was destroyed!');
      res.clearCookie('csid');
      res.json({ status: 'OK', message: "user is logged out" });
    }
  })
})

module.exports = router;
