import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SelectService from "./pages/Appointment/SelectService.jsx";
import SelectDate from "./pages/Appointment/SelectDate.jsx";
import MyAppointment from "./pages/Appointment/MyAppointment.jsx";
import IntroduceData from "./pages/Appointment/IntroduceData.jsx";
import VerifyAppointment from "./pages/Appointment/VerifyAppointment.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/serviceselect" element={<SelectService />} />
          <Route path="/servicehour" element={<SelectDate />} />
          <Route path="/clientnew" element={<IntroduceData />} />
          <Route path="/myappointments" element={<MyAppointment />} />
          <Route
            path="/verifyappointment/:id"
            element={<VerifyAppointment />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
