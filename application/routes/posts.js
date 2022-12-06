var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
var PostError = require('../helpers/error/PostError');
const { brotliDecompressSync } = require('zlib');

var storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "public/images/uploads")
 },
 filename: function (req, file, cb) {
  let fileExtension = file.mimetype.split('/')[1];
  let randomName = crypto.randomBytes(22).toString("hex");
  cb(null, `${randomName}.${fileExtension}`)
 }
})

var uploader = multer({ storage: storage });


router.post('/createPost', uploader.single("img"), (req, res, next) => {
 let fileUpload = req.file.path;
 let fileAsThumbnail = `thumbnail-${req.file.filename}`;
 let destinationOfThumbnail = req.file.destination + '/' + fileAsThumbnail;
 let title = req.body.title;
 let description = req.body.description;
 let fk_userId = req.session.userId;

 sharp(fileUpload)
  .resize(200)
  .toFile(destinationOfThumbnail)
  .then(() => {
   return PostModel.create(
    title,
    description,
    fileUpload,
    destinationOfThumbnail,
    fk_userId
   )
  })
  .then((postWasCreated) => {
   if (postWasCreated) {
    req.flash('success', 'Post created successfully!!');
    req.session.save(err => {
     res.redirect('/');
    });
   } else {
    throw new PostError('Post could not be created!!', '/postImage', 200);
   }
  })
  .catch((err) => {
   if (err instanceof PostError) {
    errorPrint(err.getMessage());
    req.flash('error', err.getMessage());
    res.status(err.getStatus());
    res.redirect(err.getRedirectURL());
   } else {
    next(err);
   }
  })
});

router.get('/search', async(req, res, next) => {
 try{
  let searchTerm = req.query.search;
  if(!searchTerm){
   res.send({
    message: "No search term given",
    results: [],
   });
  } else {
   let results = await PostModel.search(searchTerm);
   if(results.length) {
    res.send({
     message: `${results.length} results found`,
     results: results,
    });
   } else {
    let results = await PostModel.getNRecentPosts(8);
    res.send({
     message:
      "Your search returned no results but here are\
      the most recent posts...",
      results: results,
    });
   }
  }
 }catch(err){
  next(err);
 }
})
module.exports = router;