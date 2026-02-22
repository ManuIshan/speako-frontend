import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomeHero1.css";

export default function HomeHero1() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">

          <Col lg={6}>
            <div className="hero-content">

              <div className="hero-badge">
                Learn Like a Pro
              </div>

              <h1 className="hero-title">
                Boost Your <br />
                English Skills
              </h1>

              <p className="hero-subtitle">
                Improve your knowledge with expert guidance!
              </p>

              <div className="hero-buttons">
                <Button
                  className="primary-btn bg-black"
                  onClick={() => navigate("/courses")}
                >
                  Start Learning
                </Button>

                <Button
                  className="secondary-btn"
                  onClick={() => navigate("/courses")}
                >
                  Try Free Lesson
                </Button>
              </div>

              <div className="trusted-row">
                <div className="avatars">
                  <img src="/faq.svg" alt="" />
                  <img src="/faq.svg" alt="" />
                  <img src="/faq.svg" alt="" />
                </div>

                <span className="trusted-text">
                  Trusted by 5,000+ learners
                </span>
              </div>

            </div>
          </Col>

          <Col lg={6} className="text-center">
            <img
              src="/homeimg.svg"
              alt="illustration"
              className="hero-image"
            />
          </Col>

        </Row>
      </Container>
    </section>
  );
}