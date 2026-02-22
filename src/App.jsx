import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Scroll } from "lucide-react";
import EnrollPage from "./pages/EnrollPage";
import CourseDetail from "./pages/CourseDetail";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dasshboard";
import { setupTokenRefresh } from "./services/tokenService";

function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // Start token refresh service on mount
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      console.log("🔐 User is logged in - Starting token refresh service");
      setupTokenRefresh();
    }
  }, []);

  return (
    <>
      {!hideLayout && <CustomNavbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />      <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
        />
 <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
<Route
  path="/course/:id"
  element={
    <ProtectedRoute>
      <CourseDetail />
    </ProtectedRoute>
  }
/>
        <Route
          path="/enroll/:id"
          element={
            <ProtectedRoute>
              <EnrollPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
         
          
      

      </Routes>
      

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Layout />
    </BrowserRouter>
  );
}
