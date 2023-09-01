import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/API_user/user.service";
import { UseUpdateUserError } from "../../hooks/UseUpdateUserError";
import { Input, Button } from "@mui/material";
import "./FormProfile.css";
import { useAuth } from "../../contexts/authContext";

const FormProfile = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();

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
    UseUpdateUserError(res, setRes);
  }, [res]);

  return (
    <>
      <div className="edit_profile_container">
        <h1>Change your data profile ♻</h1>
        <p>Please, enter your new data profile</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container_form form-group">
            <Input
              className="input_user"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="false"
              value={user.user}
              {...register("name")}
            />
          </div>
          <div className="user_container_form form-group">
            <Input
              className="input_user"
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              autoComplete="false"
              value={user.surname}
              {...register("surname")}
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
              CHANGE DATA PROFILE
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProfile;
