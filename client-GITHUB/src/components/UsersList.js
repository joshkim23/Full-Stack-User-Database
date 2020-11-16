import React from 'react';
import SingleUser from './SingleUser.js';
import { Link } from 'react-router-dom';

const UsersList = ({list, handleUserClick, handleInput, homeButtonClick, handleSearchCategory}) => {
    const userInput = (e) => handleInput(e.target.value)
    const resetInputOnClick = () => homeButtonClick();
    const setSearchCategory = (e) => handleSearchCategory(e.target.value); //grabs the value that's set in each option of the dropdown form! make it usable for later, ie all lower case, no spaces

    return (
        <div>
            <h1>Users</h1> 
            <div>
                <div>
                    <Link
                        to = {'/'}>
                        <button style = {{margin: '10px'}} onClick={resetInputOnClick}>Home</button>
                    </Link>
                </div>
                <div style = {{margin: '10px'}}>
                    Total Users: {list.length}
                </div>
                <div style = {{marginLeft: '10px'}}>
                    <form>
                        <label>
                            Select a category to search by:
                            <select defaultValue = 'First Name' onChange = {setSearchCategory}>
                                <option value = 'firstName'>First Name</option>
                                <option value = 'lastName'>Last Name</option>
                                <option value = 'ethnicity'>Ethnicity</option>
                                <option value = 'age'>Age</option>
                            </select>
                        </label>
                    </form>
                    <input type = 'text' placeholder = 'Look up a user by name' onChange = {userInput}/>
                </div>
        
                {list.map(user => 
                    <SingleUser
                    firstName = {user.firstName}
                    lastName = {user.lastName}
                    age = {user.age}
                    ethnicity = {user.ethnicity}
                    key = {user.id}
                    id = {user.id}
                    handleUserClick = {handleUserClick}
                />)}
            </div>
            
        </div>
    )
}

export default UsersList