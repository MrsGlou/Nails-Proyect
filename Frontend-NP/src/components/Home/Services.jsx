import BtnAppointment from "../BtnAppointment";
import "./Services.css";

const Services = () => {
  return (
    <div className="services_home_container">
      <section>
        <h2 className="services_home_title">
          Ofrecemos <span>servicios de uñas vip</span>
        </h2>
      </section>
      <section className="services_container_layout">
        <div className="service_container_img">
          <div className="service_cicle"></div>
          <img
            className="service_general_img"
            src="../../../public/foto servicios.PNG"
          />
        </div>
        <div className="service_container_text">
          <div className="service_text">
            Por todo lo que tus manos<br></br> y pies hacen por ti
          </div>
          <p className="service_text_second">
            A través de los colores, las formas y la creatividad, las uñas se
            convierten en lienzos en blanco para expresar nuestro estilo único.
          </p>
          <BtnAppointment />
        </div>
      </section>
    </div>
  );
};

export default Services;
