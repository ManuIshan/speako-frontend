import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <Container>

        <Row className="footer-top align-items-center">
          <Col md={6} className="d-flex align-items-center gap-2">
            <img
              src="/footersmall.svg"
              alt="logo"
              className="footer-small-logo"
            />
            <h4 className="footer-logo-text">Speako</h4>
          </Col>

          <Col md={6} className="text-md-end footer-links">
            <Link to="/courses">Courses</Link>
            <Link to="/about">About Us</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </Col>
        </Row>

        <div className="footer-big-wrapper">
          <img
            src="/footer.svg"
            alt="big-logo"
            className="footer-big-logo"
          />
        </div>

        <Row className="footer-bottom">
          <Col md={6}>
            © 2025, All Rights Reserved
          </Col>

          <Col md={6} className="text-md-end">
            Licenses &nbsp;&nbsp; Powered by Speako
          </Col>
        </Row>

      </Container>
    </footer>
  );
}
