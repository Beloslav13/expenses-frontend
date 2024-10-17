import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

const label = {
  username: 'Логин',
  first_name: 'Фамилия',
  last_name: 'Имя',
  email: 'Почта',
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
    first_name: '',
    is_bot: false,
    is_premium: false,
    email: '',
    external_id: 0
  });
  const [patchFields, setPatchFields] = useState({})
  const [loading, setLoading] = useState(false);
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseStatus, setResponseStatus] = useState(200);
  const [responseStatusPatch, setResponseStatusPatch] = useState(0);
  const {id} = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://127.0.0.1:8000/core/api/users/${id}/`, {
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      },
    })
    .then(r => {
      setUser(r.data);
      setFields(r.data)
      setResponseStatus(200)
    })
    .catch(err => {
      console.log('err', err)
      setErrors({detail: err.response?.data.detail || err.message})
      setResponseStatus(err.response?.status || 400)
    })
    .finally(() => setLoading(false));
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

  const handleCheckBoxFields = (e) => {
    const name = e.target.name
    const value = e.target.checked

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

  }

  const handlePatch = () => {
    setLoadingPatch(true);
    axios.patch(`http://127.0.0.1:8000/core/api/users/${id}/`, patchFields, {
      headers: {
        Authorization: `Token d7081e83fb1526a2e1dc92f21814d208282aaa49`
      },
    })
    .then(res => {
      console.log(res)
      setResponseStatusPatch(200)
    })
    .catch(err => {
      console.log(err)
      setErrors(err.response.data)
      setResponseStatusPatch(err.status)
    }).finally(() => setLoadingPatch(false));
  };

  console.log(user);
  console.log('fields', fields);
  console.log('patchFields', patchFields);
  console.log('errors', errors);
  console.log('responseStatus', responseStatus);

  return (
    <>
      <Row>
        <Col sm={12} md={12}>
          <Card className="card margin dynamic-card detail-user-card w-75 m-auto" bg="secondary">
            <Card.Header className="card-header">
              <Row className="fw-bold text-center">
                <Col sm={12}><h1>Пользователь</h1></Col>
              </Row>
            </Card.Header>
            <Card.Body className="card-body">
              <Form>
                {loading ?
                  <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
                    <Spinner animation="border" variant="primary"/>
                  </div> : <>
                    <Row className="mb-3">
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-username">
                          <Form.Label>{label.username}</Form.Label>
                          <Form.Control className={`${loadingPatch ? "disabled-input" : ""}`}
                                        required
                                        name='username'
                                        type="text"
                                        placeholder="Введите..."
                                        value={fields.username}
                                        onChange={handleFields}
                                        isInvalid={!!errors?.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.username ?? [0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={1} className='d-flex align-items-center'>
                        <Form.Group className='mt-3'>
                          <Form.Check
                            required
                            name='is_bot'
                            label={label.is_bot}
                            feedback={errors?.first_name}
                            feedbackType="invalid"
                            onChange={handleCheckBoxFields}
                            checked={fields.is_bot}
                            disabled={loadingPatch}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3} className='d-flex align-items-center justify-content-around'>
                        <Form.Group className='mt-3'>
                          <Form.Check
                            required
                            name='is_premium'
                            label={label.is_premium}
                            feedback={errors?.response?.data.is_premium[0]}
                            feedbackType="invalid"
                            onChange={handleCheckBoxFields}
                            checked={fields.is_premium}
                            disabled={loadingPatch}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-first_name">
                          <Form.Label>{label.first_name}</Form.Label>
                          <Form.Control className={`${loadingPatch ? "disabled-input" : ""}`}
                                        required
                                        name='first_name'
                                        type="text"
                                        placeholder="Введите..."
                                        value={fields.first_name}
                                        onChange={handleFields}
                                        isInvalid={!!errors?.first_name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.response?.data.first_name[0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-last_name">
                          <Form.Label>{label.last_name}</Form.Label>
                          <Form.Control className={`${loadingPatch ? "disabled-input" : ""}`}
                                        required
                                        name='last_name'
                                        type="text"
                                        placeholder="Введите..."
                                        value={fields.last_name}
                                        onChange={handleFields}
                                        isInvalid={!!errors?.last_name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.response?.data.last_name[0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-email">
                          <Form.Label>{label.email}</Form.Label>
                          <Form.Control className={`${loadingPatch ? "disabled-input" : ""}`}
                                        required
                                        name='email'
                                        type="email"
                                        placeholder="Введите..."
                                        value={fields.email}
                                        onChange={handleFields}
                                        isInvalid={!!errors?.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.email ?? [0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-external_id">
                          <Form.Label>{label.external_id}</Form.Label>
                          <Form.Control className={`${loadingPatch ? "disabled-input" : ""}`}
                                        required
                                        name='external_id'
                                        type="text"
                                        placeholder="Введите..."
                                        value={fields.external_id}
                                        onChange={handleFields}
                                        isInvalid={!!errors?.external_id}
                                        disabled={loadingPatch}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.external_id ?? [0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-category_count">
                          <Form.Label>{label.category_count}</Form.Label>
                          <Form.Control className='disabled-input'
                                        name='category_count'
                                        type="text"
                                        value={fields.category_count}
                                        disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.response?.data.email[0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="user-total_spending">
                          <Form.Label>{label.total_spending}</Form.Label>
                          <Form.Control className='disabled-input'
                                        name='total_spending'
                                        type="text"
                                        value={fields.total_spending}
                                        disabled
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.response?.data.last_name[0]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Col sm={6} className="text-end pt-3 pb-3">
                        <Button variant="primary" onClick={handlePatch} disabled={loadingPatch}>
                          {loadingPatch ? "Загрузка" : "Сохранить"}
                        </Button>
                      </Col>
                    </Row>
                  </>}
              </Form>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center align-items-center card-footer-user'>
              {Object.keys(errors).length > 0 ? (
                  <Alert
                    key="danger"
                    variant="danger"
                    className="w-100 text-center mb-0">
                    {errors.detail ?? "Произошла ошибка при сохранение данных"}
                  </Alert>
                )
                :
                responseStatusPatch === 200 ? (
                  <Alert key="success" variant="success" className="w-100 text-center mb-0">Сохранено</Alert>
                ) : null
              }
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
