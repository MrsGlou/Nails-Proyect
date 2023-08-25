import { useEffect, useState } from "react";
import { getByDay } from "../../services/API_appointments/appointments.service";
import { DateCalendar } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UseGetAppointments } from "../../hooks/UseGetAppointments";
import { Button } from "@mui/material";
import ButtonDeleteAppointment from "../../components/EmployeePortal/ButtonDeleteAppointment";

export const Dashboard = () => {
  const [appointmentsByDay, setAppointmentsByDay] = useState([]);
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const handleChange = async (newTime) => {
    const appointmentDate = newTime.format("YYYY-MM-DD");
    const custonFormData = {
      date: appointmentDate,
    };
    setSend(true);
    const response = await getByDay(custonFormData);
    setAppointmentsByDay(response.data.appointmentsByDay);
    setSend(false);
  };

  useEffect(() => {
    UseGetAppointments(res, setRes);
  }, [res]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          onChange={handleChange}
        />
      </LocalizationProvider>
      <section>
        {appointmentsByDay?.map((appointmentByDay) => (
          <div key={appointmentByDay._id}>
            <h3>
              {appointmentByDay.name} {appointmentByDay.surname}
            </h3>
            <h3>{appointmentByDay.phone}</h3>
            <h3>{appointmentByDay.email}</h3>
            <h3>{appointmentByDay.state}</h3>
            <h3>{appointmentByDay.appointmentStart}</h3>
            <h3>{appointmentByDay.appointmentEnd}</h3>
            <h3>{appointmentByDay.user}</h3>
            <h3>{appointmentByDay.services}</h3>
            <ButtonDeleteAppointment />
          </div>
        ))}
      </section>
    </div>
  );
};
