import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { UseCreateServiceError } from "../../hooks/useCreateServiceError";
import { createService } from "../../services/API_services/service.service";
import { Button, Input, Select, MenuItem } from "@mui/material";
import "./AddService.css";

const AddServices = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okCreate, setOkCreate] = useState(false);
  const { bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();

  //Gestionamos el formulario
  const formSubmit = async (formData) => {
    const custonFormData = {
      ...formData,
    };
    setSend(true);
    setRes(await createService(custonFormData));
    setSend(false);
  };

  useEffect(() => {
    UseCreateServiceError(res, setOkCreate, setRes);
    if (res?.status == 200) bridgeData("ALLSERVICES");
  }, [res]);

  if (okCreate) {
    return <Navigate to="/platform/services" />;
  }
  return (
    <>
      <div className="create_services_container">
        <div className="create_services_form_container">
          <h1>Create Service</h1>
          <p>Please, enter the data</p>
          <form
            className="create_service_form"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="name_container form_group">
              <Input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("name", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Name
              </label>
            </div>
            <div className="time_container form_group">
              <Input
                className="input_user"
                type="text"
                id="time"
                name="time"
                autoComplete="false"
                {...register("time", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Time
              </label>
            </div>
            <div className="price_container form_group">
              <Input
                className="input_user"
                type="text"
                id="price"
                name="price"
                autoComplete="false"
                {...register("price", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Price
              </label>
            </div>

            <div className="type_container form_group">
              <Select
                className="input_type_service"
                type="select"
                id="demo-simple-select"
                name="type"
                label="Type"
                {...register("type", { required: true })}
              >
                <MenuItem value="Manicuras">Manicuras</MenuItem>
                <MenuItem value="Uñas Acrilicas y Gel Esculpidas">
                  Uñas Acrilicas y Gel Esculpidas
                </MenuItem>
                <MenuItem value="Pedicuras">Pedicuras</MenuItem>
                <MenuItem value="Pestañas">Pestañas</MenuItem>
              </Select>
              <label htmlFor="custom-input" className="custom-placeholder">
                Type
              </label>
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
                CREATE SERVICE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddServices;
