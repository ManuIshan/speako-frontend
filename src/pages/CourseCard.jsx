import { Button } from "react-bootstrap";
import { FaBook, FaClock, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const imageUrl = course?.image
    ? course.image.startsWith("http")
      ? course.image
      : `${BASE_URL}${course.image}`
    : null;

  return (
    <div className="course-card w-100">

      <div className="card-top">
        <span>{course.category}</span>

        {course.discount_percent > 0 && (
          <span className="badge-discount">
            Save {course.discount_percent}%
          </span>
        )}
      </div>

      <h4 className="course-title text-center">
        {course.title}
      </h4>

      <div className="course-buttons">
        <Button
          className="enroll-btn"
          onClick={() => navigate(`/enroll/${course.id}`)}
        >
          Enroll Now
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
          alt={course.title}
          className="course-image"
        />
      )}

    </div>
  );
}