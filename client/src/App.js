import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/landingPage";
import Login from "./components/user/login";
import Dashboard from "./components/dashboard";
import Signup from "./components/user/signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
