import React from 'react';
import { Link } from 'react-router-dom'; //used to link to /users path

const HomePage = () => {
    return (
        <div>
            <div>
                <Link 
                    to = {`/users/AddUserForm`}> 
                    <button>Add a User</button>
                </Link>
            </div>
            <div>
                <Link 
                    to = {`/users`}> 
                    <button>See Users</button>
                </Link>
            </div>
            
        </div>
    )
}

export default HomePage;
