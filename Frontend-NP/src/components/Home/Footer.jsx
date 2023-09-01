import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FacebookIcon from "@mui/icons-material/Facebook";

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
            <ul className="footer_links">
              <a
                className="footer_link"
                href="https://www.instagram.com/moonmanicurealcaladehenares"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                className="footer_link"
                href="https://www.facebook.com/moonmanicurealcaladehenares/?locale=es_ES"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                className="footer_link"
                href="https://www.tiktok.com/@moonmanicure?_d=secCgsIARCbDRgBIAMoARI%2BCjxrr57j8UgOJS18aNiIDLIdgf19izge2dNcMW%2FSsl3iugMLN24%2Fz6i8%2BEuk5B1ZI3nMapkQhSqpZmErQg8aAA%3D%3D&language=es&sec_uid=MS4wLjABAAAAkLDruC28xamthPuC1BuWxukES-xqxH5S0weaYOt447xINRs1LDu2I0QH1uCRAd5j&sec_user_id=MS4wLjABAAAAkLDruC28xamthPuC1BuWxukES-xqxH5S0weaYOt447xINRs1LDu2I0QH1uCRAd5j&share_app_name=musically&share_author_id=6868715320665670661&share_link_id=e4528abd-826c-4f61-95e9-fff84b37beab&timestamp=1604156135&u_code=de9kikk25j9ki2&user_id=6868715320665670661&utm_campaign=client_share&utm_medium=android&utm_source=copy&_r=1"
                target="_blank"
                rel="noreferrer"
              >
                <AudiotrackIcon sx={{ fontSize: 30 }} />
              </a>
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
