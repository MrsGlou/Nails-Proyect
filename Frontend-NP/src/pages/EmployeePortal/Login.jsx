import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/API_user/user.service";
import { Link, Navigate } from "react-router-dom";
import { UseLoginError } from "../../hooks/UseLoginError";
import { useAuth } from "../../contexts/authContext";
import "./Login.css";
import { Button, Input } from "@mui/material";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { userLogin, setUser } = useAuth();

  //Gestionamos errores

  useEffect(() => {
    setUser(() => null);
  }, []);

  useEffect(() => {
    UseLoginError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  if (loginOk) {
    if (res.data.user.validated == false) {
      return <Navigate to="/platform/validated" />;
    } else {
      return <Navigate to="/platform" />;
    }
  }
  return (
    <>
      <div className="login_container">
        <div className="login_form_container">
          <h1>Login</h1>
          <p>Welcome Back! Login to your account 💌</p>
          <form className="login_form" onSubmit={handleSubmit(formSubmit)}>
            <div className="email_container form-group">
              <Input
                className="input_user"
                type="email"
                id="email"
                name="email"
                autoComplete="false"
                placeholder="email"
                {...register("email", { required: true })}
              />

              <div className="password_container form-group">
                <Input
                  className="input_user"
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="false"
                  placeholder="password"
                  {...register("password", { required: true })}
                />
              </div>
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
                {send ? "Cargando ....." : "LOGIN"}
              </Button>
            </div>
            <p className="bottom-text">
              <small>
                Have you forgotten the password?{" "}
                <Link to="/platform/forgotpassword" className="anchorCustom">
                  Change password
                </Link>
              </small>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
