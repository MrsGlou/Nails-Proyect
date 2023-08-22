import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseForgotPassword } from "../../hooks/UseForgotPassword";
import { Link, Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../../services/API_user/user.service";
import { Button, Input } from "@mui/material";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);
  const { handleSubmit, register } = useForm();

  const formSubmit = async (formData) => {
    console.log(formData);
    setSend(true);
    setRes(await forgotPasswordUser(formData));
    setSend(false);
  };

  // Gestionamos errores
  useEffect(() => {
    UseForgotPassword(res, setRes, setForgotOk);
  }, [res]);

  //Reenviamos al login
  if (forgotOk) {
    console.log("envio de la contraseña correcto");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="change_ps_container">
        <div className="change_ps_form_container">
          <h1>Change your password 💱</h1>
          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
          <form className="change_ps_form" onSubmit={handleSubmit(formSubmit)}>
            <div className="email_container form-group">
              <Input
                className="input_user"
                type="text"
                id="email"
                name="email"
                autoComplete="false"
                placeholder="email"
                {...register("email", { required: true })}
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
                type="submit"
                disabled={send}
              >
                Change password
              </Button>
            </div>
            <p className="bottom-text">
              <Link to="/platform/login" className="anchorCustom">
                Go to login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
