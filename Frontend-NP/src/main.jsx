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
import Profile from "./pages/EmployeePortal/Profile.jsx";
import { UpdateService } from "./components/EmployeePortal/UpdateService.jsx";
import AddUser from "./pages/EmployeePortal/AddUser.jsx";
import AddServices from "./pages/EmployeePortal/AddServices.jsx";
import { ProtectedCheckChildren } from "./components/ProtectedValidated.jsx";
import { Protected } from "./components/Protected.jsx";
import NotFound from "./pages/NotFound.jsx";

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
            <Route
              path="/platform/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/platform/login" element={<Login />} />
            <Route
              path="/platform/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route
              path="/platform/validated"
              element={
                <ProtectedCheckChildren>
                  <Validated />
                </ProtectedCheckChildren>
              }
            />
            <Route
              path="/platform/services"
              element={
                <Protected>
                  <Services />
                </Protected>
              }
            />
            <Route
              path="/platform/services/update/:id"
              element={
                <Protected>
                  <UpdateService />
                </Protected>
              }
            />
            <Route
              path="/platform/services/newservice"
              element={
                <Protected>
                  <AddServices />
                </Protected>
              }
            />
            <Route
              path="/platform/users"
              element={
                <Protected>
                  <Users />
                </Protected>
              }
            />
            <Route
              path="/platform/users/newuser"
              element={
                <Protected>
                  <AddUser />
                </Protected>
              }
            />
            <Route
              path="/platform/myprofile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
