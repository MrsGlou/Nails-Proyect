import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useResendValidatedError } from "../hooks/useResendValidatedError";
import { resendValidatedUser } from "../services/API_user/user.service";

const ButtonResend = ({ setReloadPageError }) => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const { allUser } = useAuth();

  const handleReSend = async () => {
    // / no tenemos un form data porque sacamos la info por la parte del AllUser o
    // / ... del localStorage
    const getEmailLocalStorage = () => {
      const local = localStorage.getItem("user");
      const parseUserLocal = JSON.parse(local);
      //console.log(parseUserLocal.email);
      return parseUserLocal.email;
    };
    setSend(true);
    setRes(
      await resendValidatedUser({
        email: localStorage.getItem("user")
          ? getEmailLocalStorage()
          : allUser?.data?.user?.email,
      })
    );
    setSend(false);
  };

  useEffect(() => {
    useResendValidatedError(res, setReloadPageError, setRes);
  }, [res]);

  return (
    <div>
      {" "}
      <button
        id="btnResend"
        className="btn"
        disabled={send}
        style={{ background: send ? "#49c1a388" : "#49c1a2" }}
        onClick={() => handleReSend()}
      >
        Resend Code
      </button>
    </div>
  );
};

export default ButtonResend;
