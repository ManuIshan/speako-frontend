import { Container, Row, Col } from "react-bootstrap";
import {
  FaRocket,
  FaUserGraduate,
  FaCheckCircle,
  FaBookOpen,
} from "react-icons/fa";
import "./About.css";
import HomeHero4 from "../components/HomeHero4";
import HomeHero7 from "../components/HomeHero7";

export default function About() {
  return (
    <section className="about-page">

      <Container className="about-hero text-center">
        <span className="about-badge">About Us</span>

        <h1>
          Speako offers expert-led English
          courses for all levels, helping you
          build confidence and fluency.
        </h1>

        <div className="about-hero-image text-center">
          <img src="/aboutusmain.svg" alt="about" />
        </div>
      </Container>

      <div className="about-stats">
        <Container>
          <Row className="text-center align-items-center">

            <Col md={3} className="stat-item">
              <FaRocket className="stat-icon" />
              <h2>5K+</h2>
              <p>Students Enrolled</p>
            </Col>

            <Col md={3} className="stat-item stat-border">
              <FaUserGraduate className="stat-icon" />
              <h2>20</h2>
              <p>Expert Instructors</p>
            </Col>

            <Col md={3} className="stat-item stat-border">
              <FaCheckCircle className="stat-icon" />
              <h2>94%</h2>
              <p>Student Satisfaction</p>
            </Col>

            <Col md={3} className="stat-item stat-border">
              <FaBookOpen className="stat-icon" />
              <h2>18</h2>
              <p>Courses Offered</p>
            </Col>

          </Row>
        </Container>
      </div>

      <Container className="about-values">

        <div className="text-center values-header">
          <span className="values-badge">Core Principles</span>
          <h2>The Values <br /> We Believe In</h2>
        </div>

        <Row className="align-items-center mt-5">

          <Col lg={6}>
            <div className="values-image text-center">
              <img src="/aboutusside.svg" alt="values" />
            </div>
          </Col>

          <Col lg={6}>

            <div className="value-item">
              <span className="value-number">1</span>
              <div>
                <h4>Quality Education</h4>
                <p>
                  We are dedicated to delivering high-quality, expertly crafted
                  courses that ensure effective learning and lasting,
                  impactful real-world results.
                </p>
              </div>
            </div>

            <div className="value-item">
              <span className="value-number">2</span>
              <div>
                <h4>Learning for Everyone</h4>
                <p>
                  We believe in making language learning accessible to all,
                  regardless of location, background, prior experience,
                  or individual learning goals.
                </p>
              </div>
            </div>

            <div className="value-item">
              <span className="value-number">3</span>
              <div>
                <h4>Continuous Improvement</h4>
                <p>
                  We evolve our courses and teaching methods to stay current
                  with the latest trends and student needs,
                  ensuring the best learning experience.
                </p>
              </div>
            </div>

          </Col>
        </Row>

      </Container>
      <HomeHero4/>
      <HomeHero7/>

    </section>
  );
}
