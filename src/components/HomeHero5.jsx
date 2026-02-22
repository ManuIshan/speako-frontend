import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomeHero5.css";

export default function HomeHero5() {
  return (
    <section className="hero5-section">
      <Container>
        <Row className="align-items-center">

          <Col lg={6}>
            <div className="hero5-content">
              <h2>
                Ready to Reach <br /> the Next Level?
              </h2>

              <p>
                Move beyond basics – master English
                with engaging, real-world practice!
              </p>

              <div className="hero5-buttons">
                <Button className="primary-btn">
                  Start Learning 
                </Button>

                <Button className="secondary-btn">
                  Try Free Lesson
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div className="hero5-image-wrapper">
              <img
                src="/contactbelow.svg"
                alt="illustration"
                className="hero5-image"
              />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}
