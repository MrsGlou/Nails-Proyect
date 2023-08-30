import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseCreateAppointmentError = (res, setCreateOk, setRes) => {
  //200
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem("data", dataToString);
    setCreateOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Appoitnment create 💌",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //404: 'error, resend code'
  if (
    res?.response?.status == 404
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to send verification ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //500 : internal server error
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval server error!❎ Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};