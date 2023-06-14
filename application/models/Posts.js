var db = require("../config/database");
const PostModel = {};

PostModel.create = (title, description, photopath,
   thumbnail, fk_userId) => {
   let baseSQL = `INSERT INTO posts (title, description, 
                 photopath, thumbnail, createdAt, fk_userId) 
                 VALUE(?,?,?,?, now(),?);;`
   return db.execute(baseSQL, [
      title,
      description,
      photopath,
      thumbnail,
      fk_userId])
      .then(([results, fields]) => {
         return Promise.resolve(results && results.affectedRows);
      })
      .catch((err) => Promise.reject(err));
}

PostModel.search = (searchTerm) => {
   let baseSQL = 
      `select id, title, description, thumbnail, 
      concat_ws(' ', title, description) as haystack
      from posts
      HAVING haystack like ?;`
   let sqlReadySearchTerm = "%" + searchTerm + "%";
   return db.execute(baseSQL, [sqlReadySearchTerm])
   .then(([results, fields]) => {
      return Promise.resolve(results);
   })
   .catch((err) => Promise.reject(err));
}

PostModel.getNRecentPosts = (numberOfPosts) => {
   let baseSQL = "SELECT id, title, description, thumbnail, createAt FROM posts ORDER BY createAt DESC LIMIT ?";
   return db.query(baseSQL,
      [numberOfPosts]).then(([results, fields]) => {
         return Promise.resolve(results);
      })
      .catch((err) => Promise.reject(err));
}

PostModel.getPostById = (postId) =>{
   let baseSQL = `SELECT u.username, p.title, p.description, p.photopath, p.createAt
  FROM users u
  JOIN posts p
  ON u.id=fk_userId
  WHERE p.id=?;`

  return db.execute(baseSQL,[postId])
  .then(([results, fields]) => {
      return Promise.resolve(results);
  })
  .catch(err => Promise.reject(err));
}
module.exports = PostModel;