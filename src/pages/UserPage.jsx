import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import CustomPagination from "../components/Pagination/Pagination.jsx";
import { QUERY_LIMIT } from "../config.js";


function UserPage(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [page, setPage] = useState(1);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const fetchData = () => {
    setLoading(true)
    axios.get('http://127.0.0.1:8000/core/api/users/', {
      params: {limit: QUERY_LIMIT, page: page},
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      },
    })
    .then(res => {
      setUsers(res.data.results)
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
      setCount(count)
      setPrevDisabled(!res.data.previous);
      setNextDisabled(!res.data.next);
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

  console.log('nextPage', nextPage);
  console.log('prevPage', prevPage);
  console.log('page', page);

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
        </Card>


      </div>
    </div>
  )
}

export { UserPage };