import BtnAppointment from "../BtnAppointment";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact_container">
      <section>
        <h2 className="contact_tittle">¿Qué necesitas?</h2>
        <img
          className="contact_img"
          src="../../../public/7479f007-c2bd-8af1-7d1c-e362713f8e7c.jpg"
        />
      </section>

      <div className="contact_list">
        <li>Manicuras</li>
        <li>Uñas Acrilias o gel</li>
        <li>Pedicura</li>
        <li>Pestañas</li>
      </div>
      <div className="contact_text_container">
        <p className="contact_text">
          Si estás interesado en alguno de nuestros servicios, solo tienes que
          venir a visitarnos a nuestro centro de estética y belleza en Alcalá de
          de Henares, y tras concertar una cita para el servicio que elijas,
          podrás disfrutar de momentos únicos y muy reconfortantes en todos los
          sentidos.
        </p>
        <div className="contact_button">
          <BtnAppointment />
        </div>
      </div>
    </div>
  );
};

export default Contact;
