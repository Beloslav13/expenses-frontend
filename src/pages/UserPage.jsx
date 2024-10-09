import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";


function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/core/api/users/', {
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      }
    })
    .then(res => {
      setUsers(res.data.results)
      console.log(res)
    })
    .catch(err => console.log('error', err));
  }, [])

  console.log(users);

  return (
    <div className="block-container">
      <div className="block">
        <h1>Список пользователей</h1>
        <div className="card margin">
          <div className="card-header">
            <Row className='fw-bold text-center'>
              <Col sm={3}>Псевдоним</Col>
              <Col sm={3}>Внешний id</Col>
              <Col sm={3}>Количество категорий</Col>
              <Col sm={3}>Сумма расходов</Col>
            </Row>
          </div>
          <div className="card-body select-area">
            {users ? users.map((user, index) => (
              <Row key={user.id} className={`py-2 can-select ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <Link key={user.id} to={`/users/${user.id}/`} className='d-flex text-center'>
                  <Col sm={3}>{user.username}</Col>
                  <Col sm={3}>{user.external_id}</Col>
                  <Col sm={3}>{user.category_count}</Col>
                  <Col sm={3}>{user.total_spending}</Col>
                </Link>
              </Row>
            )) : null}
          </div>
        </div>


      </div>
    </div>
  )
}

export { UserPage };