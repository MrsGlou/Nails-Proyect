import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/API_user/user.service";
import { Link, Navigate } from "react-router-dom";
import { useLoginError } from "../../hooks/useLoginError";
import { useAuth } from "../../contexts/authContext";

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
    console.log(res);
    useLoginError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/platform/validated" />;
    } else {
      return <Navigate to="/platform/dashboard" />;
    }
  }
  return (
    <>
      <div className="form-wrap">
        <h1>Login</h1>
        <p>Welcome Back! Login to your account 💌</p>
        <form onSubmit={handleSubmit(formSubmit)}>
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

            <div className="password_container form-group">
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                password
              </label>
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              {send ? "Cargando ....." : "LOGIN"}
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
