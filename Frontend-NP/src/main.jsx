import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import VerifyAppointment from "./pages/Appointment/VerifyAppointment.jsx";
import AppointmentForm from "./pages/AppointmentForm.jsx";
import Login from "./pages/EmployeePortal/Login.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import ForgotPassword from "./pages/EmployeePortal/ForgotPassword.jsx";
import { Dashboard } from "./pages/EmployeePortal/Dashboard.jsx";
import Validated from "./pages/EmployeePortal/Validated.jsx";
import Services from "./pages/EmployeePortal/Services.jsx";
import Users from "./pages/EmployeePortal/Users.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/serviceselect" element={<AppointmentForm />} />
            <Route
              path="/verifyappointment/:id"
              element={<VerifyAppointment />}
            />
            <Route path="/platform/" element={<Dashboard />} />
            <Route path="/platform/login" element={<Login />} />
            <Route
              path="/platform/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route path="/platform/validated" element={<Validated />} />
            <Route path="/platform/services" element={<Services />} />
            <Route path="/platform/users" element={<Users />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
