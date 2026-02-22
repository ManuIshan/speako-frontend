import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  FaBookOpen,
  FaGraduationCap,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";
import "./Courses.css";
import HomeHero6 from "../components/HomeHero6";
import HomeHero7 from "../components/HomeHero7";

const BASE_URL = "http://127.0.0.1:8000";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
    // Fetch courses
   API.get("/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log("Error fetching courses:", err));

    // Fetch enrollments if user is logged in
    if (token) {
      console.log("Fetching enrollments with token:", token.substring(0, 10) + "...");
      API.get("/enrollments/my/")
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

  const handleEnroll = async (courseId) => {
    // Check if already enrolled before attempting
    const status = getEnrollmentStatus(courseId);
    if (status === "approved" || status === "pending") {
      alert("Course already enrolled!");
      return;
    }

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await API.post("/enrollments/create/", {
  course_id: courseId,
});

      alert("Enrollment requested! Waiting for admin approval.");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Already enrolled");
    }
  };

  const getEnrollmentStatus = (courseId) => {
    if (!enrollments || enrollments.length === 0) {
      return null;
    }
    
    const enrollment = enrollments.find(
      (e) => {
        // Check both course and course_id fields
        return e.course === courseId || e.course_id === courseId;
      }
    );
    
    if (enrollment) {
      console.log(`Course ${courseId} enrollment status: ${enrollment.status}`, enrollment);
      return enrollment.status;
    }
    return null;
  };

  const categories = [
    {
      key: "essentials",
      label: "Essentials",
      desc: "Master everyday English basics.",
      icon: <FaBookOpen />,
    },
    {
      key: "exam",
      label: "Exam Prep",
      desc: "Prepare for IELTS, TOEFL and more.",
      icon: <FaGraduationCap />,
    },
    {
      key: "career",
      label: "Career Focus",
      desc: "Enhance professional skills.",
      icon: <FaBriefcase />,
    },
    {
      key: "skill",
      label: "Skill Levels",
      desc: "Progress from beginner to advanced.",
      icon: <FaLayerGroup />,
    },
  ];

  return (
    <section className="courses-section">
      <Container>

        <Row className="align-items-center courses-header">
          <Col lg={6}>
            <span className="courses-badge">Courses</span>
            <h1>Choose Your <br /> Ideal Course</h1>
            <p>Explore courses tailored to your learning goals.</p>
          </Col>

          <Col lg={6} className="text-center">
            <img
              src="/abtfindcourse.svg"
              alt="illustration"
              className="courses-hero-img"
            />
          </Col>
        </Row>

        {categories.map((cat) => {
          const filtered = courses.filter(
            (course) => course.category === cat.key
          );

          if (!filtered.length) return null;

          return (
            <div key={cat.key} className="category-block">
              <Row>

                <Col lg={4} className="category-left">
                  <div className="category-icon">
                    {cat.icon}
                  </div>
                  <h2>{cat.label}</h2>
                  <p>{cat.desc}</p>
                </Col>

                <Col lg={8}>
                  <Row className="g-4">
                    {filtered.map((course) => {

                      const imageUrl = course.image
  ? course.image.startsWith("http")
    ? course.image
    : `${import.meta.env.VITE_API_URL}${course.image}`
  : null;
                      const status = getEnrollmentStatus(course.id);

                      return (
                        <Col md={6} key={course.id}>
                          <div className="course-card">

                            <div className="card-top">
                              <span className="card-category">
                                {cat.label}
                              </span>

                              {status === "approved" && (
                                <Badge bg="success">Approved</Badge>
                              )}
                              {status === "pending" && (
                                <Badge bg="warning">Pending</Badge>
                              )}
                            </div>

                            <h4>{course.title}</h4>

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
                                {status === "approved" ? "Open Course" : status === "pending" ? "Pending..." : "Enroll Now"}
                              </Button>

                              <Button
                                className="learn-btn"
                                onClick={() => navigate(`/course/${course.id}`)}
                              >
                                Learn More
                              </Button>

                            </div>

                            <div className="card-meta">
                              <span>{course.lessons} Lessons</span>
                              <span>{course.level}</span>
                              <span>{course.duration}</span>
                            </div>

                            {imageUrl && (
                              <div className="card-image">
                                <img src={imageUrl} alt={course.title} />
                              </div>
                            )}

                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>

              </Row>
            </div>
          );
        })}

      </Container>

      <HomeHero6 />
      <HomeHero7 />
    </section>
  );
}
