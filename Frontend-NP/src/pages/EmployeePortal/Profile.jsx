import { useEffect, useState } from "react";
import ChangePassword from "../../components/EmployeePortal/ChangePassword";
import FormProfile from "../../components/EmployeePortal/FormProfile";
import { useAuth } from "../../contexts/authContext";
import { getUserByID } from "../../services/API_user/user.service";

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
      <div className="containerDataNoChange">
        <figure className="dataProfile">
          <h4 className="emailUser">Nombre: {userID.name}</h4>
          <h4 className="emailUser">Apellidos: {userID.surname}</h4>
          <h4 className="emailUser">Rol: {userID.rol}</h4>
          <h4 className="emailUser">Email: {userID.email}</h4>
        </figure>
      </div>
      <div className="containerNavProfile">
        <button onClick={() => setChangeRender(false)}>
          Cambiar contraseña
        </button>
        <button onClick={() => setChangeRender(true)}>Editar usuario</button>
      </div>
      <div className="fluidContainerProfile">
        {changeRender ? <FormProfile /> : <ChangePassword />}
      </div>
    </>
  );
};

export default Profile;
