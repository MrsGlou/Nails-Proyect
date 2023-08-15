import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import { updateUser } from "../../services/API_user/user.service";
import { useUpdateUserError } from "../../hooks/useUpdateUserError";

const FormProfile = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();

  //Formulario
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let customFormData;

        customFormData = { ...formData };
        setSend(true);
        setRes(await updateUser(customFormData));
        setSend(false);
      }
    });
  };

  useEffect(() => {
    useUpdateUserError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="containerProfile">
        <div className="form-wrap formProfile">
          <h1>Change your data profile ♻</h1>
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("name")}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Nombre
              </label>
            </div>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="surname"
                name="surname"
                autoComplete="false"
                {...register("surname")}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Apellidos
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

export default FormProfile;
