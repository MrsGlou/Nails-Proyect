import { useEffect, useState } from "react";
import { getByDay } from "../../services/API_appointments/appointments.service";
import { DateCalendar } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UseGetAppointments } from "../../hooks/UseGetAppointments";

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
    setRes(await getByDay(custonFormData));
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
    </div>
  );
};
