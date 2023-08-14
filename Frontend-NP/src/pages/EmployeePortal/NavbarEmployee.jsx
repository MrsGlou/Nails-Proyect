import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const NavbarEmployee = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <NavLink to="/platform">
        {" "}
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685705455/home_circle_outline_icon_139029_xdnnt2.png"
          alt=""
          className="iconNav home"
        />
      </NavLink>

      <NavLink to="/platform/services">
        <button className="btn_nav_employee services">SERVICIOS</button>
      </NavLink>
      <NavLink to="/platform/users">
        <button className="btn_nav_employee users">USUARIOS</button>
      </NavLink>
      <NavLink to="/">
        <button className="btn_nav_employee bookAppoitnment">NUEVA CITA</button>
      </NavLink>
      <NavLink to="/platform/myprofile">
        <button className="btn_nav_employee profile">MI PERFIL</button>
      </NavLink>
      {user !== null && (
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685706203/9e3c325bca17c2147d249237c5a0906b_qhqifa.png"
          alt=""
          className="iconNav iconLogout"
          onClick={() => logout()}
        />
      )}
    </nav>
  );
};

export default NavbarEmployee;
