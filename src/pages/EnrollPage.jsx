import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import {
  FaCreditCard,
  FaLock,
  FaUser,
  FaCalendarAlt,
  FaShieldAlt
} from "react-icons/fa";
import "./EnrollPage.css";

export default function EnrollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("enrollments/create/", {
        course_id: id,
        payment_id: "DEMO-PAYMENT-123",
      });

      alert("Enrollment request sent. Awaiting admin approval.");
      navigate("/home");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <section className="enroll-page">
      <Container>
        <Row className="align-items-center justify-content-center">

          <Col lg={6} className="mb-4">
            <div className="enroll-card">

              <div className="secure-badge">
                <FaLock /> Secure Payment
              </div>

              <h2>Complete Your Enrollment</h2>

              <Form onSubmit={handleEnroll}>

                <Form.Group className="mb-3 input-group-custom">
                  <Form.Label>
                    <FaUser className="icon" /> Cardholder Name
                  </Form.Label>
                  <Form.Control required placeholder="John Doe" />
                </Form.Group>

                <Form.Group className="mb-3 input-group-custom">
                  <Form.Label>
                    <FaCreditCard className="icon" /> Card Number
                  </Form.Label>
                  <Form.Control required placeholder="1234 5678 9012 3456" />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3 input-group-custom">
                      <Form.Label>
                        <FaCalendarAlt className="icon" /> Expiry
                      </Form.Label>
                      <Form.Control required placeholder="MM/YY" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3 input-group-custom">
                      <Form.Label>
                        <FaShieldAlt className="icon" /> CVV
                      </Form.Label>
                      <Form.Control required placeholder="123" />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="pay-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay & Enroll Now"}
                </Button>

              </Form>

            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div className="enroll-image-wrapper">
              <img
                src="/abtgotquestions.svg"
                alt="payment"
                className="enroll-image"
              />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}
