import { Container, Row, Col } from "react-bootstrap";
import {
  Users,
  Briefcase,
  Folder,
  Award,
  MessageCircle,
  MousePointerClick,
} from "lucide-react";
import "./HomeHero4.css";

export default function HomeHero4() {
  return (
    <section className="hero4-section">
      <Container>

        <div className="hero4-header text-center">
          <span className="hero4-badge">We're Different</span>
          <h2 className="hero4-title">
            The Better <br /> Way to Learn
          </h2>
        </div>

        <Row className="g-5 mt-4">

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <Users className="feature-icon" size={42} strokeWidth={1.5} />
              <h5>Expert Instructors</h5>
              <p>
                Learn from certified teachers who focus on practical,
                everyday English.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <Briefcase className="feature-icon" size={42} strokeWidth={1.5} />
              <h5>Real Practice</h5>
              <p>
                Build confidence through real-life conversations and
                practical exercises.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <Folder className="feature-icon" size={42} strokeWidth={1.5} />
              <h5>Custom Learning</h5>
              <p>
                Tailored courses for every level, from beginner basics
                to advanced fluency.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <Award className="feature-icon" size={42} strokeWidth={1.5} />
              <h5>Proven Success</h5>
              <p>
                5,000+ students improved their skills and achieved
                language goals.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <MessageCircle
                className="feature-icon"
                size={42}
                strokeWidth={1.5}
              />
              <h5>Community Support</h5>
              <p>
                Connect with fellow learners, ask questions,
                and get helpful feedback.
              </p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div className="feature-box text-center">
              <MousePointerClick
                className="feature-icon"
                size={42}
                strokeWidth={1.5}
              />
              <h5>Anytime Access</h5>
              <p>
                Study anytime, anywhere, with flexible lessons
                that fit your schedule.
              </p>
            </div>
          </Col>

        </Row>

      </Container>
    </section>
  );
}
