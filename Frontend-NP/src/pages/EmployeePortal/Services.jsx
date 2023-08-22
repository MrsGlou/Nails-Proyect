import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import { Link, NavLink } from "react-router-dom";
import { UseDeleteServiceError } from "../../hooks/UseDeleteServiceError";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response.data);
    };
    fetchServices();
  }, []);

  const handleSubmit = async (serviceToDelete) => {
    UseDeleteServiceError(serviceToDelete);
    services.splice(services.indexOf(serviceToDelete), 1);
    setServices(services);
  };

  return (
    <div className="services_container">
      <NavLink
        className="create_service_btn"
        to="/platform/services/newservice"
      >
        <Button
          sx={{
            backgroundColor: "#dc136c",
            ":hover": { backgroundColor: "#f991cc" },
          }}
          variant="contained"
        >
          Añadir servicio
        </Button>
      </NavLink>{" "}
      <section>
        {services?.map((service) => (
          <div className="service_type" key={service._id}>
            <div className="service_type_text_inside">
              <h4>{service.name}</h4>
              <h4>{service.price} €</h4>
              <h4>{service.time} minutes</h4>
            </div>
            <div>
              {" "}
              <Link to={`/platform/services/update/${service._id}`}>
                <EditIcon className="update_service" />
              </Link>
              <DeleteIcon
                className="delete_service"
                onClick={() => handleSubmit(service)}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
