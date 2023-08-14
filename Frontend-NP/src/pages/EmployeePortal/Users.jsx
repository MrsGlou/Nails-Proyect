import { useEffect, useState } from "react";
import { getUsers } from "../../services/API_user/user.service";

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
      {" "}
      {users?.map((user) => (
        <div className="user_container" key={user._id}>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <button className="update_user" onClick={() => useUpdateUser(user)}>
            🖍
          </button>
          <button className="delete_user" onClick={() => useDeleteUser(user)}>
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
