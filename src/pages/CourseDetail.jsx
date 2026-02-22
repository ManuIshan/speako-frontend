import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaFilePdf, FaLock } from "react-icons/fa";
import "./CourseDetails.css";
import CourseCard from "./CourseCard";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/detail/${id}/`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!course) return null;

  return (
    <section className="course-detail">
      <Container>

        <div className="detail-hero">
          <span className="detail-badge">{course.category}</span>
          <h1 className="detail-title">{course.title}</h1>
          <p className="detail-meta">
            {course.lessons} Lessons • {course.level} • {course.duration}
          </p>

          <Button
            className="enroll-btnn"
            onClick={() => navigate(`/enroll/${course.id}`)}
          >
            Enroll Now
          </Button>
        </div>

        <div className="detail-section text-center">
          <h3>Overview</h3>
          <p className="overview-text">{course.overview}</p>
        </div>

        <div className="detail-section">
          <h3>Course Structure</h3>

          <Row>
            {course.modules?.map((mod, index) => (
              <Col md={6} key={index}>
                <div className="module-box">
                  <span>{mod.title}</span>
                  <span className="lesson-count">
                    {mod.lessons_count} Lessons
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="detail-section text-center">
          <h3>Assessment</h3>

          {course.assessments?.map((ass, index) => (
            <div key={index} className="assessment-title">
              {ass.title}
            </div>
          ))}

          {course.is_unlocked ? (
            <div className="image-grid">
              {course.assessment_images?.map((img, index) => (
                <img className="text-center"
                  key={index}
                  src={
                    img.startsWith("http")
                      ? img
                      : `http://127.0.0.1:8000${img}`
                  }
                  alt="assessment"
                />
              ))}
            </div>
          ) : (
            <div className="locked-box">
              <FaLock className="lock-icon" />
              <p>Assessment tips unlock after admin approval.</p>
            </div>
          )}
        </div>

        <div className="detail-section text-center">
          {course.is_unlocked && course.pdf ? (
            <a
              href={
                course.pdf.startsWith("http")
                  ? course.pdf
                  : `http://127.0.0.1:8000${course.pdf}`
              }
              target="_blank"
              rel="noreferrer"
              className="pdf-btn"
            >
              <FaFilePdf className="me-2" />
              Download Course PDF
            </a>
          ) : (
            <div className="locked-box">
              <FaLock className="lock-icon" />
              <p>PDF available after admin approval.</p>
              <Button
                className="enroll-btnn mt-3"
                onClick={() => navigate(`/enroll/${course.id}`)}
              >
                Enroll to Unlock
              </Button>
            </div>
          )}
        </div>

        <div className="related-section text-center">
          <h2>Courses You Might Enjoy</h2>

          <Row className="justify-content-center mt-4">
            {course.related?.map((item) => (
              <Col
                lg={4}
                md={6}
                sm={12}
                key={item.id}
                className="d-flex justify-content-center mb-4"
              >
                <CourseCard course={item} />
              </Col>
            ))}
          </Row>
        </div>

      </Container>
    </section>
  );
}
