import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PUBLIC PAGES
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";


// ADMIN PAGES
import AdminDashboard from "./pages/AdminDashboard"; // the actual page
import AdminEvents from "./AdminComponents/AdminEvents";
import AdminUsers from "./AdminComponents/AdminUsers";
import AdminReports from "./AdminComponents/AdminReports";

// --- PRIVATE ROUTES ---
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// --- STAFF-ONLY ROUTES ---
const StaffRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isStaff) return <Navigate to="/LandingPage" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER LANDING PAGE */}
        <Route
          path="/LandingPage"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />

        {/* USER PROFILE */}
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

        {/* --- ADMIN ROUTES --- */}
        <Route
          path="/AdminDashboard"
          element={
            <StaffRoute>
              <AdminDashboard />
            </StaffRoute>
          }
        />

        <Route
          path="/AdminEvents"
          element={
            <StaffRoute>
              <AdminEvents />
            </StaffRoute>
          }
        />

        <Route
          path="/AdminUsers"
          element={
            <StaffRoute>
              <AdminUsers />
            </StaffRoute>
          }
        />

        <Route
          path="/AdminReports"
          element={
            <StaffRoute>
              <AdminReports />
            </StaffRoute>
          }
        />

        {/* DEFAULT FALLBACK */}
        <Route path="*" element={<Navigate to="/LandingPage" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
