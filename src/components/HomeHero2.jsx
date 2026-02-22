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

  useEffect(() => {
    API.get("courses/home-courses/")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log("Error fetching courses:", err));

    if (token) {
      console.log("Fetching enrollments with token:", token.substring(0, 10) + "...");
      API.get("enrollments/my/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log("✓ Enrollments fetched successfully:", res.data);
          setEnrollments(res.data || []);
        })
        .catch((err) => {
          console.error("✗ Error fetching enrollments:", err.response?.status, err.response?.data);
          setEnrollments([]);
        });
    } else {
      console.log("No token found - user not logged in");
      setEnrollments([]);
    }
  }, [token]);

  const filteredCourses = courses.filter(
    (course) =>
      course.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  const getEnrollmentStatus = (courseId) => {
    if (!enrollments || enrollments.length === 0) {
      return null;
    }
    
    const enrollment = enrollments.find((e) => {
      // Check both course and course_id fields
      return e.course === courseId || e.course_id === courseId;
    });
    
    if (enrollment) {
      console.log(`Course ${courseId} enrollment status: ${enrollment.status}`, enrollment);
      return enrollment.status;
    }
    return null;
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
          {filteredCourses.map((course) => (
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
                      const currentStatus = getEnrollmentStatus(course.id);
                      
                      // Check if user is already enrolled
                      if (currentStatus === "approved") {
                        alert("✓ You are already enrolled in this course! Click 'Open Course' to access it.");
                        return;
                      }
                      if (currentStatus === "pending") {
                        alert("⏳ Your enrollment is pending admin approval. Please wait.");
                        return;
                      }
                      
                      // Check if user is logged in
                      if (!token) {
                        alert("Please login first to enroll");
                        navigate("/login");
                        return;
                      }
                      
                      // Proceed to enrollment
                      navigate(`/enroll/${course.id}`);
                    }}
                  >
                    {(() => {
                      const status = getEnrollmentStatus(course.id);
                      if (status === "approved") return "Open Course";
                      if (status === "pending") return "Pending...";
                      return "Enroll Now";
                    })()}
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

                {course.image && (
                  <img
                    src={
                      course.image.startsWith("http")
                        ? course.image
                        : `http://127.0.0.1:8000${course.image}`
                    }
                    alt="course"
                    className="course-image"
                  />
                )}
              </div>
            </Col>
          ))}
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
