import { useEffect, useState } from "react";
import { getUsers } from "../../services/API_user/user.service";
import { UseDeleteUserError } from "../../hooks/UseDeleteUserError";
import { NavLink } from "react-router-dom";

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
    <div>
      <NavLink to="/platform/users/newuser">
        <button className="btn_nav_employee users">
          Añadir nuevo empleado
        </button>
      </NavLink>{" "}
      {users?.map((user) => (
        <div className="user_container" key={user._id}>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <button
            className="delete_user"
            onClick={() => UseDeleteUserError(user)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
