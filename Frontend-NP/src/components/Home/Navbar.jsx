import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/">
        <button>
          {" "}
          <img
            className="nav_image"
            src="https://i.pinimg.com/originals/4d/31/c3/4d31c351519c7dc518aac9b5d587d2d7.jpg"
            alt="logo moon manicure"
          />
        </button>
      </NavLink>

      <NavLink to="/">
        <button className="btn_nav services">SERVICIOS</button>
      </NavLink>
      <NavLink to="/">
        <button className="btn_nav aboutUs">SOBRE NOSOTROS</button>
      </NavLink>
      <NavLink to="/">
        <button className="btn_nav team">NUESTRO EQUIPO</button>
      </NavLink>
      <NavLink to="/platform/login">
        <button className="btn_nav bookAppoitnment">AREA EMPLEADO</button>
      </NavLink>
      <NavLink to="/serviceselect">
        <button className="btn_nav bookAppoitnment">PEDIR CITA</button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
