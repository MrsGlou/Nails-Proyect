import BtnAppointment from "../BtnAppointment";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about_us_container">
      <h2 className="about_us_title">Acerca del estudio</h2>
      <section className="about_us_text_section">
        <p className="about_us_text">
          Bienvenidos a nuestro exclusivo centro de belleza donde la pasión por
          la perfección y el arte se unen para ofrecerte una experiencia única
          en el mundo de la belleza de uñas. Somos más que estilistas; somos
          artistas que crean pequeñas obras maestras en las yemas de tus dedos.
        </p>
        <p className="about_us_text">
          Te invitamos a explorar nuestro mundo de colores vibrantes, diseños
          cautivadores y atención personalizada. Te esperamo con un pincel en la
          mano y una sonrisa en el rostro para transformar tus uñas en una obra
          maestra de belleza y estilo. Ven y descubre la magia que solo un
          centro de belleza como el nuestro puede ofrecer.
        </p>
      </section>
      <div>
        <BtnAppointment />
      </div>
    </div>
  );
};

export default AboutUs;
