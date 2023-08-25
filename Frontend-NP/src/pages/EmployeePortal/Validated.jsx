import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validatedCodeUser } from "../../services/API_user/user.service";
import { UseValidatedError } from "../../hooks/UseValidatedError";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import ButtonResend from "../../components/EmployeePortal/ButtonResend";
import { Button, Input } from "@mui/material";
import "./Validated.css";

const Validated = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [validatedOk, setValidatedOk] = useState(false);
  const [reloadPageError, setReloadPageError] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const { allUser, setUser, user } = useAuth();
  const { handleSubmit, register } = useForm();

  //Gestion formulario
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user");
    if (userLocal == null) {
      //Usuario usuario que viene del login
      const customFormData = {
        email: allUser.data.user.email,
        confirmationCode: parseInt(formData.confirmationCode),
      };

      // llamada al servicio
      setSend(true);
      setRes(await validatedCodeUser(customFormData));
      setSend(false);
    } else {
      // ------> este usuario viene del login porque existe en el local storage
      const customFormData = {
        email: user.email,
        confirmationCode: parseInt(formData.confirmationCode),
      };

      setSend(true);
      setRes(await validatedCodeUser(customFormData));
      setSend(false);
    }
  };

  useEffect(() => {
    UseValidatedError(
      res,
      setDeleteUser,
      setValidatedOk,
      setUser,
      setReloadPageError,
      setRes
    );
  }, [res]);

  //Estados de navegación
  if (validatedOk) {
    console.log("entro");
    if (!localStorage.getItem("user")) {
      console.log("entro if");
      setValidatedOk(() => false);
      //useAutoLogin(allUser, userLogin, setOkCheck);
    } else {
      console.log("entro else");
      return <Navigate to="/platform" />;
    }
  }

  if (deleteUser) {
    return <Navigate to="/platform/login" />;
  }

  if (reloadPageError) {
    return <Navigate to="/platform/login" />;
  }

  return (
    <>
      <div className="validated_container">
        <div className="validated_form_container">
          <h1>Verify your code </h1>
          <p>Write the code sent to your email</p>
          <form className="validated_form" onSubmit={handleSubmit(formSubmit)}>
            <div className="code_container form-group">
              <Input
                className="input_user"
                type="text"
                id="name"
                name="name"
                placeholder="Registration code"
                autoComplete="false"
                {...register("confirmationCode", { required: false })}
              />
            </div>
            <div className="btn_container">
              <Button
                sx={{
                  backgroundColor: "#dc136c",
                  ":hover": { backgroundColor: "#f991cc" },
                }}
                className="btn"
                variant="contained"
                id="btnCheck"
                type="submit"
                disabled={send}
              >
                Verify Code
              </Button>
            </div>
          </form>
          <div className="btn_container">
            <ButtonResend setReloadPageError={setReloadPageError} />
          </div>
          <p className="bottom_validated_text">
            <small>
              If the code is not correct ❌, your user will be deleted from the
              database.{" "}
            </small>
          </p>
        </div>
      </div>
    </>
  );
};

export default Validated;
