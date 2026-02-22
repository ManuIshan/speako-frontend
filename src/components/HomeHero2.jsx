import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaBook, FaClock, FaCheckCircle } from "react-icons/fa";
import API from "../api/axios";
import "./HomeHero.css";
import { useNavigate } from "react-router-dom";

export default function HomeHero2() {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("essentials");
  const [enrollments, setEnrollments] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch home courses
    API.get("/courses/home-courses/")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log("Error fetching courses:", err));

    // Fetch enrollments (token auto attached by interceptor)
    if (token) {
      API.get("/enrollments/my/")
        .then((res) => {
          setEnrollments(res.data || []);
        })
        .catch((err) => {
          console.error(
            "Error fetching enrollments:",
            err.response?.status,
            err.response?.data
          );
          setEnrollments([]);
        });
    } else {
      setEnrollments([]);
    }
  }, [token]);

  const filteredCourses = courses.filter(
    (course) =>
      course.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  const getEnrollmentStatus = (courseId) => {
    if (!enrollments || enrollments.length === 0) return null;

    const enrollment = enrollments.find(
      (e) => e.course === courseId || e.course_id === courseId
    );

    return enrollment ? enrollment.status : null;
  };

  return (
    <section className="hero2-section">
      <Container>
        <div className="text-center hero2-header">
          <span className="hero2-badge">Start Learning</span>
          <h2 className="hero2-title">
            Choose Your <br /> Learning Path
          </h2>

          <div className="category-tabs">
            {["essentials", "exam", "career", "skill"].map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "essentials" && "Essentials"}
                {cat === "exam" && "Exam Prep"}
                {cat === "career" && "Career Focus"}
                {cat === "skill" && "Skill Levels"}
              </button>
            ))}
          </div>
        </div>

        <Row className="mt-5">
          {filteredCourses.map((course) => {
            const imageUrl = course.image
              ? course.image.startsWith("http")
                ? course.image
                : `${BASE_URL}${course.image}`
              : null;

            const status = getEnrollmentStatus(course.id);

            return (
              <Col
                lg={4}
                md={6}
                sm={12}
                key={`${activeCategory}-${course.id}`}
                className="mb-4"
              >
                <div className="course-card">
                  <div className="card-top">
                    <span className="badge-category">
                      {course.category}
                    </span>

                    {course.discount_percent > 0 && (
                      <span className="badge-discount">
                        Save {course.discount_percent}%
                      </span>
                    )}
                  </div>

                  <h4 className="course-title">{course.title}</h4>

                  <div className="course-buttons">
                    <Button
                      className="enroll-btn"
                      onClick={() => {
                        if (status === "approved") {
                          alert(
                            "✓ You are already enrolled in this course! Click 'Open Course' to access it."
                          );
                          return;
                        }

                        if (status === "pending") {
                          alert(
                            "⏳ Your enrollment is pending admin approval."
                          );
                          return;
                        }

                        if (!token) {
                          alert("Please login first to enroll");
                          navigate("/login");
                          return;
                        }

                        navigate(`/enroll/${course.id}`);
                      }}
                    >
                      {status === "approved"
                        ? "Open Course"
                        : status === "pending"
                        ? "Pending..."
                        : "Enroll Now"}
                    </Button>

                    <Button
                      className="learn-btn"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      Learn More
                    </Button>
                  </div>

                  <div className="course-meta">
                    <div>
                      <FaBook className="meta-icon" />
                      {course.lessons} Lessons
                    </div>

                    <div>
                      <FaCheckCircle className="meta-icon level-icon" />
                      {course.level}
                    </div>

                    <div>
                      <FaClock className="meta-icon" />
                      {course.duration}
                    </div>
                  </div>

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="course"
                      className="course-image"
                    />
                  )}
                </div>
              </Col>
            );
          })}
        </Row>

        <div className="text-center mt-4">
          <Button
            className="view-btn"
            onClick={() => navigate("/courses")}
          >
            View All
          </Button>
        </div>
      </Container>
    </section>
  );
}