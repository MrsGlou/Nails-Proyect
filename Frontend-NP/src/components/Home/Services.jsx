import "./Services.css";

const Services = () => {
  return (
    <div className="services_home_container">
      <h2 className="services_home_title">
        Ofrecemos <span>servicios de uñas vip</span>
      </h2>
      <section className="services_container_layout">
        <div className="service_container_img">
          <div className="service_cicle"></div>
          <img
            className="service_general_img"
            src="../../../public/foto servicios.PNG"
          />
        </div>
        <div className="service_text">Hola soy tu texto</div>
      </section>
    </div>
  );
};

export default Services;
