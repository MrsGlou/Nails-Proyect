import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { getAvailableAppointments } from "../../services/API_appointments/appointments.service";
import { getUserByID } from "../../services/API_user/user.service";
import { UseAvailableAppointmentsError } from "../../hooks/UseAvailableAppointmentsError";
import { deleteDuplicateTimes } from "../../utils/deleteDuplicates";
import "./SelectDate.css";

const SelectDate = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [availables, setAvailables] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [allTimesByUsers, setAllTimesByUsers] = useState(null);
  const [idsAndUsernames, setIdsAndUsernames] = useState(new Map());
  const [userNames, setUserNames] = useState([]);

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
    localStorage.setItem("selectedServices", selectedServices);

    const custonFormData = {
      selectedDate: appointmentDate,
      selectedServices: selectedServices,
    };

    setSend(true);
    const response = await getAvailableAppointments(custonFormData);
    const employeesTimes = response.data;
    setAllTimesByUsers(employeesTimes);

    //employeesTimes.forEach((employee) => {});

    const times = Object.values(response.data);

    const allEmployeesTime = [...times[0], ...times[1]];
    const finalEmployeesTime = deleteDuplicateTimes(allEmployeesTime);
    finalEmployeesTime.sort();

    setAvailables(finalEmployeesTime);
    setSend(false);
  };

  useEffect(() => {
    UseAvailableAppointmentsError(res, setRes);
  }, [res]);

  useEffect(() => {
    // Limpiar el valor del localStorage cuando el componente se monte
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("employee");
    localStorage.removeItem("appointmentStart");
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    const userById = async () => {
      const userIds = identifyUsers();
      const idsAndUsernames = [];
      for (const userId of userIds) {
        setSend(true);
        const response = await getUserByID(userId);
        idsAndUsernames.push({ id: userId, name: response.data.name });

        setSend(false);
      }
      setUserNames(idsAndUsernames.map((idAndUserName) => idAndUserName.name));
      setIdsAndUsernames(idsAndUsernames);
    };
    if (selectedTime && allTimesByUsers) {
      userById();
    }
  }, [selectedTime, allTimesByUsers, initialRender]);

  const handleTimeSelected = (time) => {
    localStorage.setItem("appointmentStart", time);
    setSelectedTime(time);
  };

  const identifyUsers = () => {
    let userIds = [];

    for (const [key, values] of Object.entries(allTimesByUsers)) {
      if (values.includes(selectedTime)) {
        userIds.push(key);
      }
    }

    return userIds;
  };

  const handleUserSelect = (userName) => {
    const userandIds = idsAndUsernames.find((id) => id.name === userName);

    if (userandIds) {
      localStorage.setItem("employee", userandIds.id);
    }
  };

  return (
    <div className="appointment_selected_date_container">
      <h2 className="appointment_tittle">Selecciona día</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          onChange={handleChange}
        />
      </LocalizationProvider>
      {availables.length > 0 ? (
        <h2 className="appointment_tittle">Selecciona la hora de la cita</h2>
      ) : (
        ""
      )}
      <Box
        className="hour_appointment_container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="text"
          size="large"
          color="secondary"
          sx={{
            display: "flex",
            flexDirection: "wrap",
            flexWrap: "wrap",
          }}
        >
          {availables?.map((time, index) => (
            <Button
              sx={{
                ":hover": { backgroundColor: "#f991cc" },
              }}
              onClick={() => handleTimeSelected(time)}
              key={index}
            >
              {time}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {userNames.length > 0 ? (
        <h2 className="appointment_tittle">Selecciona una empleada</h2>
      ) : (
        ""
      )}
      <Box
        className="user_appointment_container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          variant="text"
          size="large"
          color="secondary"
          sx={{
            display: "flex",
            flexDirection: "wrap",
            flexWrap: "wrap",
          }}
        >
          {userNames?.map((userName, index) => (
            <Button
              sx={{
                ":hover": { backgroundColor: "#f991cc" },
              }}
              onClick={() => handleUserSelect(userName)}
              key={index}
            >
              {userName}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default SelectDate;
