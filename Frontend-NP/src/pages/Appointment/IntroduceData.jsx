import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const IntroduceData = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  //! 1) ------------------ FUNCION QUE GESTIONA EL FORMULARIO----------
  const formSubmit = async (formData) => {
    setSend(true);
    //setRes(await createAppointment(formData));
    setSend(false);
  };

  //! 2) ------------------ LOS USEEFFECT QUE GESTIONAN LA RESPUESTA: ERRORES Y 200

  useEffect(() => {
    console.log(res);
    //useCreateAppointmentError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  return (
    <div className="form_date_client_warp">
      <h2 className="form_client_tittle">Introduce tus datos</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="name_container form_client_group">
          <input
            className="input_user"
            type="name"
            id="name"
            name="name"
            autoComplete="false"
            {...register("name", { required: true })}
          />
          <label htmlFor="custom_input" className="custom_placeholder">
            Nombre
          </label>
        </div>
        <div className="surname_container form_client_group">
          <input
            className="input_user"
            type="surname"
            id="surname"
            name="surname"
            autoComplete="false"
            {...register("surname", { required: true })}
          />
          <label htmlFor="custom_input" className="custom_placeholder">
            Apellido
          </label>
        </div>
        <div className="phone_container form_client_group">
          <input
            className="input_user"
            type="phone"
            id="phone"
            name="phone"
            autoComplete="false"
            {...register("phone", { required: true })}
          />
          <label htmlFor="custom_input" className="custom_placeholder">
            Télefono
          </label>
        </div>
        <div className="email_container form_client_group">
          <input
            className="input_user"
            type="email"
            id="email"
            name="email"
            autoComplete="false"
            {...register("email", { required: true })}
          />
          <label htmlFor="custom_input" className="custom_placeholder">
            Correo
          </label>
        </div>
        <div className="btn_container">
          <button
            className="btn"
            type="submit"
            disabled={send}
            style={{ background: send ? "#49c1a388" : "#49c1a2" }}
          >
            {send ? "Cargando ....." : "ENVIAR"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntroduceData;
