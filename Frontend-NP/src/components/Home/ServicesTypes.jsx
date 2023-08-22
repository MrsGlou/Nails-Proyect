import BtnAppointment from "../BtnAppointment";
import "./ServiceTypes.css";

const ServicesTypes = () => {
  return (
    <div className="service_type_container">
      <h2 className="service_type_tittle">Servicios de Moon manicure</h2>
      <p className="service_type_text">
        Desde manicuras meticulosas hasta pedicuras relajantes, cada sesión es
        un tributo a la labor incansable de tus extremidades. El resultado va
        más allá de unas uñas pulcras; es una celebración de ti, de tu esfuerzo
        constante y tu merecido descanso.
      </p>
      <div className="service_type_products_container">
        <figure className="service_type_products_figure">
          <img
            className="service_type_img"
            src="../../../public/woman-showing-her-beautiful-nails_23-2148697087.jpg"
            alt="womman showing her nails"
          />
          <div className="service_type_container_text">
            {" "}
            <h3 className="service_type_name">Manicura Deluxe</h3>
            <p className="service_type_price">20,99 €</p>
          </div>
        </figure>
        <figure className="service_type_products_figure">
          <img
            className="service_type_img"
            src="../../../public/beautiful-female-hands-with-french-manicure-preparing-getting-spa-procedure_186202-4227.jpg"
            alt="womman showing her nails"
          />
          <h3 className="service_type_name">Uñas de Gel o Acrilicas</h3>

          <p className="service_type_price">30,99 €</p>
        </figure>
        <figure className="service_type_products_figure">
          <img
            className="service_type_img"
            src="../../../public/skincare-beauty-female-feet-with-camomile-s-flower_186202-728.jpg"
            alt="womman showing her nails"
          />
          <h3 className="service_type_name">Pedicura Completa</h3>

          <p className="service_type_price">28,99 €</p>
        </figure>
        <figure className="service_type_products_figure">
          <img
            className="service_type_img"
            src="../../../public/966ec785f9c6f38bb63e96428c492f58.jpg"
            alt="womman showing her nails"
          />
          <h3 className="service_type_name">Lifting</h3>

          <p className="service_type_price">30,99 €</p>
        </figure>
      </div>
      <div className="btn_appointment_link">
        <BtnAppointment />
      </div>
    </div>
  );
};

export default ServicesTypes;
