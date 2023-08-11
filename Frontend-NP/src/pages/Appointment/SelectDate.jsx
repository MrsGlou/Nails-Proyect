import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions, localeEs } from "@mobiscroll/react";
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

  setOptions({
    locale: localeEs,
    theme: "ios",
    themeVariant: "light",
  });

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          onChange={handleChange}
        />
      </LocalizationProvider>
      <Datepicker
        controls={["timegrid"]}
        display="inline"
        background-color="none"
      />
    </div>
  );
};

export default SelectDate;
