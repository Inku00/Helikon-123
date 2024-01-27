import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartSum } from '../store/CartSumContext';
import { useAuth } from '../store/AuthContext';

function NavigationBar() {
  const { cartSum } = useCartSum();
  const { isLoggedIn, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLangEn = () => {
    i18n.changeLanguage("en");
    localStorage.setItem("language", "en");
  }

  const changeLangEe = () => {
    i18n.changeLanguage("ee");
    localStorage.setItem("language", "ee");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn === true && <Nav.Link as={Link} to="/admin">{t("nav.admin")}</Nav.Link>}
            <Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{t("nav.contact")}</Nav.Link>
            <Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>
          </Nav>
          <Nav>
            <div>{cartSum} €</div>
            <img className="lang" src="/english.png" onClick={changeLangEn} alt="" />
            <img className="lang" src="/estonian.png" onClick={changeLangEe} alt="" />
            {isLoggedIn === false && <>
              <Nav.Link as={Link} to="/login">{t("nav.login")}</Nav.Link>
              <Nav.Link as={Link} to="/signup">{t("nav.signup")}</Nav.Link>
            </>}
            {isLoggedIn === true && <button onClick={logout}>Logout</button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar