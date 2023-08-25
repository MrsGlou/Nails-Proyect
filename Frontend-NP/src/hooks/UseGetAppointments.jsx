import { Alert, Stack } from "@mui/material";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseGetAppointments = (res, setRes) => {
  //! -------- 200 ={ updateUser: true, sendPassword: true}
  if (res?.status == 200) {
    setRes(() => ({}));
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>;
  }

  //! -------- 404 = There are no dates

  if (res?.status == 404) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There are no appointments that day ❎",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -------- 500 = interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error ❎, please try again ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
