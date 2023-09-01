import { useEffect, useState } from "react";
import { getByDay } from "../../services/API_appointments/appointments.service";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UseGetAppointmentsError } from "../../hooks/UseGetAppointmentsError";
import DeleteIcon from "@mui/icons-material/Delete";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import "./Dashboard.css";
import { UseDeleteAppointmentError } from "../../hooks/UseDeleteAppointmentError";
import { UseClosedAppointmentError } from "../../hooks/UseClosedAppointmentError";

export const Dashboard = () => {
  const [appointmentsByDay, setAppointmentsByDay] = useState([]);
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const appointmentsToday = async (custonFormData) => {
    setSend(true);
    const response = await getByDay(custonFormData);
    setAppointmentsByDay(response.data);
    setSend(false);
  };

  useEffect(() => {
    const date = new Date(Date.now());
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    const custonFormData = {
      date: today,
    };

    appointmentsToday(custonFormData);
  }, []);

  useEffect(() => {
    UseGetAppointmentsError(res, setRes);
  }, [res]);

  const handleChange = async (newTime) => {
    const appointmentDate = newTime.format("YYYY-MM-DD");
    const custonFormData = {
      date: appointmentDate,
    };
    setSend(true);
    const response = await getByDay(custonFormData);

    setAppointmentsByDay(response.data);
    setSend(false);
  };

  const handleClosed = async (appointmentByDay) => {
    setSend(true);
    UseClosedAppointmentError(appointmentByDay);
    setSend(false);
  };

  const handleDelete = async (appointmentByDay) => {
    setSend(true);
    UseDeleteAppointmentError(appointmentByDay);
    setSend(false);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          onChange={handleChange}
        />
      </LocalizationProvider>
      <section className="appointmet_by_day_container">
        <div className="appointmet_by_day_names_container">
          <h3>Nombre</h3>
          <h3>Telefono</h3>
          <h3>Correo</h3>
          <h3>Estado</h3>
          <h3>Horario</h3>
          <h3>Empleada</h3>
          <h3>Servicios</h3>
          <h3>Cerrar</h3>
        </div>
        <div className="appointmet_by_day">
          {appointmentsByDay.length > 0
            ? appointmentsByDay?.map((appointmentByDay) => (
                <div className="appointment" key={appointmentByDay._id}>
                  <h4>
                    {appointmentByDay.name} {appointmentByDay.surname}
                  </h4>
                  <h4>{appointmentByDay.phone}</h4>
                  <h4>{appointmentByDay.email}</h4>
                  <h4>{appointmentByDay.state}</h4>
                  <h4>
                    {appointmentByDay.appointmentStart} -
                    {appointmentByDay.appointmentEnd}
                  </h4>

                  <h4>{appointmentByDay.user.name}</h4>
                  <div className="appointment_services">
                    {appointmentByDay.service?.map((service) => (
                      <div key={service._id}>
                        {" "}
                        <h4>{service.name}</h4>
                      </div>
                    ))}
                  </div>
                  <PriceCheckIcon
                    sx={{
                      color: "#dc136c",
                      ":hover": { color: "#f991cc" },
                    }}
                    className="delete_service"
                    onClick={() => handleClosed(appointmentByDay)}
                  />
                  <DeleteIcon
                    sx={{
                      color: "#dc136c",
                      ":hover": { color: "#f991cc" },
                    }}
                    className="delete_service"
                    onClick={() => handleDelete(appointmentByDay)}
                  />
                </div>
              ))
            : "No hay citas para este día"}
        </div>
      </section>
    </div>
  );
};
