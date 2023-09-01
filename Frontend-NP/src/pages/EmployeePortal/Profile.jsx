import { useEffect, useState } from "react";
import ChangePassword from "../../components/EmployeePortal/ChangePassword";
import FormProfile from "../../components/EmployeePortal/FormProfile";
import { useAuth } from "../../contexts/authContext";
import { getUserByID } from "../../services/API_user/user.service";
import { Button } from "@mui/material";
import "./Profile.css";

const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { user } = useAuth();
  const [userID, setUserID] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getUserByID(user._id);
      setUserID(response.data);
    };
    fetchServices();
  }, []);

  return (
    <>
      <div className="profile_container">
        <div className="profile_data_container">
          <h1>Datos Personales</h1>
          <div className="user_data_container">
            <figure className="dataProfile">
              <div className="data_profile">
                <h4 className="Name">Nombre:</h4>
                <h3> {userID.name}</h3>
              </div>
              <div className="data_profile">
                <h4 className="Surname">Apellidos: </h4>
                <h3> {userID.surname}</h3>
              </div>
              <div className="data_profile">
                <h4 className="Rol">Rol: </h4>
                <h3> {userID.rol}</h3>
              </div>
              <div className="data_profile">
                <h4 className="Email">Email:</h4>
                <h3> {userID.email}</h3>
              </div>
            </figure>
          </div>
          <div className="user_data_change_container">
            <Button
              sx={{
                backgroundColor: "#dc136c",
                ":hover": { backgroundColor: "#f991cc" },
              }}
              className="btn"
              variant="contained"
              onClick={() => setChangeRender(false)}
            >
              Cambiar contraseña
            </Button>
            <Button
              sx={{
                backgroundColor: "#dc136c",
                ":hover": { backgroundColor: "#f991cc" },
              }}
              className="btn"
              variant="contained"
              onClick={() => setChangeRender(true)}
            >
              Editar usuario
            </Button>
          </div>
        </div>
        <div className="fluidContainerProfile">
          {changeRender ? <FormProfile /> : <ChangePassword />}
        </div>
      </div>
    </>
  );
};

export default Profile;
