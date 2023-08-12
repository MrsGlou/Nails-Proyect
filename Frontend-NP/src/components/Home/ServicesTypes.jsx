import "./ServiceTypes.css";

const ServicesTypes = () => {
  return (
    <section className="container_service_type">
      <h2 className="service_type_tittle">Servicios de Moon manicure</h2>
      <p className="u-text u-text-palette-4-base u-block-ee62-7">
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
      </p>
      <div className="container_layout_products u-block-ee62-27">
        <div className="u-repeater u-block-ee62-55">
          <div className=" u-block-ee62-28">
            <div className="container_product u-block-ee62-29">
              <div
                alt=""
                className="u-image u-image-circle u-block-ee62-47"
              ></div>
              <h3 className="u-custom-font u-text u-text-font u-text-palette-4-base u-block-ee62-31">
                Acrilic set
              </h3>

              <p className="u-text u-text-palette-5-dark-1 u-block-ee62-48">
                $25
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-white u-block-ee62-32">
            <div className="u-container-layout u-similar-container u-valign-middle u-block-ee62-33">
              <div
                alt=""
                className="u-image u-image-circle u-block-ee62-49"
              ></div>
              <h3 className="u-custom-font u-text u-text-font u-text-palette-4-base u-block-ee62-35">
                Shellac
              </h3>

              <p className="u-text u-text-palette-5-dark-1 u-block-ee62-50">
                $30
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-white u-block-ee62-36">
            <div className="u-container-layout u-similar-container u-valign-middle u-block-ee62-37">
              <div
                alt=""
                className="u-image u-image-circle u-block-ee62-51"
              ></div>
              <h3 className="u-custom-font u-text u-text-font u-text-palette-4-base u-block-ee62-39">
                Skincare
              </h3>

              <p className="u-text u-text-palette-5-dark-1 u-block-ee62-52">
                $20
              </p>
            </div>
          </div>
          <div className="u-align-center u-container-style u-list-item u-repeater-item u-white u-block-ee62-40">
            <div className="u-container-layout u-similar-container u-valign-middle u-block-ee62-41">
              <div
                alt=""
                className="u-image u-image-circle u-block-ee62-53"
              ></div>
              <h3 className="u-custom-font u-text u-text-font u-text-palette-4-base u-block-ee62-43">
                french
              </h3>

              <p className="u-text u-text-palette-5-dark-1 u-block-ee62-54">
                $35
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTypes;
