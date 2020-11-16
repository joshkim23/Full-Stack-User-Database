import express from 'express';
import { getUsers, createUser, getUser, modifyUser, deleteUser } from '../controllers/users.js';

// routing determines how an application responds to a client request to a particular ENDPOINT, ie a URL (path)and a specific HTTP request method (GET, POST, PATCH, DELETE, etc.). The browser can only send get requests, so we use postman to test the API to send diff request methods.
const router = express.Router(); //creates a new router object.

// each route can have one or more handler functions, which are executed when the route is matched. 
// route structure: app.METHOD(PATH, HANDLER); app is an instance of express, METHOd is an HTTP request method in lower case, path is a path on the server, and handler is the function executed when the route is matched.

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/:id', modifyUser); //patch is used for a partial modification of an account, put on the other hand is to change everything

router.delete('/:id', deleteUser);

export default router;