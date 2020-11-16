import express from 'express'; //used for routing
import bodyParser from 'body-parser'; //allows you to take in incoming post request bodies
import usersRoutes from './routes/users.js'; //when using default imports, we can name this whatever we want
import cors from 'cors';

//GET POST PUT DELETE 
//CRUD: Create, Read, Update, Delete
//Create user accounts, get/read profile details, update profile details, delete an account

const app = express(); //create an express application. express() is a top level function exported by the express module
const PORT = 5000;

app.use(bodyParser.json()); //declares that we're using json data in the application

app.use(cors()); // to allow http requests from any origin!

app.use('/users', usersRoutes); //when people visit /users, run the routes! All routes that start with users are part of usersRoutes

// when a client gets to the home page, they send a get request to localhost5000. So on the server side, we are expecting a get request with a forward slash, ie the homepage. By visiting the home page (/) we make a get request to the domain! 
app.get('/', (req, res) => res.send('Welcome to the home page bro')); //request and response

app.listen(PORT, () => console.log(`Server running on port: http://localhost${PORT}`)); //make the application listen for incoming requests (connections). specify PORT to listen on, and a callback function that executes once the server is up and running. This is a simple express server!

