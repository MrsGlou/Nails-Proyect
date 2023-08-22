import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <section className="footer_location">
        <div>
          <h3>UBICACIÓN</h3>
          <p>Calle Mayor, 101, Alcalá de Henares, 28801, Madrid</p>
          <p>910 40 57 08</p>
        </div>
        <div>
          <h3>SÍGANOS</h3>
          <h4>
            <a>Instagram</a>
            <a>Facebook</a>
            <a>Twitter</a>
          </h4>
          <p>© 2023 Política de privacidad</p>
        </div>
      </section>

      <section className="footer_img">
        <img src="../../../public/serer.jpg" />
      </section>
    </div>
  );
};

export default Footer;
