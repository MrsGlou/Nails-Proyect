import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";

import "./SelectDate.css";
import { getAvailableAppointments } from "../../services/API_appointments/appointments.service";
import { UseAvailableAppointmentsError } from "../../hooks/UseAvailableAppointmentsError";
import { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { deleteDuplicateTimes } from "../../utils/deleteDuplicates";

const SelectDate = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [availables, setAvailables] = useState([]);

  const handleChange = async (newValue) => {
    // Formatear la fecha seleccionada como una cadena en el formato deseado
    const appointmentDate = newValue.format("YYYY-MM-DD");
    const manicura = localStorage.getItem("Manicura");
    const pedicura = localStorage.getItem("Pedicura");
    const pestanas = localStorage.getItem("Pestaña");
    const gel = localStorage.getItem("Gel");

    const selectedServices = [manicura, pedicura, pestanas, gel].filter(
      (service) => service !== null
    );

    // Guardar la fecha en el localStorage con una clave "selectedDate" y unimos lo servicios solicitados
    localStorage.setItem("selectedDate", appointmentDate);
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));

    const custonFormData = {
      selectedDate: appointmentDate,
      selectedServices: selectedServices,
    };

    setSend(true);
    const response = await getAvailableAppointments(custonFormData);
    const employeesTimes = response.data;
    console.log(employeesTimes);

    //employeesTimes.forEach((employee) => {});

    /*const times = Object.values(response.data);
    const allEmployeesTime = [...times[0], ...times[1]];

    setAvailables(deleteDuplicateTimes(allEmployeesTime));
    console.log(deleteDuplicateTimes(allEmployeesTime));*/
    setSend(false);
  };

  useEffect(() => {
    UseAvailableAppointmentsError(res, setRes);
  }, [res]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="contained">
          {availables?.map((time, index) => (
            <Button key={index}>{time}</Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default SelectDate;
