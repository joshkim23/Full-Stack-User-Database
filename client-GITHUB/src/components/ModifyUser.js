import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {updateUserByID} from '../apiTasks.js';

const ModifyUser = ({user: {firstName, lastName, age, ethnicity, id}, handleUserModified}) => {
    const [first, setFirst] = useState(firstName);
    const [last, setLast] = useState(lastName);
    const [newAge, setNewAge] = useState(age);
    const [newEthnicity, setNewEthnicity] = useState(ethnicity);
    const [apiResponse, setApiResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedUser = {firstName: first, lastName: last, age: newAge, ethnicity: newEthnicity, id: id};
        if(first && last && newAge && newEthnicity) {
            const res = await updateUserByID(updatedUser);
            setApiResponse(res);
            handleUserModified();
        } else {
            alert('please make sure all fields are filled out');
        }
    }


    return (
        !apiResponse? (
        <div>
            <form onSubmit = {handleSubmit}>
                <h1>Modify Existing User</h1>
                <div>First Name</div>
                <input type = "text" defaultValue = {firstName} onChange = {e => setFirst(e.target.value)}/>
                <div>Last Name</div>
                <input type = "text" defaultValue = {lastName} onChange = {e => setLast(e.target.value)}/>
                <div>Age</div>
                <input type = "text" defaultValue = {age} onChange = {e => setNewAge(e.target.value)}/>
                <div>Ethnicity</div>
                <input type = "text" defaultValue = {ethnicity} onChange = {e => setNewEthnicity(e.target.value)}/>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
        ) 
        : (
            <div>
                User has been updated! 
                <Link
                    to = {'/users'}>
                    <button>See Users</button>
                </Link>
            </div>
        )
        
    )
}

export default ModifyUser;