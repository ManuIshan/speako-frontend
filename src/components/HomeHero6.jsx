import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./HomeHero6.css";

export default function HomeHero6() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What English levels do you offer?",
      answer:
        "We offer Beginner, Intermediate, and Advanced courses designed for real-world communication."
    },
    {
      question: "Can I try a lesson before enrolling?",
      answer:
        "Yes! You can access a free demo lesson before purchasing."
    },
    {
      question: "How long does each course take?",
      answer:
        "Courses usually take 4–8 weeks depending on your pace."
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept UPI, Cards, Net Banking and secure gateways."
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Yes, you get lifetime access and can learn anytime."
    },
    {
      question: "How do I choose the right course?",
      answer:
        "Take our placement test or contact support for help."
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes, you receive a completion certificate."
    },
    {
      question: "Are the lessons live or recorded?",
      answer:
        "Mostly recorded lessons with optional live sessions."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="hero6-section">
      <Container>

        <div className="text-center hero6-header">
          <span className="hero6-badge">Ask & Learn</span>
          <h2>
            Need Help? <br /> Start Here First
          </h2>
        </div>

        <Row className="mt-5 g-4">
          {faqs.map((faq, index) => (
            <Col lg={6} key={index}>
              <div
                className={`faq-card ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <span className="faq-icon">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`faq-answer ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
}
