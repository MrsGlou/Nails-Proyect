import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_container_layout">
      <div className="footer_container">
        <section className="footer_location">
          <div>
            <h3>UBICACIÓN</h3>
            <p>Calle Mayor, 101, Alcalá de Henares, 28801, Madrid</p>
            <p>910 40 57 08</p>
          </div>
          <div>
            <h3>SÍGANOS</h3>
            <ul>
              <a>Instagram</a>
              <a>Facebook</a>
              <a>Twitter</a>
            </ul>
            <p>© 2023 Política de privacidad</p>
          </div>
        </section>

        <section className="footer_img">
          <img src="../../../public/serer.jpg" />
        </section>
      </div>
      <div className="made_love">
        {" "}
        <h3>Made with 💗 by Andrea</h3>
      </div>
    </footer>
  );
};

export default Footer;
