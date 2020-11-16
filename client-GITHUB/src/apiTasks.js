let ENDPOINT = 'http://localhost:5000/users';

export const fetchUsers = () => {
    return fetch(ENDPOINT, {
        method: 'GET'
    }).then(res => res.json())
    .then(data => data);
}


export const addUserToDatabase = (newUser) => {
    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const deleteUser = (id) => {
    console.log(JSON.stringify(id));
    return fetch((`${ENDPOINT}/${id.id}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const updateUserByID = (updatedUser) => {
    return fetch((`${ENDPOINT}/${updatedUser.id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}