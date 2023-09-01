import BtnAppointment from "../BtnAppointment";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div id="hero_container" className="hero_container">
        <section>
          {" "}
          <h3>Moon manicure</h3>
          <h1>Diseño impecable, resultados duraderos</h1>
          <BtnAppointment />
        </section>
      </div>
    </>
  );
};

export default Hero;
