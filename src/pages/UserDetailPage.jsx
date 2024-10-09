import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetailPage() {
  const {id} = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => setUser(r.data))
    .catch(err => console.log('error', err));
  }, [id]);

  console.log(user);

  return (
    <>
      <h1>User id: {id}</h1>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
        </>
      )}
    </>
  )
}

export { UserDetailPage };