const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');
const firebase = require('firebase');


// Helpers
const {
  synchronizeTable,
} = require('./helpers/synchronize-table');

// Initialize express application
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(fileupload());


process.env.SECRET_KEY = 'h27ao9ej38hdl9';

// Create seperate routes for secures and public paths
const publicRoutes = express.Router();
const securesRoutes = express.Router();
const postmanRoutes = express.Router();

// Create prefix for all API routes
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/secured', securesRoutes);
app.use('/postman', postmanRoutes);

// Use bodyParser for public routes
publicRoutes.use(bodyParser.json());
publicRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Use bodyParser for secured routes
securesRoutes.use(bodyParser.json({
  limit: '50mb',
}));
securesRoutes.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);


const {
  jwtValidate,
} = require('./middlewares/authentication');

securesRoutes.use(jwtValidate);

// Use bodyParser for postman routes
postmanRoutes.use(bodyParser.json());
postmanRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// POST API
const {
  addNewPost,
  updatePost,
  deletePost,
  getAllPosts,
  searchPostByContext,
} = require('./controllers/post');

securesRoutes.get('/posts', getAllPosts);
securesRoutes.post('/add_new_post', addNewPost);
securesRoutes.patch('/update_post/:id', updatePost);
securesRoutes.delete('/delete_post/:id', deletePost);
securesRoutes.post('/search_post', searchPostByContext);

// User API
const {
  getUserDetails,
  updateUserDetails,
} = require('./controllers/user');
// User Authenticate
const {
  registerUser,
  loginUser,
} = require('./controllers/user');

publicRoutes.post('/user_register', registerUser);
publicRoutes.post('/user_login', loginUser);
securesRoutes.get('/user/:id', getUserDetails);
securesRoutes.patch('/user/:id', updateUserDetails);

// Comment API
const {
  addNewComment,
  getCommentForPost,
  increaseLikeCounts,
} = require('./controllers/comment');

securesRoutes.post('/add_new_comment', addNewComment);
securesRoutes.get('/comment/:postId', getCommentForPost);
securesRoutes.patch('/comment/likes/:commentId/:likesCount', increaseLikeCounts);

// Assets API
const {
  fileUpload,
  getAsset,
  getAssetType,
} = require('./controllers/assets');

securesRoutes.post('/file_upload/:userId/:typeId', fileUpload);
securesRoutes.get('/assets/:userId/:typeId', getAsset);
securesRoutes.get('/assets/types', getAssetType);

// To use only in POSTMAN!
const {
  addNewAssetType,
} = require('./controllers/assets');

postmanRoutes.post('/asset_type/new', addNewAssetType);

// Define port for server
const PORT = process.env.PORT || 8081;

// Synchronize tables before starting an server
synchronizeTable();

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
