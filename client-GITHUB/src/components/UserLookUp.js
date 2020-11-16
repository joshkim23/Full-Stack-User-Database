import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./UserLookup.css";

const UserLookUp = ({user: {firstName, lastName, age, ethnicity, id}, handleDeleteUser}) => {
    const [apiResponse, setApiResponse] = useState('');
    const deleteUser = async () => {
        const res = await handleDeleteUser(id);
        console.log(res.message);
        if(res) {
            setApiResponse(res.message);
        }
    }


    return (
        !apiResponse? (
        <div>
            <div className = 'single-main-container'>
                <div>
                    {firstName} {lastName}
                </div>
                <div className = 'ethnicity'>
                    {ethnicity}
                </div>
                <div>
                    Age: {age}
                </div>
            </div>
            <div>
                <Link 
                    to = {`/users/modify/${id}`}>
                    <button>Edit</button>
                </Link>
            </div>
            <div>
                <button onClick = {deleteUser}>Delete</button>
            </div>
            <div>
                <Link
                    to = {'/'}>
                    <button>Home</button>
                </Link>
            </div>
        </div>
        )
        : (
            <div>
                {firstName} {lastName} has been deleted from the database
                <div>
                    <Link
                        to = {'/'}>
                        <button>Home</button>
                    </Link>
                </div>
                <div>
                    <Link
                        to = {'/users'}>
                        <button>See Users</button>
                    </Link>
                </div>
            </div>
        )
        
    )
}

export default UserLookUp;