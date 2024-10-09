import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function UserDetailPage() {
  const [user, setUser] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(r => setUser(r.data))
    .catch(err => console.log('error', err));
  }, [id]);

  console.log(user);

  return (
    <>
      <Button onClick={goBack}>Назад</Button>
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