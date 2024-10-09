import { NavLink } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import './Header.css'

const setActive = (({isActive}) => isActive ? 'active-link nav-link' : 'nav-link')

function Header() {
  return (
    <>
      <Container fluid className="mb-5">
        <header className="pt-2 pb-2">
          <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <NavLink to="/" className={setActive}>Главная</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink to="/users/" className={setActive}>Пользователи</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink to="/categories/" className={setActive}>Категории</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink to="/spendings/" className={setActive}>Расходы</NavLink>
            </Nav.Item>
          </Nav>
        </header>
      </Container>
    </>
  )
}

export default Header;