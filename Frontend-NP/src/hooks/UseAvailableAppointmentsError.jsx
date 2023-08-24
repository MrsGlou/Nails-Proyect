import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const UseAvailableAppointmentsError = (res, setRes) => {
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem("data", dataToString);
    setRes({});
  }

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please , there are no appointments available❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  if (res?.response?.status == 404) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error to Create server ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

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
