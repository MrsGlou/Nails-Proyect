import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { UseCreateAppointmentError } from "../../hooks/UseCreateAppointmentError";
import { createAppointment } from "../../services/API_appointments/appointments.service";

const IntroduceData = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okCreate, setOkCreate] = useState(false);

 // Gestionamos formulario 
  const formSubmit = async (formData) => {
    const selectedDate = localStorage.getItem("selectedDate");
    const user = localStorage.getItem("employee");
    const appointmentStart =localStorage.getItem("appointmentStart");
    const finalService =localStorage.getItem("selectedServices");
    let service = finalService.split(/,/)
    const custonFormData = {...formData, selectedDate, user, appointmentStart, service}

    setSend(true);
    setRes(await createAppointment(custonFormData));
    setSend(false);
  };

  //Gestionamos respuesta

  useEffect(() => {
    UseCreateAppointmentError(res, setOkCreate, setRes);
  }, [res]);

  if (okCreate) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form_date_client_warp">
      <h2 className="form_client_tittle">Introduce tus datos</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="name_container form_client_group">
          <Input
            className="input_user"
            type="name"
            id="name"
            name="name"
            placeholder="Nombre"
            autoComplete="false"
            {...register("name", { required: true })}
          />
        </div>
        <div className="surname_container form_client_group">
          <Input
            className="input_user"
            type="surname"
            id="surname"
            name="surname"
            placeholder="Apellido"
            autoComplete="false"
            {...register("surname", { required: true })}
          />
        </div>
        <div className="phone_container form_client_group">
          <Input
            className="input_user"
            type="phone"
            id="phone"
            name="phone"
            placeholder="Telefono"
            autoComplete="false"
            {...register("phone", { required: true })}
          />
        </div>
        <div className="email_container form_client_group">
          <Input
            className="input_user"
            type="email"
            id="email"
            name="email"
            placeholder="Correo"
            autoComplete="false"
            {...register("email", { required: true })}
          />
        </div>
        <div className="btn_container">
          <Button
            sx={{
              backgroundColor: "#dc136c",
              ":hover": { backgroundColor: "#f991cc" },
            }}
            variant="contained"
            className="btn"
            type="submit"
            disabled={send}
          >
            {send ? "Cargando ....." : "ENVIAR"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IntroduceData;
