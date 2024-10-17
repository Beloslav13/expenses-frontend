import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Col, Row, Spinner, Form } from "react-bootstrap";
import CustomPagination from "../components/Pagination/Pagination.jsx";
import { HEADERS, HOST, QUERY_LIMIT, USERS_URL } from "../config.js";


function UserPage(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const fetchData = () => {
    setLoading(true)
    axios.get(`${HOST}${USERS_URL}/`, {
      params: {limit: QUERY_LIMIT, page: page},
      headers: HEADERS,
    })
    .then(res => {
      setUsers(res.data.results)
      setPrevDisabled(!res.data.previous)
      setNextDisabled(!res.data.next)
      setCount(res.data.count)
    })
    .catch(err => setError(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, [page])

  const handleNextPage = (e) => {
    setPage(page + 1)
  }

  const handlePrevPage = (e) => {
    setPage(page - 1)
  }

  console.log('error', error);

  return (
    <div className="block-container">
      <div className="block">
        <h1 className='pb-3 text-center'>Список пользователей</h1>
        <Card className="card margin dynamic-card">
          <Card.Header className="card-header">
            <Row className='fw-bold text-center'>
              <Col sm={3}>Логин</Col>
              <Col sm={3}>Внешний id</Col>
              <Col sm={3}>Количество категорий</Col>
              <Col sm={3}>Сумма расходов</Col>
            </Row>
          </Card.Header>
          {loading ?
            <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
              <Spinner animation="border" variant="primary"/>
            </div> :
            <Card.Body className="card-body select-area">
              {users ? users.map((user, index) => (
                <Row key={user.id} className={`py-2 can-select ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <Link key={user.id} to={`/users/${user.id}/`} className='d-flex text-center'>
                  <Col sm={3}>{user.username}</Col>
                  <Col sm={3}>{user.external_id ?? '-'}</Col>
                  <Col sm={3}>{user.category_count}</Col>
                  <Col sm={3}>{user.total_spending} руб.</Col>
                </Link>
              </Row>
            )) : null}
          </Card.Body>
          }
          <Card.Footer className='d-flex justify-content-center align-items-center'>
            <Row>
              <Col sm={12}>
                <CustomPagination handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} prevDisabled={prevDisabled} nextDisabled={nextDisabled}/>
              </Col>
            </Row>
          </Card.Footer>
          {error && !error.response && (
            <Form.Text className='alert alert-danger text-center mt-3 mb-3 fw-bold'>{error.message}</Form.Text>
          )}
          {error && error.response && (
            <Form.Text className='alert alert-danger text-center mt-3 mb-3 fw-bold'>{error.response.statusText}</Form.Text>
          )}
        </Card>


      </div>
    </div>
  )
}

export { UserPage };