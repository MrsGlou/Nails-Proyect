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

  useEffect(() => {
    const date = new Date(Date.now());
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth()+1).toString().padStart(2, "0")
    const year = date.getFullYear()
    const today = `${year}-${month}-${day}`
    const custonFormData = {
      date: today,
    };
    
    const appointmentsToday = async()=> {
      setSend(true);
      const response = await getByDay(custonFormData);
      setAppointmentsByDay(response.data)
      setSend(false);
    }
    appointmentsToday();
  }, [])

  const handleChange = async (newTime) => {
    const appointmentDate = newTime.format("YYYY-MM-DD");
    const custonFormData = {
      date: appointmentDate,
    };
    setSend(true);
    const response = await getByDay(custonFormData);
    //console.log(response.data.appointmentsByDay)
    setAppointmentsByDay(response.data);
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
        {appointmentsByDay.length > 0 ? appointmentsByDay?.map((appointmentByDay) => (
          <div key={appointmentByDay._id}>
            <h3>
              {appointmentByDay.name} {appointmentByDay.surname}
            </h3>
            <h3>{appointmentByDay.phone}</h3>
            <h3>{appointmentByDay.email}</h3>
            <h3>{appointmentByDay.state}</h3>
            <h3>{appointmentByDay.appointmentStart}</h3>
            <h3>{appointmentByDay.appointmentEnd}</h3>
            <h3>{appointmentByDay.user.name}</h3>
            <div>{appointmentByDay.service?.map((service) =>(
              <div key={service._id}> <h4>{service.name}</h4></div>
            ))}</div>
            <ButtonDeleteAppointment />
          </div>
        )) : "No hay citas para este día"}
      </section>
    </div>
  );
};
