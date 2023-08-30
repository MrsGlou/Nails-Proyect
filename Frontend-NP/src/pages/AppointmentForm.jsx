import { useState } from "react";
import SelectDate from "./Appointment/SelectDate";
import SelectService from "./Appointment/SelectService";
import IntroduceData from "./Appointment/IntroduceData";
import { Button } from "@mui/material";
import "./AppoitnmentForm.css";

const AppointmentForm = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const handleSiguientePaso = () => {
    if (pasoActual < 3) {
      setPasoActual(pasoActual + 1);
    }
  };
  const handlePasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };
  return (
    <div className="appointment_form">
      <div className="Appointment progress_bar">
        <ul className="progressbar">
          <li className={pasoActual === 1 ? "active" : ""}></li>
          <li className={pasoActual === 2 ? "active" : ""}></li>
          <li className={pasoActual === 3 ? "active" : ""}></li>
        </ul>
      </div>
      {pasoActual === 1 && <SelectService />}
      {pasoActual === 2 && <SelectDate />}
      {pasoActual === 3 && <IntroduceData />}
      <div className="btn_form_data_container">
        {pasoActual > 1 && (
          <Button 
          sx={{
            backgroundColor: "#dc136c",
            ":hover": { backgroundColor: "#f991cc" },
          }}
          className="btn_form"
          variant="contained"
          type="form_button" onClick={handlePasoAnterior}>
            Anterior
          </Button>
        )}
        {pasoActual < 3 && (
          <Button        sx={{
            backgroundColor: "#dc136c",
            ":hover": { backgroundColor: "#f991cc" },
          }}
          className="btn_form"
          variant="contained" type="form_button" onClick={handleSiguientePaso}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
