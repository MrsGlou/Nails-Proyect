import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Navigate, useParams } from "react-router-dom";
import { UseUpdateServiceError } from "../../hooks/useUpdateServiceError";
import { updateService } from "../../services/API_services/service.service.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, MenuItem, InputLabel } from "@mui/material";
import "./UpdateServices.css";

export const UpdateService = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okUpdate, setOkUpdate] = useState(false);
  const { register, handleSubmit } = useForm();

  //Formulario
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change the service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let customFormData;

        customFormData = { ...formData, id };
        setSend(true);
        setRes(await updateService(customFormData));
        setSend(false);
      }
    });
  };

  useEffect(() => {
    UseUpdateServiceError(res, setRes, setOkUpdate);
  }, [res]);

  if (okUpdate) {
    return <Navigate to="/platform/services" />;
  }

  return (
    <>
      <div className="update_services_container">
        <div className="update_services_form_container">
          <h1>Change the service</h1>
          <p>Please, enter the new data</p>
          <form
            className="update_service_form"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="name_container form_group">
              <Input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="time_container form_group">
              <Input
                className="input_user"
                type="text"
                id="time"
                name="time"
                placeholder="Time"
                autoComplete="false"
                {...register("time", { required: true })}
              />
            </div>
            <div className="price_container form_group">
              <Input
                className="input_user"
                type="text"
                id="price"
                name="price"
                placeholder="Price"
                autoComplete="false"
                {...register("price", { required: true })}
              />
            </div>

            <div className="type_container form_group">
              <InputLabel id="demo-simple-select-label">Time</InputLabel>
              <Select
                className="input_type_service"
                type="select"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="type"
                label="Type"
                placeholder="Type"
                {...register("type", { required: true })}
              >
                <MenuItem value="Manicuras">Manicuras</MenuItem>
                <MenuItem value="Uñas Acrilicas y Gel Esculpidas">
                  Uñas Acrilicas y Gel Esculpidas
                </MenuItem>
                <MenuItem value="Pedicuras">Pedicuras</MenuItem>
                <MenuItem value="Pestañas">Pestañas</MenuItem>
              </Select>
            </div>
            <div className="btn_container">
              <Button
                sx={{
                  backgroundColor: "#dc136c",
                  ":hover": { backgroundColor: "#f991cc" },
                  width: "px",
                }}
                className="btn"
                variant="contained"
                type="submit"
                disabled={send}
              >
                CHANGE DATA PROFILE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
