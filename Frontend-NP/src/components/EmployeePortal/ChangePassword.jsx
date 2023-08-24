import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { UseChangePasswordError } from "../../hooks/UseChangePasswordError";
import { changePasswordUser } from "../../services/API_user/user.service";
import "./ChangePassword.css";
import { Input, Button } from "@mui/material";

const ChangePassword = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { handleSubmit, register } = useForm();
  const { setUser } = useAuth();

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;
    if (newPassword === confirmPassword) {
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await changePasswordUser({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    UseChangePasswordError(res, setRes, setUser);
  }, [res]);

  return (
    <>
      <div className="change_password_container">
        <h1>Change your password ♻</h1>
        <p>Please, enter your old and new passwords</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container form-group">
            <Input
              className="input_user"
              type="password"
              id="password"
              name="password"
              placeholder="Old Password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
          </div>
          <div className="newPassword_container form-group">
            <Input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className="confirmPassword_container form-group">
            <Input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              autoComplete="false"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <div className="btn_container">
            <Button
              sx={{
                backgroundColor: "#cd825b",
                ":hover": { backgroundColor: "#f991cc" },
              }}
              className="btn"
              variant="contained"
              type="submit"
              disabled={send}
            >
              CHANGE PASSWORD
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
