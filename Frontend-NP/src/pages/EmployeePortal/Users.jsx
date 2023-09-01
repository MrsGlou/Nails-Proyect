import { useEffect, useState } from "react";
import { getUsers } from "../../services/API_user/user.service";
import { useAuth } from "../../contexts/authContext";
import { UseDeleteUserError } from "../../hooks/UseDeleteUserError";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Users.css";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    const response = await getUsers();
    setAllUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users_container">
      <NavLink className="create_user_btn" to="/platform/users/newuser">
        {user?.rol === "admin" ||
          (user?.rol === "superAdmin" && (
            <Button
              sx={{
                backgroundColor: "#dc136c",
                ":hover": { backgroundColor: "#f991cc" },
                width: "px",
              }}
              className="btn"
              variant="contained"
            >
              Añadir nuevo empleado
            </Button>
          ))}
      </NavLink>{" "}
      <section>
        <div className="user_names_container">
          <h3>Nombre</h3>
          <h3>Apellido</h3>
          <h3>Rol</h3>
          <h3>Correo</h3>
          <></>
        </div>
        {allUsers?.map((userDB) => (
          <div className="user_container" key={userDB._id}>
            <div className="user_text_inside">
              <h4>{userDB.name}</h4>
              <h4>{userDB.surname}</h4>
              <h4>{userDB.rol}</h4>
              <h4>{userDB.email}</h4>
            </div>
            <div className="user_delete_button">
              {user?.rol === "admin" ||
                (user?.rol === "superAdmin" && (
                  <DeleteIcon
                    sx={{
                      color: "#dc136c",
                      ":hover": { color: "#f991cc" },
                    }}
                    className="delete_user"
                    onClick={() => UseDeleteUserError(userDB, fetchUsers)}
                  >
                    🗑
                  </DeleteIcon>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Users;
