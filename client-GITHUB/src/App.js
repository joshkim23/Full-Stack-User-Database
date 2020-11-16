import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './components/HomePage.js';
import AddUserForm from './components/AddUserForm.js';
import UsersList from './components/UsersList.js';
import UserLookUp from './components/UserLookUp.js';
import ModifyUser from './components/ModifyUser.js';
import { fetchUsers, deleteUser } from './apiTasks.js';
import { filterByInput } from './dataManipulation.js';

const App = () => {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState([]); //grabs specific user that client selected, to be used to look at that specific user, or to modify/delete the user! has the id that's created on the backend and abstracted away from the client.
    const [inputSearch, setInputSearch] = useState('');
    const [searchCategory, setSearchCategory] = useState('firstName');

    //if input, modify userList by passing the fetched data into a function on datamanipulation.js, if there isn't one then just pass the fetched list. 
    const fetchUsersList = async () => {
        const data = await fetchUsers();
        if(inputSearch) {
            const filteredData = filterByInput(data, inputSearch, searchCategory);
            setUserList(filteredData);
        } else {
            console.log('hi');
            setUserList(data);
        }
    }

    // component mounted => fetch users list, inputSearch updated => fetch users list. See https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871
    useEffect(() => {
        setSearchCategory('firstName');
        fetchUsersList();
        // eslint-disable-next-line
    },[]);  //[] is so that the useEffect occurs ONLY on the component mounts and not when state changes!!! without it, it renders on both. that paired with inputSearch, it only fetches when the component mounts or input search changes!
    //need to separate them or else it will loop infinitely, can't combine input search and []. 
    useEffect(() => {
        fetchUsersList();
        // eslint-disable-next-line
    },[inputSearch]);

    const handleUsersListHomeButtonClick = () => setInputSearch(''); //once home button is clicked, sets input search to empty string so when you come back to users list page it renders the whole list. 

    //pass handle function into the usersList component, everytime the input field is filled out/changed, it automatically will sort through the fetched list and render it based on what's inputted by the user. 
    const handleInputSearchChange = (input) => {
        if(input.length !== 0){
            setInputSearch(input);
        }
        if(input.length === 0) setInputSearch('');
    }

    const handleInputSearchCategorySelection = (category) => {
        console.log(`search Category Changed to ${category}`)
        setSearchCategory(category);
    }


    //for grabbing the id which user the client clicked to be passed to the userlookup component
    const handleUserClick = (id) => {
        const clickedUser = userList.filter(item => item.id === id);
        setUser(clickedUser[0]);
        console.log(clickedUser[0]);
    }

    const handleDeleteUser = async (id) => {
        const idObject = {id: id};
        const res = await deleteUser(idObject);
        setSearchCategory('firstName'); 
        fetchUsersList(); //fetch new users, which resets the state on the front end! do this instead of editing the list on the front end so it's fetching data from the server 
        return res;
    }

    const handleUserModified = () => {
        fetchUsersList();
        setInputSearch(''); //need this so when you search a name and click and then edit, when u go back to users it renders the whole new list
        setSearchCategory('firstName');
    }

    const handleUserAdded = () => fetchUsersList();

    // pass props to components using react router by using render method instead of component! 
    return (
        <Router>
            <Route path = "/" exact component={HomePage} /> 

            <Route path = "/users/modify" render = {() => <ModifyUser user = {user} handleUserModified = {handleUserModified}/>} />

            <Route path = "/users" exact render={() => <UsersList list = {userList} handleUserClick = {handleUserClick} handleInput = {handleInputSearchChange} homeButtonClick = {handleUsersListHomeButtonClick} handleSearchCategory = {handleInputSearchCategorySelection}/>} />

            <Route path = "/users/id" render = {() => <UserLookUp user = {user} handleDeleteUser = {handleDeleteUser}/>} />

            <Route path = "/users/AddUserForm" exact render = {() => <AddUserForm userAdded = {handleUserAdded}/>}/>
        </Router>
    )
}

export default App;