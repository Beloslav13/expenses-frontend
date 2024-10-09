import { NavLink, Outlet } from 'react-router-dom';
import { Container } from "react-bootstrap";

const setActive = (({isActive}) => isActive ? 'active-link' : '')

function Layout() {
  return (
    <>
      <header>
        <NavLink to="/" className={setActive}>Home</NavLink>
        <NavLink to="/users" className={setActive}>Users</NavLink>
        <NavLink to="/categories" className={setActive}>Categories</NavLink>
        <NavLink to="/spendings" className={setActive}>Spendings</NavLink>
      </header>

      <Container>
        <Outlet/>
      </Container>

      <footer>App 2024</footer>
    </>
  )
}

export { Layout }