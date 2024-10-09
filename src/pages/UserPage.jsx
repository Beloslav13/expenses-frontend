import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";


function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/')
    .then(res => setUsers(res.data))
    .catch(err => console.log('error', err));
  }, [])

  console.log(users);

  return (
    <>
      <h1>User Page</h1>
      {users.map(user => (
        <Link key={user.id} to={`/users/${user.id}/`}>
          <li>{user.name}</li>
        </Link>
      ))}
    </>
  )
}

export { UserPage };