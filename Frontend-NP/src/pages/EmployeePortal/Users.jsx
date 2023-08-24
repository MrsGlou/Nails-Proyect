import { useEffect, useState } from "react";
import { getUsers } from "../../services/API_user/user.service";
import { UseDeleteUserError } from "../../hooks/UseDeleteUserError";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  return (
    <div className="users_container">
      <NavLink className="create_user_btn" to="/platform/users/newuser">
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
      </NavLink>{" "}
      <section>
        {users?.map((user) => (
          <div className="user_container" key={user._id}>
            <div className="user_text_inside">
              <h4>{user.name}</h4>
              <h4>{user.surname}</h4>
              <h4>{user.email}</h4>
            </div>
            <div className="user_delete_button">
              <DeleteIcon
                sx={{
                  color: "#dc136c",
                  ":hover": { color: "#f991cc" },
                }}
                className="delete_user"
                onClick={() => UseDeleteUserError(user)}
              >
                🗑
              </DeleteIcon>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Users;
