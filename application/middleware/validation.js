const userCheck = (username) => {
  let usernameChecker = /^\D\w{2,}$/
  return usernameChecker.test(username);
}

const emailCheck = (email) => {
  let emailChecker = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailChecker.test(email);
}

const passCheck = (password) => {
  let passwordChecker = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  console.log(password);
  return passwordChecker.test(password);
}

const RegistrationValidation = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confirm = req.body.confirm;
  console.log(username);
  if (!userCheck(username)) {
    req.flash('error', "Invalid Username!!");
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if(!emailCheck(email)) {
    req.flash('error', "Invalid email address!!");
    req.session.save(err => {
      res.redirect('/register');
    })
  }else if (!passCheck(password)) {
    req.flash('error', "Invalid password!!");
    req.session.save(err => {
      res.redirect('/register');
    })
  } else if (confirm != password) {
    req.flash('error', "Passwords must match!!");
    req.session.save(err => {
      res.redirect('/register');
    })
  } else {
    next();
  }
}

const loginValidation = (req, res, next) =>{
  let username = req.body.username;
  let password = req.body.password;
  if (!userCheck(username)) {
    req.flash('error', "Invalid Username!!");
    req.session.save(err => {
      res.redirect('/login');
    })
  }else if (!passCheck(password)) {
    req.flash('error', "Invalid password!!");
    req.session.save(err => {
      res.redirect('/login');
    })
  } else{
    next();
  }
}

module.exports = { RegistrationValidation, loginValidation }
