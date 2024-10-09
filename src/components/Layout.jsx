import { Outlet } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Header from "./Header/Header";
import Footer from "./Footer/Footer.jsx";


function Layout() {
  return (
    <>
      <Header/>

      <Container>
        <Outlet/>
      </Container>

      <Footer/>
    </>
  )
}

export { Layout }