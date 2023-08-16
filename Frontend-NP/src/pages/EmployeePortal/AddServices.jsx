import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { UseCreateServiceError } from "../../hooks/useCreateServiceError";
import { createService } from "../../services/API_services/service.service";

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
      <div className="form-wrap">
        <h1>Crear Servicio</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              name
            </label>
          </div>
          <div className="password_container form-group">
            <input
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
          <div className="password_container form-group">
            <input
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

          <div className="email_container form-group">
            <select
              className="input_user"
              type="select"
              id="type"
              name="type"
              autoComplete="false"
              {...register("type", { required: true })}
            >
              <option value="Manicuras">Manicuras</option>
              <option value="Uñas Acrilicas y Gel Esculpidas">
                Uñas Acrilicas y Gel Esculpidas
              </option>
              <option value="Pedicuras">Pedicuras</option>
              <option value="Pestañas">Pestañas</option>
            </select>
            <label htmlFor="custom-input" className="custom-placeholder">
              Type
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Create Service
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddServices;
