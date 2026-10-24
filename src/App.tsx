import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import ReviewPage from "./pages/ReviewPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetail from "./pages/ItemDetail";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:code" element={<CourseDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Public, like login: you cannot be logged in yet. */}
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          {/* <-- the guard */}
          <Route path="submissions" element={<SubmissionsPage />} />
          {/* Session 11: behind the same guard -- the API refuses it without a token */}
          <Route path="review" element={<ReviewPage />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="items" element={<ItemsPage />} />
        <Route path="items/:id" element={<ItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
