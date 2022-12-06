var express = require('express');
var router = express.Router();
var IsLoggedIn = require('../middleware/routerprotectors').userIsLoggedIn;
var {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require("../config/database");
/* GET home page. */
router.get('/', getRecentPosts,function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Laith Hussin" });
});

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.get('/register', (req, res, next) => {
  res.render('registration', {title: "Register"});
})

router.use('/postimage', IsLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage');
})

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('viewpost', {title: `Post${req.params.id}`});
})

module.exports = router;
