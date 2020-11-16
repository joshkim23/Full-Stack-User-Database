import React, {useState} from 'react';
// import { Link } from 'react-router-dom'; //used to link to /users path
import { Link } from 'react-router-dom';
import { addUserToDatabase } from '../apiTasks.js';

const AddUserForm = ({userAdded}) => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [age, setAge] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [apiResponseStatus, setApiResponseStatus] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {firstName: first, lastName: last, age: age, ethnicity: ethnicity};
        if(first && last && age && ethnicity) {
            const res = await addUserToDatabase(newUser);
            setApiResponseStatus(res);
            e.target.reset(); //to reset a form's input fields upon submission! e.target grabs the element that it came from.
            console.log(res);
            userAdded(); //need to tell parent component to fetch the new list again so when you go back to the list it's populated with the name. 
        } else {
            alert('please fill out all fields');
        }
        
    }



    return (
        !apiResponseStatus? (
        <div>
            <form onSubmit = {handleSubmit}>
                <h1>Create a New User</h1>
                <div>First Name</div>
                <input type = "text" onChange = {e => setFirst(e.target.value)}/>
                <div>Last Name</div>
                <input type = "text" onChange = {e => setLast(e.target.value)}/>
                <div>Age</div>
                <input type = "text" onChange = {e => setAge(e.target.value)}/>
                <div>Ethnicity</div>
                <input type = "text" onChange = {e => setEthnicity(e.target.value)}/>
                <div>
                    <button>Submit</button>
                </div>
            </form>

        </div>
        )
        : (
        <div>
            <div>
                <div>
                    <h3>{first} has been added to the database!</h3>
                </div>
                    <Link
                    to = {'/users'}>
                        <button>See All Users</button> 
                    </Link>
                <div>
                    <button onClick = {() => setApiResponseStatus('')}>Add Another User</button>
                </div>
            </div>
        </div>
        )
    )
}

export default AddUserForm;