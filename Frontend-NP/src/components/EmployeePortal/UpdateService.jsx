import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Navigate, useParams } from "react-router-dom";
import { UseUpdateServiceError } from "../../hooks/useUpdateServiceError";
import { updateService } from "../../services/API_services/service.service.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
      <div className="containerProfile">
        <div className="form-wrap formProfile">
          <h1>Change the service</h1>
          <p>Please, enter the new data</p>
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
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                CHANGE DATA PROFILE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
