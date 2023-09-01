import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
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

      <a href="#services_home_container">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav services"
        >
          SERVICIOS
        </Button>
      </a>
      <a href="#about_us_container">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav aboutUs"
        >
          SOBRE NOSOTROS
        </Button>
      </a>
      <a href="#our_team_container">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav team"
        >
          NUESTRO EQUIPO
        </Button>
      </a>
      <NavLink to="/platform/login">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav bookAppoitnment"
        >
          AREA EMPLEADO
        </Button>
      </NavLink>
      <NavLink to="/serviceselect">
        <Button
          sx={{
            backgroundColor: "#dc136c",
            ":hover": { backgroundColor: "#f991cc" },
          }}
          variant="contained"
          className="btn_nav bookAppoitnment"
        >
          PEDIR CITA
        </Button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
