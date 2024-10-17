import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const label = {
  username: 'Логин',
  first_name: 'Фамилия',
  last_name: 'Имя',
  email: 'Почти',
  external_id: 'Внешний id',
  is_bot: 'Бот',
  is_premium: 'Премиум аккаунт',
  category_count: 'Количество категорий',
  total_spending: 'Сумма расходов в рублях',
}

function UserDetailPage() {
  const [user, setUser] = useState({});
  const [fields, setFields] = useState({
    username: '',
    first_name: ''
  });
  const [patchFields, setPatchFields] = useState({})
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseStatus, setResponseStatus] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/core/api/users/${id}/`, {
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      },
    })
    .then(r => {
      setUser(r.data);
      setFields(r.data);
      setResponseStatus(200)
    })
    .catch(err => console.log('error', err));
  }, [id]);

  const handleFields = (e) => {
    const {name, value} = e.target;

    setErrors(prevErrors => {
      const {[name]: _, ...newErrors} = prevErrors;
      return newErrors;
    });

    setFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
    setPatchFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handlePatch = () => {
    setLoading(true);
    axios.patch(`http://127.0.0.1:8000/core/api/users/${id}/`, patchFields, {
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      },
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      setErrors(err)
      setResponseStatus(err.status)
    }).finally(() => setLoading(false));
  };

  console.log(user);
  console.log('fields', fields);
  console.log('patchFields', patchFields);
  console.log('errors', errors);
  console.log('errors', errors?.response?.data.username[0]);

  return (
    <>
      <Row>
        <Col sm={12} md={12}>
          <Card className="card margin dynamic-card detail-user-card w-75 m-auto" bg="secondary">
            <Card.Header className="card-header">
              <Row className="fw-bold text-center">
                <Col sm={12}><h1>Логин: {user.username}</h1></Col>
              </Row>
            </Card.Header>
            <Card.Body className="card-body">
              <Form>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="user-username">
                      <Form.Label>{label.username}</Form.Label>
                      <Form.Control
                        required
                        name='username'
                        type="text"
                        placeholder="Введите..."
                        value={fields.username}
                        onChange={handleFields}
                        isInvalid={!!errors?.response?.data.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.response?.data.username[0]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="user-first_name">
                      <Form.Label>{label.first_name}</Form.Label>
                      <Form.Control
                        required
                        name='first_name'
                        type="text"
                        placeholder="Введите..."
                        value={fields.first_name}
                        onChange={handleFields}
                        isInvalid={!!errors?.response?.data.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.first_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Button variant="primary" onClick={handlePatch}>
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center align-items-center'>
              {responseStatus === 401 ? (
                  <Form.Text
                    className='alert alert-danger text-center mt-3 mb-3 fw-bold'>{errors.response.data.detail}</Form.Text>
                ) :
                errors.length > 0 ? (<Form.Text
                    className='alert alert-danger text-center mt-3 mb-3 fw-bold'>Произошла ошибка при сохранение данных</Form.Text>)
                  : null}
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={1} md={1} className='pt-5 m-auto'>
          <Button onClick={goBack}>Назад</Button>
        </Col>
      </Row>
    </>
  );
}

export { UserDetailPage };
