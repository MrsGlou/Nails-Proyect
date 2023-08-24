import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useResendValidatedError } from "../../hooks/useResendValidatedError";
import { resendValidatedUser } from "../../services/API_user/user.service";
import { Button } from "@mui/material";

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
      <Button
        sx={{
          backgroundColor: "#f991cc",
          ":hover": { backgroundColor: "#dc136c" },
        }}
        variant="contained"
        id="btnResend"
        className="btn"
        disabled={send}
        onClick={() => handleReSend()}
      >
        Resend Code
      </Button>
    </div>
  );
};

export default ButtonResend;
