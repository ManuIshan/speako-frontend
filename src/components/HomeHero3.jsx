import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./HomeHero3.css";

export default function HomeHero3() {
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
    comment: "",
    avatar: null,
  });

  const fetchReviews = async () => {
    try {
      const res = await API.get("/reviews/");
      setReviews(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("level", formData.level);
    data.append("comment", formData.comment);

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    try {
      await API.post("/reviews/create/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShow(false);

      setFormData({
        name: "",
        level: "Beginner",
        comment: "",
        avatar: null,
      });

      fetchReviews();
    } catch (err) {
      console.log("Submit error:", err.response?.data || err);
    }
  };

  return (
    <section className="hero3-section">
      <Container>

        <h2 className="text-center mb-5">
          What Our Learners Say
        </h2>

        <div className="reviews-wrapper mt-4">
          <Row className="reviews-row g-4">

            {reviews.slice(0, 4).map((review) => {
              const avatarUrl = review.avatar
                ? review.avatar.startsWith("http")
                  ? review.avatar
                  : `${BASE_URL}${review.avatar}`
                : "https://via.placeholder.com/50";

              return (
                <Col md={6} lg={3} key={review.id}>
                  <div className="review-card">
                    <p>{review.comment}</p>

                    <div className="review-user">
                      <img
                        src={avatarUrl}
                        alt="avatar"
                        className="review-avatar"
                      />

                      <div>
                        <strong>{review.name}</strong>
                        <div className="level-text">
                          {review.level}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}

          </Row>
        </div>

        <div className="text-center mt-4">
          <Button
            className="comment-btn"
            onClick={() => setShow(true)}
          >
            Comment Your Thought
          </Button>
        </div>

        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>

          <Form onSubmit={handleSubmit}>
            <Modal.Body>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  placeholder="Your Review"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={handleChange}
                />
              </Form.Group>

            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>

              <Button type="submit" variant="dark">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </Container>
    </section>
  );
}