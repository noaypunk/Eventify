import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PAGES
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";

// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./AdminComponents/AdminEvents";
import AdminUsers from "./AdminComponents/AdminUsers";
import AdminReports from "./AdminComponents/AdminReports";

// --- PRIVATE ROUTES ---
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// --- STAFF ROUTE ---
const StaffRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isStaff) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page accessible to all */}
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route
          path="/landingpage"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admindashboard"
          element={
            <StaffRoute>
              <AdminDashboard />
            </StaffRoute>
          }
        />
        <Route
          path="/adminevents"
          element={
            <StaffRoute>
              <AdminEvents />
            </StaffRoute>
          }
        />
        <Route
          path="/adminusers"
          element={
            <StaffRoute>
              <AdminUsers />
            </StaffRoute>
          }
        />
        <Route
          path="/adminreports"
          element={
            <StaffRoute>
              <AdminReports />
            </StaffRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
