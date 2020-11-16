import React from 'react';
import './SingleUser.css';
import { Link } from 'react-router-dom';

const SingleUser = ({firstName, lastName, age, ethnicity, id,  handleUserClick}) => {
    const handleClick = () => handleUserClick(id); //from app.js

    return (
            <div className = 'outer-container'>
                <Link to = {`/users/id/${id}`} style = {{textDecoration: 'none', color: 'black', cursor: 'pointer'}}>
                <div className = 'main-container' onClick = {handleClick}>
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
                </Link>
            </div>
 
    )
}

export default SingleUser;