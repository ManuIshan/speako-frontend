import { Navbar, Nav, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function CustomNavbar() {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    API.get("accounts/profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="custom-navbar"
      expanded={expanded} 
    >
      <Container fluid className="nav-container">

        <Navbar.Brand
          as={Link}
          to="/home"
          className="brand-wrapper"
          onClick={() => setExpanded(false)} 
        >
          <img
            src="/navbarsymbol.svg"
            alt="logo"
            className="brand-icon"
          />
          <span className="brand-text">Speako</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
          onClick={() => setExpanded(expanded ? false : true)} 
        />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="nav-links text-center">

            <Nav.Link onClick={() => handleNavClick("/home")}>
              Home
            </Nav.Link>

            <Nav.Link onClick={() => handleNavClick("/courses")}>
              Courses
            </Nav.Link>

            <Nav.Link onClick={() => handleNavClick("/about")}>
              About
            </Nav.Link>

            <Nav.Link onClick={() => handleNavClick("/faq")}>
              FAQ
            </Nav.Link>

            <Nav.Link onClick={() => handleNavClick("/contact")}>
              Contact
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

        <div className="nav-right">
          {user && (
            <img
              src={
                user.profile_picture
                  ? user.profile_picture.startsWith("http")
                    ? user.profile_picture
                    : `http://127.0.0.1:8000${user.profile_picture}`
                  : "https://via.placeholder.com/40"
              }
              alt="avatar"
              className="avatar"
              onClick={() => {
                navigate("/dashboard");
                setExpanded(false);
              }}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

      </Container>
    </Navbar>
  );
}