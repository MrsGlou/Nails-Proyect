import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UseForgotPassword } from "../../hooks/UseForgotPassword";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../../services/API_user/user.service";

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
      <div className="form-wrap">
        <h1>Change your password 💱</h1>
        <p className="bottom-text">
          <small>Enter your email to send you the new password 💌</small>
        </p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Change password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ForgotPassword;
