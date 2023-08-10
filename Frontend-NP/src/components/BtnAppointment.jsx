import { useNavigate } from "react-router-dom";
import "./BTNAppointment.css";

const BtnAppointment = () => {
  const navigate = useNavigate();
  return (
    <button
      className="btn_bookAppointment"
      onClick={() => {
        {
          navigate("/serviceselect");
        }
      }}
    >
      PEDIR CITA
    </button>
  );
};

export default BtnAppointment;
