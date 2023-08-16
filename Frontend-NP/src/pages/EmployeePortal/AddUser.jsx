import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/API_user/user.service";
import { UseCreateUserError } from "../../hooks/UseCreateUserError";
import { Navigate } from "react-router-dom";

const AddUser = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okCreate, setOkCreate] = useState(false);
  const { setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();

  //Gestionamos el formulario
  const formSubmit = async (formData) => {
    const custonFormData = {
      ...formData,
    };
    setSend(true);
    setRes(await createUser(custonFormData));
    setSend(false);
  };

  useEffect(() => {
    UseCreateUserError(res, setOkCreate, setRes, setAllUser);
    if (res?.status == 200) bridgeData("ALLUSER");
  }, [res]);

  if (okCreate) {
    console.log("res", res);
    return <Navigate to="/platform/users" />;
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Crear Cuenta</h1>
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
              type="surname"
              id="surname"
              name="surname"
              autoComplete="false"
              {...register("surname", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              surname
            </label>
          </div>

          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
