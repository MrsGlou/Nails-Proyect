import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import { useDeleteServiceError } from "../../hooks/useDeleteServiceError";
import { useUpdateServiceError } from "../../hooks/useUpdateServiceError";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response.data);
    };
    fetchServices();
  }, []);
  return (
    <div>
      {" "}
      {services?.map((service) => (
        <div className="service_type" key={service._id}>
          <h4>{service.name}</h4>
          <h4>{service.price} €</h4>
          <h4>{service.time} minutes</h4>
          <button
            className="delete_service"
            onClick={() => useUpdateServiceError(service)}
          >
            🖍
          </button>
          <button
            className="delete_service"
            onClick={() => useDeleteServiceError(service)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
};

export default Services;
