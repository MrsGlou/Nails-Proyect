import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./SelectService.css";

const SelectService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response.data);
    };
    fetchServices();
  }, []);

  return (
    <>
      <h2 className="appointment_tittle">Selecciona tu tratamiento</h2>
      <div className="appointment_services_container">
        <div>
          <h3>Manicuras</h3>
          <div className="services_type">
            {services?.map((service) =>
              service.type === "Manicuras" ? (
                <div className="service_type" key={service._id}>
                  <h4>{service.name}</h4>
                  <h4>{service.price} €</h4>
                  <Radio
                    className="button_select"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "A" } }}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        <div>
          <h3>Uñas Acrílicas y Gel Esculpidas</h3>
          <div className="services_type">
            {services?.map((service) =>
              service.type === "Uñas Acrilicas y Gel Esculpidas" ? (
                <div className="service_type" key={service._id}>
                  <h4>{service.name}</h4>
                  <h4>{service.price} €</h4>
                  <Radio
                    className="button_select"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "A" } }}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        <div>
          <h3>Pedicuras</h3>
          <div className="services_type">
            {services?.map((service) =>
              service.type === "Pedicuras" ? (
                <div className="service_type" key={service._id}>
                  <h4>{service.name}</h4>
                  <h4>{service.price} €</h4>
                  <Radio
                    className="button_select"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "A" } }}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        <div>
          <h3>Pestañas</h3>
          <div className="services_type">
            {services?.map((service) =>
              service.type === "Pestañas" ? (
                <div className="service_type" key={service._id}>
                  <h4>{service.name}</h4>
                  <h4>{service.price} €</h4>
                  <Radio
                    className="button_select"
                    name="radio-buttons"
                    slotProps={{ input: { "aria-label": "A" } }}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectService;
