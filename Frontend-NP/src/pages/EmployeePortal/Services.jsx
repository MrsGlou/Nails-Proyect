import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import { Link, NavLink } from "react-router-dom";
import { UseDeleteServiceError } from "../../hooks/UseDeleteServiceError";

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
    <div>
      <NavLink to="/platform/services/newservice">
        <button className="btn_nav_employee users">Añadir servicio</button>
      </NavLink>{" "}
      {services?.map((service) => (
        <div className="service_type" key={service._id}>
          <h4>{service.name}</h4>
          <h4>{service.price} €</h4>
          <h4>{service.time} minutes</h4>
          <Link to={`/platform/services/update/${service._id}`}>
            <button className="update_service">🖍</button>
          </Link>
          <button
            className="delete_service"
            onClick={() => handleSubmit(service)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default Services;
