import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomeHero7.css";

export default function HomeHero7() {
  const navigate = useNavigate();

  return (
    <section className="hero7-section">
      <Container>
        <Row className="g-4">

          <Col md={6}>
            <div className="hero7-card">
              <img src="/abtfindcourse.svg" alt="courses" />
              <h3>Find the Right Course for You</h3>
              <Button
                className="hero7-btn"
                onClick={() => navigate("/courses")}
              >
                Explore Courses
              </Button>
            </div>
          </Col>

          <Col md={6}>
            <div className="hero7-card">
              <img src="/whoweare.svg" alt="about" />
              <h3>Who We Are & Why It Matters</h3>
              <Button
                className="hero7-btn"
                onClick={() => navigate("/about")}
              >
                About Speako
              </Button>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}