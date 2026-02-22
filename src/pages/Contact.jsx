import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import {
  FaEnvelope,
  FaPen,
  FaCartShopping,
  FaPhone,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import "./Contact.css";
import HomeHero5 from "../components/HomeHero5";

export default function Contact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      alert("Message Sent Successfully 🔥");
    }

    setValidated(true);
  };

  return (
    <section className="contact-page">

      <Container className="contact-hero">
        <Row className="align-items-center">

          <Col lg={6}>
            <span className="contact-badge">Contact</span>
            <h1>Get in Touch <br /> with Support</h1>
            <p>Need help? Contact our team, and we'll assist you!</p>
          </Col>

          <Col lg={6} className="text-center">
            <img src="/contact.svg" alt="contact" className="contact-img" />
          </Col>

        </Row>
      </Container>

      <Container>

        <Row className="contact-main">

          <Col lg={4}>
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h5>Get Support</h5>
              <p>support@speako.com</p>
            </div>

            <div className="contact-card">
              <FaPen className="contact-icon" />
              <h5>General Inquiries</h5>
              <p>info@speako.com</p>
            </div>

            <div className="contact-card">
<FaCartShopping className="contact-icon" />
              <h5>Contact Sales</h5>
              <p>sales@speako.com</p>
            </div>

            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <h5>Call Us</h5>
              <p>+1 800-123-4567</p>
            </div>
          </Col>

          <Col lg={8}>
            <div className="form-card">

              <h4>Get In Touch</h4>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        placeholder="Enter your phone"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your phone.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={5}
                    placeholder="Tell us how we can help"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your message.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="send-btn">
                  Send Message
                </Button>

              </Form>
            </div>
          </Col>

        </Row>

        <div className="follow-section text-center">
          <h4>Follow Us</h4>

          <Row className="g-3 mt-3">
            {["Discord", "LinkedIn", "X (Twitter)", "Facebook"].map(
              (social, index) => (
                <Col md={6} key={index}>
                  <div className="social-card">
                    {social}
                    <FaArrowUpRightFromSquare />
                  </div>
                </Col>
              )
            )}
          </Row>
        </div>

      </Container>
      <HomeHero5/>

    </section>
  );
}
