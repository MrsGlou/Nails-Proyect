import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { UseDeleteServiceError } from "../../hooks/UseDeleteServiceError";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const { user } = useAuth();

  const fetchServices = async () => {
    const response = await getServices();
    setServices(response.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (serviceToDelete) => {
    UseDeleteServiceError(serviceToDelete, fetchServices);
  };

  return (
    <div className="services_container">
      <NavLink
        className="create_service_btn"
        to="/platform/services/newservice"
      >
        {user?.rol === "admin" ||
          (user?.rol === "superAdmin" && (
            <Button
              sx={{
                backgroundColor: "#dc136c",
                ":hover": { backgroundColor: "#f991cc" },
              }}
              variant="contained"
            >
              Añadir servicio
            </Button>
          ))}
      </NavLink>{" "}
      <section>
        <div className="service_type_names">
          <h2>Nombre</h2>
          <h2>Tipo</h2>
          <h2>Precio</h2>
          <h2>Tiempo</h2>
        </div>
        {services?.map((service) => (
          <div className="service_type" key={service._id}>
            <div className="service_type_text_inside">
              <h4>{service.name}</h4>
              <h4>{service.type}</h4>
              <h4>{service.price} €</h4>
              <h4>{service.time} minutes</h4>
            </div>
            {user?.rol === "admin" ||
              (user?.rol === "superAdmin" && (
                <div className="service_type_button">
                  {" "}
                  <Link to={`/platform/services/update/${service._id}`}>
                    <EditIcon
                      sx={{
                        color: "#dc136c",
                        ":hover": { color: "#f991cc" },
                      }}
                      className="update_service"
                    />
                  </Link>
                  <DeleteIcon
                    sx={{
                      color: "#dc136c",
                      ":hover": { color: "#f991cc" },
                    }}
                    className="delete_service"
                    onClick={() => handleSubmit(service)}
                  />
                </div>
              ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
