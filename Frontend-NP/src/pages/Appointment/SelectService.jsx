import { useEffect, useState } from "react";
import { getServices } from "../../services/API_services/service.service";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
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

  useEffect(() => {
    // Limpiar el valor del localStorage cuando el componente se monte
    localStorage.removeItem("Manicura");
    localStorage.removeItem("Pedicura");
    localStorage.removeItem("Pestaña");
    localStorage.removeItem("Gel");
    localStorage.removeItem("selectedServices");
  }, []);

  const handleChangeManicure = (event) => {
    const serviceType = "Manicura";
    const id = event.target.value;
    handleLocalStorage(serviceType, id);
  };

  const handleChangeGel = (event) => {
    const serviceType = "Gel";
    const id = event.target.value;
    handleLocalStorage(serviceType, id);
  };

  const handleChangePedicura = (event) => {
    const serviceType = "Pedicura";
    const id = event.target.value;
    handleLocalStorage(serviceType, id);
  };

  const handleChangePestaña = (event) => {
    const serviceType = "Pestaña";
    const id = event.target.value;
    handleLocalStorage(serviceType, id);
  };

  const handleLocalStorage = (serviceType, id) => {
    localStorage.setItem(serviceType, id);

    let keys = Object.keys(localStorage);
    let savedValues = new Array();

    keys.forEach((key) => {
      savedValues.push(localStorage.getItem(key));
    });
  };

  return (
    <>
      <h2 className="appointment_tittle">Selecciona tu tratamiento</h2>
      <div className="appointment_services_container">
        <div>
          <FormControl>
            <h3>Manicuras</h3>
            <RadioGroup onChange={handleChangeManicure}>
              <div className="services_type">
                {services?.map((service) =>
                  service.type === "Manicuras" ? (
                    <div className="service_type" key={service._id}>
                      <h4>{service.name}</h4>
                      <h4>{service.price} €</h4>
                      <FormControlLabel
                        value={service._id}
                        control={<Radio />}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <h3>Uñas Acrilicas y Gel Esculpidas</h3>
            <RadioGroup onChange={handleChangeGel}>
              <div className="services_type">
                {services?.map((service) =>
                  service.type === "Uñas Acrilicas y Gel Esculpidas" ? (
                    <div className="service_type" key={service._id}>
                      <h4>{service.name}</h4>
                      <h4>{service.price} €</h4>
                      <FormControlLabel
                        value={service._id}
                        control={<Radio />}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <h3>Pedicuras</h3>
            <RadioGroup onChange={handleChangePedicura}>
              <div className="services_type">
                {services?.map((service) =>
                  service.type === "Pedicuras" ? (
                    <div className="service_type" key={service._id}>
                      <h4>{service.name}</h4>
                      <h4>{service.price} €</h4>
                      <FormControlLabel
                        value={service._id}
                        control={<Radio />}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <h3>Pestañas</h3>
            <RadioGroup onChange={handleChangePestaña}>
              <div className="services_type">
                {services?.map((service) =>
                  service.type === "Pestañas" ? (
                    <div className="service_type" key={service._id}>
                      <h4>{service.name}</h4>
                      <h4>{service.price} €</h4>
                      <FormControlLabel
                        value={service._id}
                        control={<Radio />}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default SelectService;
