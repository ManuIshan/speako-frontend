import { Container, Row, Col, Accordion } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./Faq.css";
import HomeHero7 from "../components/HomeHero7";

export default function Faq() {
  const sections = [
    {
      title: "Course Information",
      faqs: [
        {
          q: "What English levels do you offer?",
          a: "We offer courses for Beginner, Intermediate, and Advanced learners. Each level is designed to gradually improve your speaking, listening, reading, and writing skills."
        },
        {
          q: "How do I choose the right course?",
          a: "You can start by taking our placement test or reviewing course descriptions. If unsure, our support team can guide you based on your goals and current level."
        },
        {
          q: "How long does each course take?",
          a: "Most courses range from 4 to 12 weeks depending on the level and learning pace you choose."
        },
        {
          q: "Are the courses suitable for all levels?",
          a: "Yes, our structured curriculum ensures learners from absolute beginners to advanced speakers can benefit."
        },
        {
          q: "Do the courses include any assessments?",
          a: "Yes, each course includes quizzes, assignments, and final assessments to track your progress."
        },
        {
          q: "Are the courses self-paced?",
          a: "Most courses are self-paced, allowing you to learn anytime. Some premium courses include live sessions."
        },
        {
          q: "Are the lessons live or recorded?",
          a: "We provide both recorded lessons for flexibility and live sessions for interactive learning."
        },
        {
          q: "Can I switch courses if I feel it’s not the right fit?",
          a: "Yes, you can switch courses within the first few days of enrollment by contacting support."
        }
      ]
    },
    {
      title: "Enrollment & Payment",
      faqs: [
        {
          q: "How do I enroll in a course?",
          a: "Simply choose your course, click enroll, and complete the checkout process. You'll get instant access after payment."
        },
        {
          q: "What payment methods are accepted?",
          a: "We accept credit/debit cards, UPI, net banking, and select digital wallets."
        },
        {
          q: "Is there a refund policy?",
          a: "Yes, we offer a limited refund window if you’re not satisfied. Terms may vary by course."
        },
        {
          q: "Can I pay in installments?",
          a: "Some premium courses offer installment options. Check the course details for availability."
        },
        {
          q: "Can I try a lesson before enrolling?",
          a: "Yes, we offer preview lessons so you can experience our teaching style before committing."
        },
        {
          q: "Is there a discount for early enrollment?",
          a: "We occasionally offer discounts and promotions. Keep an eye on announcements or subscribe to updates."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          q: "Can I access the course on mobile?",
          a: "Yes, our platform is fully responsive and works on mobile, tablet, and desktop devices."
        },
        {
          q: "What are the system requirements?",
          a: "A stable internet connection and a modern browser like Chrome, Edge, or Safari are recommended."
        },
        {
          q: "Why is my course progress not saving?",
          a: "This may be due to connectivity issues. Ensure stable internet and avoid clearing browser data frequently."
        },
        {
          q: "I can’t download course materials. What can I do?",
          a: "Check your browser settings or try a different browser. If the issue persists, contact support."
        },
        {
          q: "How do I contact technical support?",
          a: "You can reach us via email or the support section in your dashboard. We usually respond within 24 hours."
        }
      ]
    },
    {
      title: "Certificates & Completion",
      faqs: [
        {
          q: "Will I get a certificate?",
          a: "Yes, you will receive a certificate upon successful completion of the course."
        },
        {
          q: "How do I receive my certificate?",
          a: "Your certificate will be available for download from your dashboard after completing all requirements."
        },
        {
          q: "Is the certificate recognized?",
          a: "Our certificates are industry-recognized and demonstrate your English proficiency."
        },
        {
          q: "Can I share my certificate on LinkedIn?",
          a: "Absolutely! You can add it to your LinkedIn profile or share it with employers."
        }
      ]
    }
  ];

  return (
    <section className="faq-page">

      <Container className="faq-hero">
        <Row className="align-items-center">

          <Col lg={6}>
            <span className="faq-badge">FAQ</span>
            <h1>Clarifying <br /> Your Doubts</h1>
            <p>Find clear answers to all your questions.</p>
          </Col>

          <Col lg={6} className="text-center">
            <img src="/faq.svg" alt="faq" className="faq-hero-img" />
          </Col>

        </Row>
      </Container>

      <Container>

        {sections.map((section, index) => (
          <div key={index} className="faq-section">

            <Row>

              <Col lg={4}>
                <h3 className="faq-section-title">
                  {section.title}
                </h3>
              </Col>

              <Col lg={8}>
                <Accordion flush>
                  {section.faqs.map((item, i) => (
                    <Accordion.Item
                      eventKey={`${index}-${i}`}
                      key={i}
                      className="faq-item"
                    >
                      <Accordion.Header>
                        <FaCheckCircle className="faq-icon" />
                        {item.q}
                      </Accordion.Header>
                      <Accordion.Body>
                        {item.a}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>

            </Row>

          </div>
        ))}

      </Container>

      <HomeHero7/>

    </section>
  );
}