import {v4 as uuidv4} from 'uuid';

// controllers have all the logic to make things work that are directly connected to routing. Better to put it in a separate controllers folder than in the routes file so that it's cleaner, make routes just for routes
let users = [
    {firstName: 'Josh', lastName: 'Kim', age: '25', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Sammie', lastName: 'Kau', age: '24', ethnicity: 'Taiwanese', id: uuidv4()},
    {firstName: 'Kevin', lastName: 'Guillen', age: '24', ethnicity: 'Filipino', id: uuidv4()},
    {firstName: 'Myr', lastName: 'Luong', age: '25', ethnicity: 'Vietnamese', id: uuidv4()},
    {firstName: 'Nicole', lastName: 'White', age: '25', ethnicity: 'Mixed', id: uuidv4()},
    {firstName: 'Jacky', lastName: 'Chan', age: '24', ethnicity: 'HongKongese', id: uuidv4()},
    {firstName: 'Nehemiah', lastName: 'Rubio', age: '25', ethnicity: 'Latino', id: uuidv4()},
    {firstName: 'Dillon', lastName: `O'Donahue`, age: '26', ethnicity: 'American', id: uuidv4()},
    {firstName: 'Kristen', lastName: `O'Donahue`, age: '26', ethnicity: 'American', id: uuidv4()},
    {firstName: 'Helen', lastName: 'Lee', age: '26', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Sean', lastName: 'Lee', age: '25', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Eric', lastName: 'Hong', age: '26', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Aaron', lastName: 'Lim', age: '25', ethnicity: 'Cambodian', id: uuidv4()},
    {firstName: 'Tyler', lastName: 'Jong', age: '24', ethnicity: 'Taiwanese', id: uuidv4()},
    {firstName: 'Youshin', lastName: 'Kim', age: '58', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Sunghee', lastName: 'Kim', age: '56', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Anna', lastName: 'Kim', age: '31', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Josh', lastName: 'Ahn', age: '25', ethnicity: 'Korean', id: uuidv4()},
    {firstName: 'Austin', lastName: 'Yip', age: '26', ethnicity: 'Chinese', id: uuidv4()},
    {firstName: 'Alvin', lastName: 'Lee', age: '25', ethnicity: 'Chinese', id: uuidv4()},
    {firstName: 'Chloe', lastName: 'Tsang', age: '25', ethnicity: 'HongKongese', id: uuidv4()},
    {firstName: 'Megan', lastName: 'Lee', age: '25', ethnicity: 'Chinese', id: uuidv4()},
];

// let users = [];

export const getUsers = (req, res) => { //this is the 'homepage' of /users/
res.send(users); //shows all the users 
// console.log('user database fetched by client');
};

//does .send function automatically convert objects to json? YES. looks at localhose:5000/users. from res.send, turns js object into json!

//sending data from the front end to the server, ie taking data from a login form! the data the client inputs in the form needs to be passed to the server to be stored in the database to create a new user. Add users to database
export const createUser = (req, res) => {
    let user = req.body;
    const userId = uuidv4(); //generates a unique id code for every new post request
    const userWithId = {...user, id: userId};
    res.send({success: `user with the name ${user.firstName} added to database`}); //need to send an OBJECT back to the front end! can't send a string. 
    console.log(`user with the name ${user.firstName} added to database`); 

    users.push(userWithId);
};

// get the data of a specific user
// the semicolon is used to say that you expect ANYTHING after this path, ie anything after /users/. You can put anything and this route will hit. You can retrieve the data after the /users/ using req.params! /users/2 => req.params { id: 2 }
export const getUser = (req, res) => {
    console.log(req.params);
    const { id } = req.params; //grab the text after the users/ store as id
    const foundUser = users.find(user => user.id === id);

    res.send(foundUser); 
};


export const modifyUser = (req, res) => {
    const { id } = req.params; //id specifies which user to update
    const { firstName, lastName, age, ethnicity } = req.body; //grab all the things from the request from the body from the client that are to be changed
    const user = users.find(user => user.id === id); //returns the corresponding user, once it's updated the users array is also updated.

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }
    if (ethnicity) {
        user.ethnicity = ethnicity;
    }

    res.send({message: `User with the id ${id} has been updated`});
};

// delete a specified user from the users array
export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id != id);

    res.send({message: `user with the id ${id} has been deleted`});
};


