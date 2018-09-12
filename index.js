const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');

// Helpers
const {
  synchronizeTable,
} = require('./helpers/synchronize-table');

// Initialize express application
const app = express();


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
securesRoutes.use(bodyParser.json());
securesRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


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
  authorizeUser,
} = require('./controllers/user');

publicRoutes.post('/user_authenticate', authorizeUser);
securesRoutes.get('/user/:id', getUserDetails);
securesRoutes.patch('/user/:id', updateUserDetails);


// Comment API

const {
  addNewComment,
  getCommentForPost,
} = require('./controllers/comment');


securesRoutes.post('/add_new_comment', addNewComment);
securesRoutes.get('/comment/:postId', getCommentForPost);


// Assets API
const {
  fileUpload,
  getAsset,
} = require('./controllers/assets');


securesRoutes.post('/file_upload/:userId/:typeId', fileUpload);
securesRoutes.get('/assets/:userId/:typeId', getAsset);


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
