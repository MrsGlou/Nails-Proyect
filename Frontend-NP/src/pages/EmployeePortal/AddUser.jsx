import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/API_user/user.service";
import { UseCreateUserError } from "../../hooks/UseCreateUserError";
import { Navigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import "./AddUser.css";

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
      <div className="create_user_container">
        <div className="create_user_form_container">
          <h1>Crear Cuenta</h1>
          <p>Please, enter the data</p>
          <form
            className="create_user_form"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="name_container form-group">
              <Input
                className="input_user"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autoComplete="false"
                {...register("name", { required: true })}
              />
            </div>
            <div className="password_container form-group">
              <Input
                className="input_user"
                type="surname"
                id="surname"
                name="surname"
                placeholder="Surname"
                autoComplete="false"
                {...register("surname", { required: true })}
              />
            </div>

            <div className="email_container form-group">
              <Input
                className="input_user"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autoComplete="false"
                {...register("email", { required: true })}
              />
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
                Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
