import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";

import "./SelectDate.css";

const SelectDate = () => {
  const handleChange = (newValue) => {
    // Formatear la fecha seleccionada como una cadena en el formato deseado
    const appointmentDate = newValue.format("YYYY-MM-DD");
    // Guardar la fecha en el localStorage con una clave "selectedDate"
    localStorage.setItem("selectedDate", appointmentDate);
  };

  useEffect(() => {
    // Limpiar el valor del localStorage cuando el componente se monte
    localStorage.removeItem("selectedDate");
  }, []);

  return (
    <div>
      <h2 className="appointment_tittle">Selecciona día</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          onChange={handleChange}
        />
      </LocalizationProvider>
      <h2 className="appointment_tittle">Selecciona la hora de la cita</h2>
    </div>
  );
};

export default SelectDate;
