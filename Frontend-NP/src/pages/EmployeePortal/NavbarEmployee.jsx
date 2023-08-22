import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const NavbarEmployee = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <NavLink to="/platform">
        {" "}
        <HomeIcon
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
            fontSize: "40px",
          }}
          className="iconNav home"
        />
      </NavLink>

      <NavLink to="/platform/services">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav_employee services"
        >
          SERVICIOS
        </Button>
      </NavLink>
      <NavLink to="/platform/users">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav_employee users"
        >
          USUARIOS
        </Button>
      </NavLink>
      <NavLink to="/">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav_employee bookAppoitnment"
        >
          NUEVA CITA
        </Button>
      </NavLink>
      <NavLink to="/platform/myprofile">
        <Button
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
          }}
          variant="outlined"
          className="btn_nav_employee profile"
        >
          MI PERFIL
        </Button>
      </NavLink>
      {user !== null && (
        <LogoutIcon
          sx={{
            color: "#dc136c",
            ":hover": { color: "#f991cc", borderColor: "#f991cc" },
            borderColor: "#dc136c",
            fontSize: "35px",
          }}
          alt=""
          className="iconNav iconLogout"
          onClick={() => logout()}
        />
      )}
    </nav>
  );
};

export default NavbarEmployee;
