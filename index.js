const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Helpers
const {
  synchronizeTable,
} = require('./helpers/synchronize-table');

// Initialize express application
const app = express();


app.use(cors());

process.env.SECRET_KEY = 'h27ao9ej38hdl9';

// Create seperate routes for secures and public paths
const publicRoutes = express.Router();
const securesRoutes = express.Router();

// Create prefix for all API routes
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/secured', securesRoutes);

// Use bodyParser for public routes
publicRoutes.use(bodyParser.json());
publicRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// User bodyParser for secured routes
securesRoutes.use(bodyParser.json());
securesRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


// User Authenticate
const {
  authorizeUser,
} = require('./controllers/user');

publicRoutes.post('/user_authenticate', authorizeUser);


// POST API
const {
  addNewPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require('./controllers/post');

securesRoutes.get('/posts', getAllPosts);
securesRoutes.post('/add_new_post', addNewPost);
securesRoutes.patch('/update_post/:id', updatePost);
securesRoutes.delete('/delete_post/:id', deletePost);


// User API
const {
  getUserDetails,
  updateUserDetails,
} = require('./controllers/user');

securesRoutes.get('/user/:id', getUserDetails);
securesRoutes.patch('/user/:id', updateUserDetails);


// Comment API

const {
  addNewComment,
  getCommentForPost,
} = require('./controllers/comment');


securesRoutes.post('/add_new_comment', addNewComment);
securesRoutes.get('/comment/:postId', getCommentForPost);
// Define port for server
const PORT = process.env.PORT || 8081;

// Synchronize tables before starting an server
synchronizeTable();

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
